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
  pdfBase64String: string;
};

class ClientReport {
  information: ReportInformation = {
    pdfBase64String: "",
  };

  constructor() {
    const storedReportData = localStorage.getItem("reportData");
    if (storedReportData) {
      this.information = JSON.parse(storedReportData);
    } else {
      this.information = { pdfBase64String: "" };
      this.synctoLocal();
    }
  }

  getReport(): string {
    return this.information.pdfBase64String;
  }

  setReport(pdfBase64String: string): void {
    this.information.pdfBase64String = pdfBase64String;
    this.synctoLocal();
  }

  synctoLocal(): void {

    localStorage.setItem("reportData", JSON.stringify(this.information));
  }

  async createPdf(data: ReportData): Promise<void> {
    try {
      const pdfString = this.generatePDFReport(data);
      console.log(pdfString);
      
      this.setReport(pdfString);

      const reportDataToSave = {
        report_type: "client_report",
        treatment_plan_id: data.treatment_plan[0]?.id || "", 
        report_string: pdfString,
      };

      await Application.savereport(reportDataToSave);
    } catch (error) {
      console.error("Error creating PDF:", error);
     
    }
  }

  // Generates the PDF and returns the base64 string
  private generatePDFReport(data: ReportData): string {
    const doc = new jsPDF();

    // Add Contents Section
    doc.setFontSize(14);
    doc.setTextColor(255, 140, 0);
    doc.text("Contents", 10, 10);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const contents = [
      "• Profile",
      "• Benchmark summary",
      "• Benchmark detail",
      "• Client goals",
      "• Recommended action areas",
      "• Recommended SMART Goals",
    ];
    contents.forEach((item, index) => {
      doc.text(item, 10, 20 + index * 10);
    });

    // Add Client Information
    doc.addPage();
    doc.setFontSize(12);
    doc.text("Client Information", 10, 10);

    let clientInfo = data.client_info;
    if (typeof clientInfo === "string") {
      clientInfo = JSON.parse(clientInfo);
    }

    const clientInfoData = [
      ["Assessment Date:", clientInfo["Assessment Date"] || "N/A"],
      ["Date of Birth:", clientInfo["Date of birth"]?.[0] || "N/A"],
      ["Gender:", clientInfo["Biological Gender"]?.[0] || "N/A"],
      ["Smoker:", clientInfo["Smoker"]?.[0] || "N/A"],
      ["Weight:", clientInfo["Weight"]?.[0] || "N/A"],
      ["Height:", clientInfo["Height"]?.[0] || "N/A"],
      [
        "Injuries to be Aware of:",
        clientInfo["Injury history"]?.[0] || "N/A",
      ],
      [
        "Prescription Medication:",
        clientInfo["Prescribed medication"]?.[0] || "N/A",
      ],
    ];

    (doc as any).autoTable({
      startY: 20,
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

    // Add Additional Sections...
    // (The rest of your createPDFReport code goes here.
    // For brevity, you can continue to transfer all sections similarly.)

    // Example: Adding Client Goals Table
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(255, 140, 0);
    doc.text("Client Goals", 10, 10);

    const clientGoalsData = [
      [
        "What you want to be able to do?",
        clientInfo["What you want to be able to do?"]?.["0"] || "N/A",
      ],
      [
        "How you want to look?",
        clientInfo["How you want to look?"]?.["0"] || "N/A",
      ],
      [
        "How you want to feel?",
        clientInfo["How you want to feel?"]?.["0"] || "N/A",
      ],
      [
        "Any medical conditions to consider?",
        clientInfo["Medical conditions"]?.["0"] || "N/A",
      ],
    ];

    (doc as any).autoTable({
      startY: 20,
      head: [["", ""]],
      body: clientGoalsData,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 2,
        halign: "left",
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: [255, 255, 255],
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

    // Continue transferring other sections...

    // Finalizing the PDF
    const PdfBase64 = doc.output("datauristring");
    const base64String = PdfBase64.split(",")[1];
    console.log("Base64 String Generated:", base64String.length > 0 ? "Yes" : "No");

    return base64String;
  }

  // Fetches the report data, creates the PDF, and stores it
  async fetchReport(treatmentPlanId: string): Promise<void> {
    try {
      const response = await Application.downloadReport({
        treatment_plan_id: treatmentPlanId,
      });

      const reportData: ReportData = response.data;
     

      await this.createPdf(reportData);
    } catch (error) {
      console.error("Error processing the report:", error);
      throw error; // Re-throw to handle it in the calling function if needed
    }
  }
}

export default ClientReport;