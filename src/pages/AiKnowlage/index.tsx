/* eslint-disable @typescript-eslint/no-explicit-any */

import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
// import { GraphDefault } from "./Graph";
import { useEffect } from "react";
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
    graph.addNode("segregation", { x: 7, y: 4, size: 32, label: "segregation", color: "##9AC919", });

    graph.addEdgeWithKey("rel1", "society", "american", { label: "REL_1" });
    graph.addEdgeWithKey("rel2", "join", "american", { label: "REL_1" });
    graph.addEdgeWithKey("rel3", "join", "segregation", { label: "REL_1" });
    graph.addEdgeWithKey("rel4", "magnificent", "land", { label: "REL_1" });
    graph.addEdgeWithKey("rel5", "segregation", "society", { label: "REL_1" });
    graph.addEdgeWithKey("rel6", "society", "segregation", { label: "REL_1" });
    loadGraph(graph);
  }, [loadGraph]);

  return null;
};    

const AiKnowlage = () => {
    // const myRef = useRef<Array<any>>([])
    return (
        <>
        <SigmaContainer style={{ height: window.innerHeight, width: window.innerWidth,backgroundColor:'#121212' }}>
            <LoadGraph></LoadGraph>
        </SigmaContainer>        
        </>
    )
}

export default AiKnowlage