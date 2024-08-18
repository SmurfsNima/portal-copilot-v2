/* eslint-disable @typescript-eslint/no-explicit-any */

import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
// import { GraphDefault } from "./Graph";
import { useEffect , useState } from "react";
import Graph from "graphology";

export const LoadGraph = () => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph = new Graph();
    graph.addNode("society", { x: 0, y: 0, size: 15, label: "society", color: "#F4AE2F", });
    graph.addNode("land", { x: 2, y: 1, size: 25, label: "land", color: "#3AED9B", });
    graph.addNode("american", { x: 4, y: 3, size: 13, label: "american", color: "#DA93FF", });
    graph.addNode("magnificent", { x: 1, y: 4, size: 17, label: "magnificent", color: "#C5F432", });
    graph.addNode("promissory", { x: 2, y: 5, size: 50, label: "promissory", color: "#F4AE2F", });
    graph.addNode("join", { x: 1, y: 5, size: 10, label: "join", color: "#DA93FF", });
    graph.addNode("segregation", { x: 7, y: 4, size: 32, label: "segregation", color: "#9AC919", });
    graph.addNode("health", { x: 3, y: 2, size: 20, label: "health", color: "#FF6347" });
    graph.addNode("brutal", { x: 5, y: 4, size: 12, label: "brutal", color: "#FFD700" });
    graph.addNode("satisfied", { x: 6, y: 3, size: 22, label: "satisfied", color: "#00FA9A" });
    graph.addNode("hope", { x: 4, y: 6, size: 18, label: "hope", color: "#1E90FF" });
    graph.addNode("fear", { x: 5, y: 5, size: 15, label: "fear", color: "#FF4500" });
    graph.addNode("trust", { x: 3, y: 6, size: 19, label: "trust", color: "#8A2BE2" });
    graph.addNode("joy", { x: 2, y: 3, size: 11, label: "joy", color: "#FF69B4" });
    graph.addNode("anger", { x: 6, y: 1, size: 14, label: "anger", color: "#FF8C00" });



    graph.addEdgeWithKey("rel1", "society", "american", { label: "REL_1" });
    graph.addEdgeWithKey("rel2", "join", "american", { label: "REL_1" });
    graph.addEdgeWithKey("rel3", "join", "segregation", { label: "REL_1" });
    graph.addEdgeWithKey("rel4", "magnificent", "land", { label: "REL_1" });
    graph.addEdgeWithKey("rel5", "segregation", "society", { label: "REL_1" });
    graph.addEdgeWithKey("rel6", "society", "segregation", { label: "REL_1" });
    graph.addEdgeWithKey("rel7", "society", "health", { label: "REL_2" });
    graph.addEdgeWithKey("rel8", "health", "brutal", { label: "REL_3" });
    graph.addEdgeWithKey("rel9", "brutal", "satisfied", { label: "REL_4" });
    graph.addEdgeWithKey("rel10", "satisfied", "hope", { label: "REL_5" });
    graph.addEdgeWithKey("rel11", "hope", "fear", { label: "REL_6" });
    graph.addEdgeWithKey("rel12", "fear", "trust", { label: "REL_7" });
    graph.addEdgeWithKey("rel13", "trust", "joy", { label: "REL_8" });
    graph.addEdgeWithKey("rel14", "joy", "anger", { label: "REL_9" });
    graph.addEdgeWithKey("rel15", "anger", "society", { label: "REL_10" });


    loadGraph(graph);
  }, [loadGraph]);

  return null;
};    

const AiKnowlage = () => {
    // const myRef = useRef<Array<any>>([])
    const [isContractsOpen, setIsContractsOpen] = useState(true);
    const [isReports, setISReports] = useState(true);
    const [isAgreementsOpen, setIsAgreementsOpen] = useState(true);
    return (
      <div className="relative text-primary-text flex justify-center w-full">
         <div className="   w-64  text-primary-text flex flex-col pl-[20px] pt-[55px]  ">
      {/* <div className="mb-8">
        <img src="/path/to/logo.png" alt="Logo" className="w-12 h-12" />
      </div> */}
      <button className=" rounded-md border border-main-border mb-2 w-full p-2 text-center bg-black-primary  hover:bg-gray-700">Longevity Activity</button>
      <button className=" rounded-md border border-main-border mb-2 w-full p-2 text-center bg-black-primary hover:bg-gray-700">Longevity Supplement</button>
      <button className=" rounded-md border border-main-border mb-2 w-full p-2 text-center bg-black-primary hover:bg-gray-700">Longevity Nutrition</button>
      <button className=" rounded-md border border-main-border mb-2 w-full p-2 text-center bg-black-primary hover:bg-gray-700">Longevity Mental</button>
      <button className=" rounded-md border border-main-border mb-2 w-full p-2 text-center bg-black-primary hover:bg-gray-700">Nutritionist</button>
      <button className=" rounded-md border border-main-border mb-2 w-full p-2 text-center bg-black-primary hover:bg-gray-700">Psychologist</button>
      <button className=" rounded-md border border-main-border mb-2 w-full p-2 text-center bg-black-primary hover:bg-gray-700">Pharmacist</button>
      <button className=" rounded-md border border-main-border mb-2 w-full p-2 text-center bg-black-primary hover:bg-gray-700">Physiotherapist</button>
    </div>
        <SigmaContainer style={{ height: window.innerHeight, width: window.innerWidth,backgroundColor:'#121212', }}>
            <LoadGraph></LoadGraph>
        </SigmaContainer> <>
        <div className="fixed right-5 top-[15%]  w-64 text-primary-text bg-black-primary border border-main-border flex flex-col p-4 rounded-md">
      <button className="mb-4 flex justify-center gap-2 text-secondary-text border border-main-border border-dashed py-2 rounded-lg">
        <img src="/public/Themes/Aurora/icons/add-square.svg" alt="Add" />
        Add New Document
      </button>
      <div className="overflow-y-auto">
        <div className="mb-4">
          <h3 className="text-lg mb-2">Documents</h3>
          <div className="ml-4">
            <div className="flex  items-center mb-2 cursor-pointer ">
            <input className="custom-checkbox" type="checkbox" id="Contracts" />
              <label  onClick={() => setIsContractsOpen(!isContractsOpen)}   htmlFor="Contracts" className="ml-2 flex gap-1"> <img className={`${isContractsOpen && 'rotate-180' }`}  src="/Themes/Aurora/icons/chevron-down.svg"  alt="" /> Contracts</label>
             

             
            </div>
            {isContractsOpen && (
              <div className="ml-4 border-l-2 border-gray-600 pl-2">
                <div className="flex items-center mb-2">
                  <input className="custom-checkbox" type="checkbox" id="legal" />
                  <label htmlFor="legal" className="ml-2">Legal</label>
                </div>
                <div className="flex items-center mb-2">
                  <input className="custom-checkbox" type="checkbox" id="nda" />
                  <label htmlFor="nda" className="ml-2">NDA.pdf</label>
                </div>
                <div className="flex items-center mb-2 cursor-pointer" onClick={() => setIsAgreementsOpen(!isAgreementsOpen)}>
                  <input className="custom-checkbox" type="checkbox" id="agreements" />
                  <label htmlFor="agreements" className="ml-2">Agreements</label>
                
                </div>
                {isAgreementsOpen && (
                  <div className="ml-4 border-l-2 border-gray-600 pl-2">
                    <div className="flex items-center mb-2">
                      <input className="custom-checkbox" type="checkbox" id="client" />
                      <label htmlFor="client" className="ml-2">Client</label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input className="custom-checkbox" type="checkbox" id="service" />
                      <label htmlFor="service" className="ml-2">Service</label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input className="custom-checkbox" type="checkbox" id="vendor" />
                      <label htmlFor="vendor" className="ml-2">Vendor</label>
                    </div>
                  </div>
                )}
              </div>
            )}
           <div className="flex  items-center mb-2 cursor-pointer">
           <input className="custom-checkbox" type="checkbox" id="Contracts" />
              <label  onClick={() => setISReports(!isReports)}   htmlFor="Contracts" className="ml-2 flex gap-1"> <img className={`${isReports && 'rotate-180' }`}  src="/Themes/Aurora/icons/chevron-down.svg"  alt="" /> Reports</label>
             

             
            </div>
          </div>
        </div>
        <div>
          <p className="text-secondary-text">
            Practicing guided <span className="text-purple-400">sleep</span> meditation will imbue your <span className="text-purple-400">sleep</span> with awareness. In that way, <span className="text-purple-400">sleep</span> itself becomes a meditation. If you <span className="text-purple-400">sleep</span> for an hour, you've meditated for an hour. Lovely to think about it that way, isn't it?
          </p>
        </div>
      </div>
    </div>
    </>
        </div>
    )
}

export default AiKnowlage