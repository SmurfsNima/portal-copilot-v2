import { SigmaContainer } from "@react-sigma/core";
import { useLoadGraph, useRegisterEvents, useSigma } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useEffect, useState } from "react";
import Graph from "graphology";
import chroma from "chroma-js";
import { Application } from "@/api";
import { useLayoutCircular } from "@react-sigma/layout-circular";
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
  isInitialLoad: boolean;
}



export const LoadGraph: React.FC<LoadGraphProps> = ({ activeFilters, isInitialLoad }) => {
  const loadGraph = useLoadGraph();
  const { assign } = useLayoutCircular(); 

  useEffect(() => {
    const graph = new Graph();

    const fetchGraphData = async () => {
      try {
        const response = await Application.getgraphData();
        const graphData = response.data;

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
              color: chroma.random().hex(),
            });
          }
          else{
              console.warn(`Missing nodes for edge: ${edge.source} -> ${edge.target}`);

          }
        });

        loadGraph(graph);
        assign();
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    fetchGraphData();
  }, [activeFilters, isInitialLoad, loadGraph, assign]);

  return null;
};
const AiKnowledge = () => {
  const [isContractsOpen, setIsContractsOpen] = useState(true);
  const [isAgreementsOpen, setIsAgreementsOpen] = useState(true);
  const [isReportsOpen, setIsReportsOpen] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const categories = [
    "Health",
    "Fitness",
    "Aging",
    "Symptoms",
    "Interventions",
    "Wellness",
    "Exercise",
    "Mental Health",
    "Nutrition",
    "Strength"
  ];
  const handleButtonClick = (category: string) => {
    setIsInitialLoad(false);
    setActiveFilters((prevFilters) =>
      prevFilters.includes(category)
        ? prevFilters.filter((filter) => filter !== category)
        : [...prevFilters, category]
    );
  };
  return (
    <div className="relative text-primary-text flex justify-center w-full">
      <div className="w-64 text-primary-text text-xs text-nowrap flex flex-col px-5 pt-[55px]">
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
      </div>

      <SigmaContainer
        settings={{
          allowInvalidContainer: true,
          renderLabels: true,
          labelColor: { color: "#fff" },
          defaultDrawNodeHover: (context, data) => {
            const size = data.size || 10;
            context.fillStyle = "#fff"; // Dark hover color

            context.beginPath();
            context.arc(data.x, data.y, size + 4, 0, Math.PI * 4, true);
            context.closePath();
            context.fill();
          },
        }}
        id="sigma-container"
        style={{ height: window.innerHeight, width: window.innerWidth, backgroundColor: "#121212" }}
      >
        <LoadGraph activeFilters={activeFilters} isInitialLoad={isInitialLoad} />
        <GraphEvents />
      </SigmaContainer>

      <div className="fixed right-5 top-[15%] w-64 text-primary-text bg-black-primary border border-main-border flex flex-col p-4 rounded-md">
        <button className="mb-4 flex justify-center gap-2 text-secondary-text border border-main-border border-dashed py-2 rounded-lg">
          <img src="/Themes/Aurora/icons/add-square.svg" alt="Add" />
          Add New Document
        </button>
        <div className="overflow-y-auto">
          <div className="mb-4">
            <h3 className="text-lg mb-2">Documents</h3>
            <div className="ml-4">
              <div className="flex items-center mb-2 cursor-pointer">
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
              {isContractsOpen && (
                <div className="ml-4 border-l-2 border-gray-600 pl-2">
                  <div className="flex items-center mb-2">
                    <input className="custom-checkbox" type="checkbox" id="legal" />
                    <label htmlFor="legal" className="ml-2">
                      Legal
                    </label>
                  </div>
                  <div className="flex items-center mb-2">
                    <input className="custom-checkbox" type="checkbox" id="nda" />
                    <label htmlFor="nda" className="ml-2">
                      NDA.pdf
                    </label>
                  </div>
                  <div className="flex items-center mb-2 cursor-pointer" onClick={() => setIsAgreementsOpen(!isAgreementsOpen)}>
                    <input className="custom-checkbox" type="checkbox" id="agreements" />
                    <label htmlFor="agreements" className="ml-2">
                      Agreements
                    </label>
                  </div>
                  {isAgreementsOpen && (
                    <div className="ml-4 border-l-2 border-gray-600 pl-2">
                      <div className="flex items-center mb-2">
                        <input className="custom-checkbox" type="checkbox" id="client" />
                        <label htmlFor="client" className="ml-2">
                          Client
                        </label>
                      </div>
                      <div className="flex items-center mb-2">
                        <input className="custom-checkbox" type="checkbox" id="service" />
                        <label htmlFor="service" className="ml-2">
                          Service
                        </label>
                      </div>
                      <div className="flex items-center mb-2">
                        <input className="custom-checkbox" type="checkbox" id="vendor" />
                        <label htmlFor="vendor" className="ml-2">
                          Vendor
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              )}
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
              </div>
            </div>
          </div>
          <div>
            <p className="text-secondary-text">
              Practicing guided <span className="text-purple-400">sleep</span> meditation will imbue your <span className="text-purple-400">sleep</span> with awareness.
              In that way, <span className="text-purple-400">sleep</span> itself becomes a meditation. If you{" "}
              <span className="text-purple-400">sleep</span> for an hour, you've meditated for an hour. Lovely to think about it that way, isn't it?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiKnowledge;