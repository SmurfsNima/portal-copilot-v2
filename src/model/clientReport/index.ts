// ClientReport.ts

import jsPDF from "jspdf";
import "jspdf-autotable";
import { Application } from "@/api";

type ReportBenchmark = {
  Category: string;
  "Benchmark areas": string;
  "Test L1": string;
  "Test L2": string;
  Result: string;
  "Benchmark performance": string;
};

type ReportData = {
  client_info: any;
  patient_benchmark: ReportBenchmark[];
  treatment_plan: any[];
  logo: any;
};

type ReportInformation = {
  clientPdfBase64String: string;
  clinicPdfBase64String: string;
};

class ClientReport {
  information: ReportInformation = {
    clientPdfBase64String: "",
    clinicPdfBase64String: "",
  };

  constructor() {
    const storedReportData = localStorage.getItem("reportData");
    if (storedReportData) {
      this.information = JSON.parse(storedReportData);
    } else {
      this.synctoLocal();
    }
  }

  getClientReport(): string {
    return this.information.clientPdfBase64String;
  }

  getClinicReport(): string {
    return this.information.clinicPdfBase64String;
  }

  setClientReport(pdfBase64String: string): void {
    this.information.clientPdfBase64String = pdfBase64String;
    this.synctoLocal();
  }

  setClinicReport(pdfBase64String: string): void {
    this.information.clinicPdfBase64String = pdfBase64String;
    this.synctoLocal();
  }

  synctoLocal(): void {
    localStorage.setItem("reportData", JSON.stringify(this.information));
  }

  async createPdf(data: any): Promise<void> {
    try {
      const clientPdfString = this.generatePDFReport(data);
      console.log("client report: " + clientPdfString);

      this.setClientReport(clientPdfString);
      const clinicPdfString = this.generatePDFReport(data);
      this.setClinicReport(clinicPdfString)
      const treatmentPlanId = data.treatment_plan?data.treatment_plan[0]?.id || "":"";
      const reportDataToSave = {
        report_type: "client_report",
        treatment_plan_id: treatmentPlanId,
        report_string: clientPdfString,
      };

      const clinicReportDataToSave = {
        report_type: "clinic_report",
        treatment_plan_id: treatmentPlanId,
        report_string: clinicPdfString,
      };

      await Application.savereport(reportDataToSave);
      await Application.savereport(clinicReportDataToSave)
    } catch (error) {
      console.error("Error creating PDF:", error);
    }
  }

  // Generates the PDF and returns the base64 string
  public generatePDFReport(data: any): string {
    const doc = new jsPDF();

    // let pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const addHeader = () => {
      // Option 1: Add text header
      doc.setFontSize(16);
      doc.text("", 180 / 2, 15, { align: "center" });

      // Option 2: Add image header (optional, example with a logo)
      // const img = new Image();
      // img.src = data.logo
      // doc.addImage(img, 'PNG', 10, 10, 25, 12); // Adjust size/position as needed
      doc.setLineWidth(1); // Set line thickness
      doc.setDrawColor(94, 168, 214); // Set color to blue (RGB format)
      doc.line(0, 25, 250, 25); // Draw
    };

    const addFooter = (pageNumber: number) => {
      doc.setLineWidth(6); // Adjust thickness to match the image
      doc.setDrawColor(180, 210, 224); // Set the color to light blue (RGB)
      doc.line(0, pageHeight - 20, 200, pageHeight - 20); // Horizontal line at the bottom

      // Add "REPORT NAME" on the left side
      doc.setFontSize(10);
      doc.setTextColor(150); // Set text color to grey
      doc.text("REPORT NAME", 10, pageHeight - 10);

      // Add page number on the right side
      doc.text(`${pageNumber}`, 200 - 10, pageHeight - 10, { align: "right" });
    };
    addHeader();
    // Parse the client_info JSON string
    let clientInfo;
    if (typeof data.client_info === "string") {
      clientInfo = JSON.parse(data.client_info);
    } else {
      clientInfo = data.client_info;
    }

    // Add Contents Section
    doc.setFontSize(14);
    doc.setTextColor(255, 140, 0);
    doc.text("Contents", 10, 35);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("• Profile", 10, 45);
    doc.text("• Benchmark summary", 10, 55);
    doc.text("• Benchmark detail", 10, 65);
    doc.text("• Client goals", 10, 75);
    doc.text("• Recommended action areas", 10, 85);
    doc.text("• Recommended SMART Goals", 10, 95);
    addFooter(1);
    doc.addPage();
    addHeader();
    doc.setFontSize(12);
    doc.text("Client Information", 10, 35);

    const clientInfoData = [
      // ["Name:", clientInfo["Name"] || "N/A"],
      ["Assessment Date:", clientInfo["Assessment Date"] || "N/A"],
      ["Date of Birth:", clientInfo["Date of birth"]?.[0] || "N/A"],
      ["Gender:", clientInfo["Biological Gender"]?.[0] || "N/A"],

      ["Smoker:", clientInfo["Smoker"]?.[0] || "N/A"],
      ["Weight:", clientInfo["Weight"]?.[0] || "N/A"],
      ["Height:", clientInfo["Height"]?.[0] || "N/A"],

      ["Injuries to be Aware of:", clientInfo["Injury history"]?.[0] || "N/A"],

      [
        "Prescription Medication:",
        clientInfo["Prescribed medication"]?.[0] || "N/A",
      ],
    ];

    (doc as any).autoTable({
      startY: 60,

      body: clientInfoData,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 2,
        halign: "left",
      },

      columnStyles: {
        0: { fontStyle: "bold", fillColor: [255, 255, 255] },
        1: { fillColor: [255, 255, 255] },
      },
    });
    addFooter(2);
    doc.addPage();
    addHeader();
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Please read before reviewing this report", 10, 35);
    const pageWidth = 180;
    let y = 45;

    // Add text
    doc.setFontSize(12);
    doc.text("WHY WE USE EXPERIENCE LEVELS", 10, y);
    y += 10;

    doc.setFontSize(10);
    let text =
      "Scoring is recommended standards backed by reputable academic sources and normative data. The benchmarks have experience levels so the score will be against the relevant experience level benchmark for you. Experience levels used are stated on the client overview page of this report.";
    let lines = doc.splitTextToSize(text, pageWidth);
    doc.text(lines, 10, y);
    y += lines.length * 10 + 10;

    doc.setFontSize(12);
    doc.text("3 EXPERIENCE LEVELS:", 10, y);
    y += 10;

    doc.setFontSize(10);
    text =
      "• Novice – a client with some experience in training, nutrition and lifestyle management but with no structured programme";
    lines = doc.splitTextToSize(text, pageWidth);
    doc.text(lines, 15, y);
    y += lines.length * 10;

    text =
      "• Committed – a client working on structured programmes covering fitness, nutrition and lifestyle";
    lines = doc.splitTextToSize(text, pageWidth);
    doc.text(lines, 15, y);
    y += lines.length * 10;

    text =
      "• Elite – a client who has been working on structured longevity programmes and exceeds benchmark performance in their age/gender group";
    lines = doc.splitTextToSize(text, pageWidth);
    doc.text(lines, 15, y);
    y += lines.length * 10 + 10;

    doc.setFontSize(12);
    doc.text("WHAT THE BENCHMARKS MEAN:", 10, y);
    y += 10;

    doc.setFontSize(10);
    text =
      "• Novice – a good level for your age/gender of physiological, fitness and emotional health. This will mean meeting or exceeding UK healthy guidelines.";
    lines = doc.splitTextToSize(text, pageWidth);
    doc.text(lines, 15, y);
    y += lines.length * 10;

    text =
      "• Committed – excellent level typically top 10% in age/gender group for physiological, fitness and emotional health. This level of performance in studies suggests a reduction in the probability of all cause mortality by 47%.";
    lines = doc.splitTextToSize(text, pageWidth);
    doc.text(lines, 15, y);
    y += lines.length * 10;

    text =
      "• Elite – good or excellent in age/gender group 10 years younger than you. For the people who want to maintain a high level of capability as they age.";
    lines = doc.splitTextToSize(text, pageWidth);
    doc.text(lines, 15, y);
    y += lines.length * 10;

    doc.setFontSize(12);
    doc.text("SCORING EXPLAINED: ", 10, y);
    y += 10;
    doc.setFontSize(10);
    text = "• Needs focus – no activity in this area or a low test performance";
    lines = doc.splitTextToSize(text, pageWidth);
    doc.text(lines, 15, y);
    y += lines.length * 10;
    text = "• OK – performance is 25-75% of benchmark";
    lines = doc.splitTextToSize(text, pageWidth);
    doc.text(lines, 15, y);
    y += lines.length * 10;
    text = "• Good - performance is 76% to 99% of benchmark";
    lines = doc.splitTextToSize(text, pageWidth);
    doc.text(lines, 15, y);
    y += lines.length * 10;
    const groupedBenchmarks: Record<string, any[]> = {};
    data.patient_benchmark?.forEach((benchmark: any) => {
      const category = benchmark.Category;
      if (!groupedBenchmarks[category]) {
        groupedBenchmarks[category] = [];
      }
      groupedBenchmarks[category].push([
        benchmark["Benchmark areas"],
        benchmark["Test L1"],
        benchmark["Test L2"],
        benchmark.Result,
        benchmark["Benchmark performance"],
      ]);
    });
    addFooter(3);
    Object.keys(groupedBenchmarks).forEach((category) => {
      doc.addPage();
      addHeader();
      doc.setFontSize(16);
      doc.setTextColor(255, 140, 0);
      doc.text(`${category} Test Results`, 10, 35);

      (doc as any).autoTable({
        head: [
          ["Area", "Test L1", "Test L2", "Result", "Benchmark Performance"],
        ],
        body: groupedBenchmarks[category],
        startY: 45,
        theme: "grid",
        styles: {
          fontSize: 10,
          cellPadding: 2,
          halign: "center",
          valign: "middle",
          lineWidth: 0.1,
          lineColor: [0, 0, 0],
        },
        headStyles: {
          fillColor: [255, 255, 255], 
          textColor: [255, 159, 51],
        },
        columnStyles: {
          0: { cellWidth: 40, halign: "left", textColor: [15, 156, 239] },
          1: { cellWidth: 40, halign: "left", textColor: [15, 156, 239] },
          2: { cellWidth: 40, halign: "left", textColor: [15, 156, 239] },
          3: { cellWidth: 20, halign: "center", textColor: [15, 156, 239] },
          4: {
            cellWidth: 40,
            textColor: [15, 156, 239],
            // fillColor: (data: any) => {
            //     switch (data.cell.raw) {
            //         case 'Needs focus': return [255, 204, 153];
            //         case 'Ok': return [255, 255, 204];
            //         case 'Good': return [153, 255, 153];
            //         case 'Excellent': return [102, 204, 255];
            //         default: return [255, 255, 255];
            //     }
            // }
          },
        },
      });
    });
    doc.addPage();
    addHeader();
    doc.setFontSize(16);
    doc.setTextColor(255, 140, 0);
    doc.text("Client Goals", 10, 35);

    const clientGoalsData = [
      [
        "What you want to be able to do?",
        data.client_info["What you want to be able to do?"]["0"] || "N/A",
      ],
      [
        "How you want to look?",
        data.client_info["How you want to look?"]["0"] || "N/A",
      ],
      [
        "How you want to feel?",
        data.client_info["How you want to feel?"]["0"] || "N/A",
      ],
      [
        "Any medical conditions to consider?",
        data.client_info["Medical conditions"]["0"] || "N/A",
      ],
    ];

    (doc as any).autoTable({
      startY: 45,
      head: [["", ""]],
      body: clientGoalsData,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 2,
        halign: "left",
        lineWidth: 0.1, // Set border width
        lineColor: [0, 0, 0], // Set border color (black)
      },
      headStyles: {
        fillColor: [255, 255, 255], // Change this to the desired color in RGB format
        textColor: [255, 159, 51],
      },
      columnStyles: {
        0: {
          fontStyle: "bold",
          fillColor: [255, 255, 255],
          textColor: [15, 156, 239],
        },
        1: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
      },
    });

    const treatmentPlanData = data.treatment_plan?.map((plan: any) => [
      plan.subCategory || "N/A",
      plan.area,
      "", 
      plan.status ? "Needs Focus" : "",
      plan.first12Weeks.dos.join(", ") || "N/A",
      plan.second12Weeks.dos.join(", ") || "N/A",
    ]);

    doc.addPage();
    addHeader();
    doc.setFontSize(16);
    doc.setTextColor(255, 140, 0);
    doc.text("Recommended Action Areas", 10, 35);

    (doc as any).autoTable({
      head: [
        [
          "Category",
          "Benchmark area",
          "Needs Focus",
          "Priority 1: First 12 Weeks",
          "Priority 2: Beyond 12 Weeks",
        ],
      ],
      body: treatmentPlanData?.map((row: any) => [
        row[0],
        row[1],
        {
          content: row[2],
          styles: {
            fillColor:
              row[3] === "Needs Focus" ? [236, 141, 27] : [255, 255, 255],
          },
        }, 
        row[3],
        row[4],
      ]),
      startY: 45,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 2,
        halign: "center",
        valign: "middle",
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [255, 159, 51],
      },
      columnStyles: {
        0: { cellWidth: 30, halign: "left", textColor: [15, 156, 239] },
        1: { cellWidth: 30, halign: "left", textColor: [15, 156, 239] },
        2: { cellWidth: 15, halign: "center", textColor: [15, 156, 239] },
        3: { cellWidth: 60, halign: "left", textColor: [15, 156, 239] },
        4: { cellWidth: 60, halign: "left", textColor: [15, 156, 239] },
      },
    });
    doc.addPage();
    addHeader();
    doc.setFontSize(16);
    doc.setTextColor(255, 140, 0);
    doc.text("Clinic Details", 10, 35);
  
    const clinicDetails = [
      ["Clinic Recommendation:", data.recommendation?.["Diet Do's"] || "N/A"],
    ];
  
    (doc as any).autoTable({
      startY: 45,
      body: clinicDetails,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 2, halign: "left" },
      columnStyles: { 0: { fontStyle: "bold", fillColor: [255, 255, 255] }, 1: { fillColor: [255, 255, 255] } },
    });
    doc.addPage();
    addHeader();
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const confidentialityText = `
    The contents of this report have been prepared from confidential information and data so cannot be shared with anyone other than the client named in this report and coaches working for Longevity Performance Coaching (brand name of LTTL Hubs Limited).
    Client written permission is required to share this report with any other third parties.

    This report is classed as confidential and must be stored and handled to the requirements of UK data protection law.
    `;
    doc.text(doc.splitTextToSize(confidentialityText, pageWidth), 10, 35);
    const PdfBase64 = doc.output("datauristring");
    const base64String = PdfBase64.split(",")[1];

    return base64String;
  }
  async fetchReport(treatmentPlanId: string): Promise<void> {
    try {
      const response = await Application.downloadReport({
        treatment_plan_id: treatmentPlanId,
      });

      const reportData: ReportData = response.data;

      console.log(response);

     
      await this.createPdf(reportData);
    } catch (error) {
      console.error("Error processing the report:", error);
      throw error; // Re-throw to handle it in the calling function if needed
    }
  }
  async fetchClinicReport(treatmentPlanId: string): Promise<void> {
    try {
      const response = await Application.downloadClinicReport({
        treatment_plan_id: treatmentPlanId,
      });
      const reportData: any = response.data;
      console.log(response);

      await this.createPdf(reportData);
    } catch (error) {
      console.error("Error fetching clinic report:", error);
      throw error;
    }
  }
}

export default ClientReport;
