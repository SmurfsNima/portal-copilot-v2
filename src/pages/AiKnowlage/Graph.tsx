/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoadGraph, useRegisterEvents, useSigma } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useEffect, useState } from "react";
import Graph from "graphology";
import chroma from "chroma-js";
import { Application } from "@/api";
import { useLayoutCircular } from "@react-sigma/layout-circular"; // Import the circular layout
export const GraphEvents = () => {
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