/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfoCard } from "@/components";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "symphony-ui";
import BenchmarkModal from "./benchmarkModal";
import { Application } from "@/api";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import { AppContext } from "@/store/app";
import RegenerateModal from "./RegenerateModal";
import useModalAutoClose from "@/hooks/UseModalAutoClose";
type ReportBenchmark = {
  Category: string;
  "Benchmark areas": string;
  "Test L1": string;
  Result: string;
  "Benchmark performance": string;
};
type Benchmark = {
  area: string;
  subCategory?: string;
  first12Weeks: {
    dos: string[];
    donts: string[];
  };
  second12Weeks: {
    dos: string[];
    donts: string[];
  };
};
const treatmentHistory = [
  {
    date: "July 17th, 2024",
    time: "8:12 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 16th, 2024",
    time: "8:12 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 13rd, 2024",
    time: "8:12 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 11rd, 2024",
    time: "8:12 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 9th, 2024",
    time: "8:12 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 8th, 2024",
    time: "8:12 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 7th, 2024",
    time: "8:12 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 6th, 2024",
    time: "8:12 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 5th, 2024",
    time: "9:30 am",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 4th, 2024",
    time: "8:15 am",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 3rd, 2024",
    time: "2:30 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 2nd, 2024",
    time: "11:30 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  {
    date: "July 1st, 2024",
    time: "11:30 pm",
    description: "Fasting Diet could be changed to a normal...",
  },
  // Add more entries as needed
];

export const TreatmentPlan = () => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const [showHistory, setShowHistory] = useState(false);
  const [treatmentActive, setTreatmentActive] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [, setplanID] = useState();
  const { id } = useParams<{ id: string }>();
  const [benchmarks, setBenchmarks] = useState<Benchmark[]>([]);
  const [needFocusBenchmarks, setneedFocusBenchmarks] = useState([]);
  const [Description, setDescription] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {  setPdfBase64String } = useContext(AppContext); // Access the context
  // const navigate = useNavigate(); // Navigation hook
  // const fetchData = async () => {
  //   try {
  //     const response = await Application.generateTreatmentPlan({

  //       member_id: Number(id),
  //     });
  //     console.log(response);
  //     if (response.data && response.data.length > 0) {

  //       setBenchmarks(response.data[0]);
  //       setplanID(response.data[1]);
  //       setIsGenerated(true);

  //       const desResponse = await Application.showPlanDescription(Number(id));
  //       setneedFocusBenchmarks(desResponse.data["need focus benchmarks"]);
  //       setDescription(desResponse.data.description);
  //     } else {
  //       setIsGenerated(false); // No data found
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     setIsGenerated(false); // Handle error by not setting generated to true
  //   }
  // };
  const [regenerated, setIsRegenerated] = useState(false);
  const regenerateModalRefrence = useRef(null);
  useModalAutoClose({
    refrence: regenerateModalRefrence,
    close: () => {
      setIsRegenerated(false);
    },
  });
  const createPDFReport = (data: {
    client_info: any;
    patient_benchmark: ReportBenchmark[];
    treatment_plan: any;
  }) => {
    const doc = new jsPDF();

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
    doc.text("Contents", 10, 10);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("• Profile", 10, 20);
    doc.text("• Benchmark summary", 10, 30);
    doc.text("• Benchmark detail", 10, 40);
    doc.text("• Client goals", 10, 50);
    doc.text("• Recommended action areas", 10, 60);
    doc.text("• Recommended SMART Goals", 10, 70);

    doc.addPage();
    doc.setFontSize(12);
    doc.text("Client Information", 10, 10);

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

    // Add next section
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Please read before reviewing this report", 10, 10);
    const pageWidth = 180;
    let y = 20;

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

    // Group benchmarks by category
    const groupedBenchmarks: Record<string, any[]> = {};
    data.patient_benchmark.forEach((benchmark: any) => {
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

    // Create a table for each category
    Object.keys(groupedBenchmarks).forEach((category) => {
      doc.addPage();
      doc.setFontSize(16);
      doc.setTextColor(255, 140, 0);
      doc.text(`${category} Test Results`, 10, 10);

      (doc as any).autoTable({
        head: [
          ["Area", "Test L1", "Test L2", "Result", "Benchmark Performance"],
        ],
        body: groupedBenchmarks[category],
        startY: 20,
        theme: "grid",
        styles: {
          fontSize: 10,
          cellPadding: 2,
          halign: "center",
          valign: "middle",
          lineWidth: 0.1, // Set border width
          lineColor: [0, 0, 0], // Set border color (black)
        },
        headStyles: {
          fillColor: [255, 255, 255], // Change this to the desired color in RGB format
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
    // Add Client Goals Table
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(255, 140, 0);
    doc.text("Client Goals", 10, 10);

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
      startY: 20,
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

    const treatmentPlanData = data.treatment_plan.map((plan: any) => [
      plan.subCategory || "N/A",
      plan.area,
      "", // Placeholder, replace with actual logic if needed
      plan.status ? "Needs Focus" : "",
      plan.first12Weeks.dos.join(", ") || "N/A",
      plan.second12Weeks.dos.join(", ") || "N/A",
      // Include status to use later
    ]);

    // Add Treatment Plan Table
    doc.addPage();
    doc.setFontSize(16);
    doc.setTextColor(255, 140, 0);
    doc.text("Recommended Action Areas", 10, 10);

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
      body: treatmentPlanData.map((row: any) => [
        row[0],
        row[1],
        {
          content: row[2],
          styles: {
            fillColor:
              row[3] === "Needs Focus" ? [236, 141, 27] : [255, 255, 255],
          },
        }, // Conditional fill color
        row[3],
        row[4],
      ]),
      startY: 20,
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
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const confidentialityText = `
    The contents of this report have been prepared from confidential information and data so cannot be shared with anyone other than the client named in this report and coaches working for Longevity Performance Coaching (brand name of LTTL Hubs Limited).
    Client written permission is required to share this report with any other third parties.

    This report is classed as confidential and must be stored and handled to the requirements of UK data protection law.
    `;
    doc.text(doc.splitTextToSize(confidentialityText, pageWidth), 10, 20);
    // Save the PDF
    // doc.save("Benchmark_Assessment_Report.pdf");
    const PdfBase64 = doc.output("datauristring");
    const base64String = PdfBase64.split(",")[1];

    return base64String;
  };
  // const onButtonClick = async (planId: string | undefined) => {
  //   try {
  //     const response = await Application.downloadReport({
  //       treatment_plan_id: planId,
  //     });
    
      
  //     const data = response.data;
  //     console.log(data);
  //     console.log(response);
  //     console.log(planID);
     
      
  //     setPdfBase64String(createPDFReport(data));
     
  //     if (!data) {
  //       console.error("Data is undefined. Check the API response structure.");
  //       return;
  //     }

  //     const reportData = {
  //       report_type: "client_report ",
  //       treatment_plan_id: planId || "",
  //       report_string: pdfBase64String,
  //     };

  //     await Application.savereport(reportData);

  //     navigate("/pdf-viewer");
  //   } catch (error) {
  //     console.error("Error processing the report:", error);
  //   }
  // };
  const toggleDetailsSection = () => setIsDetailsOpen(!isDetailsOpen);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const myData = localStorage.getItem("tretmentPlan-" + id);
    if (myData) {
      const data = JSON.parse(myData);
  
      setBenchmarks(data[0]);
      setplanID(data[1]);
  
      const treatmentPlanId = data[1];
  
      const fetchReport = async () => {
        try {
          const response = await Application.downloadReport({
            treatment_plan_id: treatmentPlanId,
          });
  
          const reportData = response.data;
          console.log(reportData);
  
          const pdfString = createPDFReport(reportData);
          setPdfBase64String(pdfString);
          console.log(pdfString);
  
          const reportDataToSave = {
            report_type: "client_report",
            treatment_plan_id: treatmentPlanId,
            report_string: pdfString,
          };
  
          await Application.savereport(reportDataToSave);
  
        } catch (error) {
          console.error("Error processing the report:", error);
        }
      };
  
      fetchReport();
  
      setIsGenerated(true);
  
      Application.showPlanDescription(Number(id)).then((desResponse) => {
        setneedFocusBenchmarks(desResponse.data["need focus benchmarks"]);
        setDescription(desResponse.data.description);
      });
    }
  }, [id]);
  return (
    <div className="flex flex-col gap-3 w-full">
      <InfoCard></InfoCard>
      {regenerated && (
        <>
          <div className="absolute top-0 left-0 z-30 w-full h-full flex justify-center items-center">
            <RegenerateModal
              onGenerate={async (data) => {
                if (data && data.length > 0) {
                  localStorage.setItem(
                    "tretmentPlan-" + id,
                    JSON.stringify(data)
                  );

                  setBenchmarks(data[0]);
                  setplanID(data[1]);
                  setIsGenerated(true);

                  const desResponse = await Application.showPlanDescription(
                    Number(id)
                  );
                  setneedFocusBenchmarks(
                    desResponse.data["need focus benchmarks"]
                  );
                  setDescription(desResponse.data.description);
                } else {
                  setIsGenerated(false); // No data found
                }
              }}
              onClose={() => {
                setIsRegenerated(false);
              }}
              refEl={regenerateModalRefrence}
            ></RegenerateModal>
          </div>
          <div className="w-full h-full bg-black bg-opacity-50 fixed left-0 top-0"></div>
        </>
      )}
      {/* <div className="w-full bg-black-primary border border-main-border px-[6px] py-1 flex items-center gap-3 rounded-md">
        <input
          className="w-full border text-[10px] border-main-border bg-black-secondary rounded-md outline-none text-xs pl-2 py-1 text-primary-text"
          type="text"
          placeholder="Write here..."
        />
        <img src="/Themes/Aurora/icons/send.svg" alt="" />
      </div> */}
      {isGenerated ? (
        <div className="w-full flex gap-2 ">
          <div className="bg-black-primary text-primary-text w-full h-[340px] overflow-x-hidden overflow-y-scroll p-3 rounded-lg space-y-3 border border-main-border">
            <div className="flex justify-between items-center pb-4">
              <h2 className="text-sm font-semibold">Treatment Plan 012</h2>
              <div className="flex items-center space-x-4">
                <button
  onClick={() => window.open("/pdf-viewer", "_blank")}
  className={`flex items-center gap-1 bg-black-secondary px-4 py-2 border border-main-border rounded-lg text-primary-text text-xs `}
                >
                  <img
                    src="/Themes/Aurora/icons/document-download.svg"
                    alt=""
                  />
                  Download Report
                </button>

                {!showHistory && (
                  <button
                    onClick={() => setShowHistory(true)}
                    className={`flex items-center gap-1 bg-black-secondary px-4 py-2 border border-main-border rounded-lg text-primary-text text-xs `}
                  >
                    <img src="/Themes/Aurora/icons/clock.svg" alt="" />
                    Show History
                  </button>
                )}

                <Button
                  onClick={() => {
                    setIsRegenerated(true);
                  }}
                  theme={theme}
                >
                  <img src="/Themes/Aurora/icons/refresh-2.svg" alt="" />
                  Re-Generate
                </Button>
              </div>
            </div>

            <div
              onClick={() => setIsDescription(!isDescription)}
              className="w-full flex items-center gap-2 cursor-pointer text-sm"
            >
              <img
                src="/Themes/Aurora/icons/chevron-down.svg"
                className={`transition-transform ${
                  isDescription && "rotate-180"
                }`}
                alt=""
              />
              Description
              <div className="h-[1px] w-full bg-secondary-text" />
            </div>
            {isDescription && (
              <div className="w-full space-y-2 text-xs">
                <p className="mt-4 text-primary-text">{Description}</p>
                <div>
                  Concerning Results:{" "}
                  <span
                    onClick={() => setIsModalOpen(true)}
                    className="underline text-brand-primary-color cursor-pointer"
                  >
                    Detail{" "}
                  </span>
                  <BenchmarkModal isOpen={isModalOpen} onClose={closeModal} />
                </div>
                <ul className="list-disc ml-6 mt-4 text-primary-text">
                  {Array.isArray(needFocusBenchmarks) &&
                    needFocusBenchmarks.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                </ul>
                <div className="w-full flex items-center justify-between mt-4 border-b border-main-border pb-2">
                  <input
                    className="w-full bg-black-primary outline-none text-primary-text pl-2"
                    type="text"
                    placeholder="your comment..."
                  />
                  <Button theme={theme}>Send</Button>
                </div>
              </div>
            )}

            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleDetailsSection}
            >
              <img
                src="/Themes/Aurora/icons/chevron-down.svg"
                className={`${
                  isDetailsOpen ? "rotate-180" : ""
                } transition-transform`}
              />
              <span className="text-sm font-medium">Details</span>
              <div className="h-[1px] w-full bg-secondary-text" />
            </div>
            {isDetailsOpen && (
              <div className="mt-4">
                <div className="grid grid-cols-3 pb-2 border-b border-main-border font-medium text-sm">
                  <div>Benchmark Areas</div>
                  <div>First 12 weeks</div>
                  <div>Second 12 weeks</div>
                </div>
                {Array.isArray(benchmarks) && benchmarks.length > 0
                  ? benchmarks.map((benchmark, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-3 py-2 border-b border-main-border text-sm"
                      >
                        <div className="flex gap-24">
                          {index === 0 ||
                          benchmarks[index - 1].area !== benchmark.area ? (
                            <div className="font-semibold text-xs">
                              {benchmark.area}
                            </div>
                          ) : null}
                          {benchmark.subCategory && (
                            <div className="font-normal text-xs">
                              {benchmark.subCategory}
                            </div>
                          )}
                        </div>
                        <div className="text-[10px] font-medium overflow-hidden flex flex-col text-left ">
                          <ul className="space-y-4 ">
                            {benchmark.first12Weeks.dos.map((doItem, i) => (
                              <li key={i}>{doItem}</li>
                            ))}
                          </ul>

                          {/* <ul className="space-y-4 ">
                            {benchmark.first12Weeks.donts.map((dontItem, i) => (
                              <li className="text-nowrap max-w-[250px]" key={i}>
                                {dontItem}{" "}
                                <span className="bg-red-status text-black rounded-full px-2 py-1 ml-1 text-xs font-medium">
                                  Don`t
                                </span>
                              </li>
                            ))}
                          </ul> */}
                        </div>
                        <div className="text-[10px] font-medium overflow-hidden flex flex-col text-left ">
                          <ul className="  space-y-4 ">
                            {benchmark.second12Weeks.dos.map((doItem, i) => (
                              <li key={i}>{doItem}</li>
                            ))}
                          </ul>

                          {/* <ul className=" space-y-4 ">
                            {benchmark.second12Weeks.donts.map(
                              (dontItem, i) => (
                                <li className="text-nowrap" key={i}>
                                  {dontItem}{" "}
                                  <span className="bg-red-status text-black rounded-full px-2 py-1 ml-1 text-xs font-medium">
                                    Don`t
                                  </span>
                                </li>
                              )
                            )}
                          </ul> */}
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            )}
          </div>
          {showHistory && (
            <div className="bg-black-primary text-primary-text p-2 rounded-lg h-[340px] overflow-y-scroll space-y-2 border border-main-border w-[35%]">
              <div className="flex justify-between items-center font-medium">
                Treatment Plan History
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-secondary-text hover:text-primary-text"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm text-secondary-text font-medium">
                  Last Week
                </h3>
                {treatmentHistory.map((entry, index) => (
                  <div
                    onClick={() => setTreatmentActive(index)}
                    key={index}
                    className={`${
                      treatmentActive === index && "bg-black-third"
                    } rounded-lg p-2 cursor-pointer space-y-3`}
                  >
                    <div className="w-full flex justify-between items-center">
                      <p className="text-primary-text text-sm font-semibold">
                        {entry.date}
                      </p>
                      <p className="text-secondary-text text-sm">
                        {entry.time}
                      </p>
                    </div>
                    <p className="text-secondary-text text-xs w-full">
                      {entry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={
            "flex flex-col items-center justify-center bg-black-primary text-primary-text w-full h-[340px] overflow-y-scroll p-3 rounded-lg space-y-3 border border-main-border"
          }
        >
          <img src={"/images/EmptyState.png"} alt="Empty State" />
          <h1>Nothing to Show</h1>
          <Button
            onClick={() => {
              setIsRegenerated(true);
            }}
            theme={theme}
          >
            <img src="/Themes/Aurora/icons/add-square-fill.svg" alt="Add" />
            Generate
          </Button>
        </div>
      )}
    </div>
  );
};
