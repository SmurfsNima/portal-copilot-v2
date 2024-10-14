/* eslint-disable @typescript-eslint/no-explicit-any */
import { SigmaContainer } from "@react-sigma/core";
import { useLoadGraph, useRegisterEvents, useSigma } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useContext, useEffect, useState } from "react";
import Graph from "graphology";
// import  graphDataMock from '../../api/--moch--/data/graph.json';
import chroma from "chroma-js";
// import { ApplicationMock } from "@/api";
import { useLayoutCircular } from "@react-sigma/layout-circular";
import { Application } from "@/api";
import { AppContext } from "@/store/app";
const GraphEvents = () => {
  const registerEvents = useRegisterEvents();
  const sigma = useSigma();
  const [draggedNode, setDraggedNode] = useState<string | null>(null);

  useEffect(() => {
    registerEvents({
      downNode: (e) => {
        setDraggedNode(e.node);
        const graph = sigma.getGraph();
        graph.setNodeAttribute(e.node, "highlighted", true);
        sigma.refresh();
      },
      mousemovebody: (e) => {
        if (!draggedNode) return;
        const pos = sigma.viewportToGraph(e);
        sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
        sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);
        e.preventSigmaDefault();
        e.original.preventDefault();
        e.original.stopPropagation();
      },
      mouseup: () => {
        if (draggedNode) {
          const graph = sigma.getGraph();
          graph.removeNodeAttribute(draggedNode, "highlighted");
          setDraggedNode(null);
          sigma.refresh();
        }
      },
    });
  }, [registerEvents, sigma, draggedNode]);

  return null;
};

interface LoadGraphProps {
  activeFilters: string[];
  graphData: any; // Use the appropriate type based on your data structure
  isInitialLoad: boolean;
}

const LoadGraph: React.FC<LoadGraphProps> = ({ activeFilters, graphData, isInitialLoad }) => {
  const loadGraph = useLoadGraph();
  const { assign } = useLayoutCircular();

  useEffect(() => {
    if (!graphData) return; // Ensure graphData is available

    const graph = new Graph();

    const nodesToAdd = isInitialLoad
      ? graphData.nodes
      : graphData.nodes.filter(
          (node: any) =>
            activeFilters.includes(node.category1) || activeFilters.includes(node.category2)
        );

    const nodeSet = new Set(nodesToAdd.map((node: any) => node.id));

    nodesToAdd.forEach((node: any) => {
      const randomColor = chroma.random().hex();
      graph.addNode(node.id, {
        label: node.label,
        size: node.size,
        color: randomColor,
        x: Math.random(),
        y: Math.random(),
      });
    });

    graphData.edges.forEach((edge: any, index: number) => {
      if (nodeSet.has(edge.source) && nodeSet.has(edge.target)) {
        graph.addEdgeWithKey(`edge-${index}`, edge.source, edge.target, {
          weight: edge.weight,
          color: "#fff",
        });
      } else {
        console.warn(`Missing nodes for edge: ${edge.source} -> ${edge.target}`);
      }
    });

    loadGraph(graph);
    assign();
  }, [activeFilters, graphData, isInitialLoad, loadGraph, assign]);

  return null;
};
const AiKnowledge = () => {
  // const [isContractsOpen, setIsContractsOpen] = useState(true);
  // const [isAgreementsOpen, setIsAgreementsOpen] = useState(true);
  // const [isReportsOpen, setIsReportsOpen] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [graphData, setGraphData] = useState<any>(null); // Adjust the type as needed

  // const categories = [
  //   "Health",
  //   "Fitness",
  //   "Aging",
  //   "Symptoms",
  //   "Interventions",
  //   "Wellness",
  //   "Exercise",
  //   "Mental Health",
  //   "Nutrition",
  //   "Strength"
  // ];
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await Application.getgraphData();
        if(response.data.nodes){
          setGraphData(response.data);
          setActiveFilters([...new Set(response.data?.nodes.map((e:any) =>e.category2))] as Array<string>)
        }
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchGraphData();
  }, []);
  const handleButtonClick = (category: string) => {
    setIsInitialLoad(false);
    setActiveFilters((prevFilters) =>
      prevFilters.includes(category)
        ? prevFilters.filter((filter) => filter !== category)
        : [...prevFilters, category]
    );
  };
  // const [modelData,setModelData] = useState(
  //   [
  //       {
  //           "Node Type": "DISEASE_DISORDER",
  //           "Current Information": "Strokes",
  //           "Source": "stroke.txt",
  //           "Last Update": "2024, 10, 01"
  //       },
  //       {
  //           "Node Type": "SIGN_SYMPTOM",
  //           "Current Information": "dysphagia",
  //           "Source": "stroke.txt",
  //           "Last Update": "2024, 10, 01"
  //       },
  //       {
  //           "Node Type": "SIGN_SYMPTOM",
  //           "Current Information": "focal muscle weakness",
  //           "Source": "stroke.txt",
  //           "Last Update": "2024, 10, 01"
  //       },
  //       {
  //           "Node Type": "SIGN_SYMPTOM",
  //           "Current Information": "dysarthria",
  //           "Source": "stroke.txt",
  //           "Last Update": "2024, 10, 01"
  //       },
  //       {
  //           "Node Type": "SIGN_SYMPTOM",
  //           "Current Information": "paresis",
  //           "Source": "stroke.txt",
  //           "Last Update": "2024, 10, 01"
  //       },
  //       {
  //           "Node Type": "DISEASE_DISORDER",
  //           "Current Information": "urinary tract infections",
  //           "Source": "stroke.txt",
  //           "Last Update": "2024, 10, 01"
  //       }
  //   ]    
  // )
  // const [fileName, setFileName] = useState("");
  // const convertToBase64 = (file:any,fileName:string) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);

  //   reader.onloadend = () => {
  //     Application.getDocument({
  //       files:[
  //         {
  //           filename:fileName,
  //           content:reader.result?.toString().split(",")[1]
  //         }
  //       ]
  //     }).then((res) => {
  //       console.log(res)
  //     })
  //   };

  //   reader.onerror = (error) => {
  //     console.error("Error converting file to Base64:", error);
  //   };
  // };
  const context = useContext(AppContext)
  const [sigmaSetting,setSigmaSetting] =useState<any>({})
  useEffect(() => {
    setTimeout(() => {
      if(context.themeISLight){
        setSigmaSetting(
          {
            allowInvalidContainer: false,
            renderLabels: true,
            labelColor: { color: "#000" },
            defaultDrawNodeHover: (context:any, data:any) => {
              const size = data.size || 10;
              context.fillStyle = "#fff"; // Dark hover color
  
              context.beginPath();
              context.arc(data.x, data.y, size + 4, 0, Math.PI * 4, true);
              context.closePath();
              context.fill();
            },
          }
        )
      }else {
        setSigmaSetting(
          {
            allowInvalidContainer: false,
            renderLabels: true,
            labelColor: { color: "#fff" },
            defaultDrawNodeHover: (context:any, data:any) => {
              const size = data.size || 10;
              context.fillStyle = "#fff"; // Dark hover color
  
              context.beginPath();
              context.arc(data.x, data.y, size + 4, 0, Math.PI * 4, true);
              context.closePath();
              context.fill();
            },
          }
        )

      }
    }, 600);
  },[])
  return (
    <div className="relative text-primary-text flex justify-center w-full">
      {/* <div className="   w-64 text-primary-text text-xs text-nowrap flex flex-col px-5 pt-[55px]">
      {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleButtonClick(category)}
            className={`rounded-md border border-main-border mb-2 w-full p-2 text-center transition-colors ${
              activeFilters.includes(category) ? "bg-gray-700 text-white" : "bg-black-primary hover:bg-gray-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div> */}

      <SigmaContainer
        settings={sigmaSetting}
        id="sigma-container"
        className=" bg-white dark:bg-[#121212]"
        style={{ height: window.innerHeight, width: window.innerWidth }}
      >
        <LoadGraph graphData={graphData}  activeFilters={activeFilters} isInitialLoad={isInitialLoad} />
        <GraphEvents />
      </SigmaContainer>

      <div className="fixed right-5 top-[15%] w-[340px] text-primary-text bg-white border-light-border-color dark:bg-black-primary border dark:border-main-border flex flex-col p-4 rounded-md">
        {/* <button onClick={() => {
          document.getElementById("uploadFile")?.click()
        }} className="mb-4 relative flex justify-center gap-2 text-secondary-text border border-main-border border-dashed py-2 rounded-lg">
          <img src="/Themes/Aurora/icons/add-square.svg" alt="Add" />
          Add New Document
          <input id="uploadFile" onChange={(e:any) => {
              const file = e.target.files[0];
              if (file) {
                // setFileName(file.name);
                convertToBase64(file,file.name);
              }

          }} className="absolute w-full h-full invisible " type="file" />
        </button> */}
        <div className="overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-lg text-light-secandary-text dark:text-white mb-2">Documents</h3>
            <div className="ml-4">
              {[...new Set(graphData?.nodes.map((e:any) =>e.category2))].map((el:any) => {
                return (
                  <>
                  <div className="flex mb-2 justify-start items-center">
                    <input checked={activeFilters.includes(el)} onChange={() => {
                      handleButtonClick(el)
                    }} type="checkbox"  className="mr-2 peer shrink-0 appearance-none w-5 h-5 rounded-md bg-black-primary border border-light-border-color dark:border-main-border checked:bg-brand-secondary-color checked:border-transparent checked:text-black checked:before:content-['✔'] checked:before:text-black checked:before:block checked:before:text-center" />
                    <label
                      onClick={() => {
                        handleButtonClick(el)
                      }} 
                      htmlFor="contracts"
                      className="ml-2 text-light-secandary-text dark:text-white text-[14px] flex gap-1"
                    >
                      {/* <img className={`${isContractsOpen && "rotate-180"}`} src="/Themes/Aurora/icons/chevron-down.svg" alt="" /> */}
                      {el}
                    </label>

                  </div>
                  </>
                )
              })}
              {/* <div className="flex items-center mb-2 cursor-pointer">
                <input
                
                  className="custom-checkbox"
                  type="checkbox"
                  id="contracts"
                />
                <label
                  onClick={() => setIsContractsOpen(!isContractsOpen)}
                  htmlFor="contracts"
                  className="ml-2 flex gap-1"
                >
                  <img className={`${isContractsOpen && "rotate-180"}`} src="/Themes/Aurora/icons/chevron-down.svg" alt="" />
                  Contracts
                </label>
              </div>
              <div className="flex items-center mb-2 cursor-pointer">
                <input
                  className="custom-checkbox"
                  type="checkbox"
                  id="reports"
                />
                <label
                  onClick={() => setIsReportsOpen(!isReportsOpen)}
                  htmlFor="reports"
                  className="ml-2 flex gap-1"
                >
                  <img className={`${isReportsOpen && "rotate-180"}`} src="/Themes/Aurora/icons/chevron-down.svg" alt="" />
                  Reports
                </label>
              </div> */}
            </div>
          </div>
          <div>
            {/* <p className="text-secondary-text">
              Practicing guided <span className="text-purple-400">sleep</span> meditation will imbue your <span className="text-purple-400">sleep</span> with awareness.
              In that way, <span className="text-purple-400">sleep</span> itself becomes a meditation. If you{" "}
              <span className="text-purple-400">sleep</span> for an hour, you've meditated for an hour. Lovely to think about it that way, isn't it?
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiKnowledge;