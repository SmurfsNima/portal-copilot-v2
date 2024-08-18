/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Graph from "graphology";
import { Attributes } from "graphology-types";
import { useSigma, useRegisterEvents, useLoadGraph, useSetSettings } from "@react-sigma/core";
import { useConstructor } from "../../help";
// import { useLayoutCircular } from "@react-sigma/layout-circular";
export interface GraphDefaultProps {
  exeNods:Array<string>,
  catkeyword :React.MutableRefObject<Array<any>>
}
export const GraphDefault: React.FC<GraphDefaultProps> = ({exeNods}) => {
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();
  const loadGraph = useLoadGraph();
  const setSettings = useSetSettings();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const graph = new Graph();
  // const resolveParentNodes = (resolveString :Array<string>) => {
  //   graph.addNode(resolveString[0], { x: positions.Xlayer1, y: positions.Ylayer1, size: 15, label: resolveString[0], color:chroma.random().hex()});
  //   resolveString.map((_item,index) => {
  //       if(index!= 0) {
  //           resolveLayer2(resolveString[index].split('-'),resolveString[0])
  //       }
  //   })
  // }
  // const resolveLayer2 = (resolveString :Array<string>,parentKey:string) => {
  //   graph.addNode(resolveString[0], { x: positions.Xlayer2, y: positions.Ylayer2, size: 10, label: resolveString[0], color:chroma.random().hex()});
  //   graph.addEdgeWithKey(resolveString[0], parentKey, resolveString[0]);
  //   resolveString.map((_item,index) => {
  //       if(index!= 0){
  //           resolveLayer3(resolveString[index],resolveString[0])
  //       }
  //   })
  // }
  // const resolveLayer3 = (resolveString :string,parentKey:string) => {
  //   graph.addNode(resolveString, { x: positions.Xlayer3, y: positions.Ylayer3, size: 5, label: resolveString, color:chroma.random().hex()});
  //   graph.addEdgeWithKey(resolveString, resolveString, parentKey);
  // }  
  // const { assign } = useLayoutCircular();
  useConstructor(() => {
    // const layout = new ForceSupervisor(graph, { isNodeFixed: (_: any, attr: { highlighted: any; }) => !attr.highlighted ,
    // shouldSkipNode:(node,attr: any) => {
    //   return attr.highlighted 
    // }});
    // layout.start();   
    // const parentNods = graphText.replace(/\n/g,"").split('### ')
    // parentNods.map((_item,index) => {
    //     if(index != 0) {
    //         resolveParentNodes(parentNods[index].split(/\d+/g))
    //     }
    // })
    // nodesApi.getAllNodesAndEdges((resolve:GetEdgeAndNodesType) => {
    //     resolve.nodes.map((node) => {
    //       graph.addNode(node.id, { x: positions.xCircular, y: positions.yCircular,category1:node.category1,category2:node.category2, size: node.size , label: node.label, color:node.color});
    //     })
    //     resolve.edges.map((edges) => {
    //       if(graph.hasNode(edges.source) && graph.hasNode(edges.target)){
    //         graph.addEdge(edges.source, edges.target,{weight: edges.weight});
    //       }else {
    //         if(!graph.hasNode(edges.source)){
    //           console.warn(edges.source + 'is exist  ' + graph.hasNode(edges.source))
    //         }else{
    //           console.warn(edges.target + 'is exist  ' + graph.hasNode(edges.target))
    //         }
    //       }
    //     })
    //     loadGraph(graph);
    //     assign()
    //     // random.assign(graph);
    //     // setTimeout(() => {
    //     //   layout.start();    
    //     // }, 200);
    // })    
    loadGraph(graph);
    // assign()
  })
  useEffect(() => {
    registerEvents({
      doubleClickNode:() => {
          // nodeApi.getgraphKeyWord(e.node,(res) => {
          //   // setcatKey(res)
          //   catkeyword.current = res
          // })  
      },
      enterNode: (event) => setHoveredNode(event.node),
      leaveNode: () => setHoveredNode(null),
      downNode: (e) => {
          setDraggedNode(e.node);
          // setcatKey([])
        
          sigma.getGraph().setNodeAttribute(e.node, "highlighted", true);
      },
      mouseup: () => {
          if (draggedNode) {
          setDraggedNode(null);
          sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
          }
      },
      mousedown: () => {
          

          // Disable the autoscale at the first down interaction
          if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
      },
      mousemove: (e) => {
          // const graph = sigma.getGraph();
          if (draggedNode) {
          // Get new position of node
          const pos = sigma.viewportToGraph(e);
          sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
          sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);
          // graph.neighbors(draggedNode).map((item) => {
          //   const nodeAttt = sigma.getGraph().getNodeAttributes(item)
          //   // sigma.getGraph().getNodeAttribute({},item)
          //   sigma.getGraph().setNodeAttribute(item, "x", pos.x>0 ? nodeAttt.x + Math.random() * 2: nodeAttt.x - Math.random() * 2);
          //   sigma.getGraph().setNodeAttribute(item, "y", pos.y>0 ? nodeAttt.y + Math.random() * 2: nodeAttt.y - Math.random() * 2);
          // })
          // Prevent sigma to move camera:
          e.preventSigmaDefault();
          e.original.preventDefault();
          e.original.stopPropagation();
          }
      },
      touchup: () => {
          if (draggedNode) {
          setDraggedNode(null);
          sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
          }
      },
      touchdown: () => {
          // Disable the autoscale at the first down interaction
          if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
      },
      touchmove: (e:any) => {
          if (draggedNode) {
          // Get new position of node
          const pos = sigma.viewportToGraph(e);
          sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
          sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);

          // Prevent sigma to move camera:
          e.preventSigmaDefault();
          e.original.preventDefault();
          e.original.stopPropagation();
          }
      },      
    });
  }, [draggedNode, loadGraph, registerEvents, sigma]);

  useEffect(() => {
    const graphdata = sigma.getGraph();
    // graphdata.forEachNode((node: any) => {
    //   if(exeNods.includes(node)){
    //     graphdata.forEachInNeighbor(node,(neighbor) => {
    //       graphdata.setNodeAttribute(neighbor, "hidden", true)
    //       graphdata.forEachInNeighbor(neighbor,(layer3) => {
    //         graphdata.setNodeAttribute(layer3, "hidden", true)
    //       })
    //     })

    //   }else {
    //     graphdata.forEachInNeighbor(node,(neighbor) => {
    //       graphdata.setNodeAttribute(neighbor, "hidden", false)
    //       graphdata.forEachInNeighbor(neighbor,(layer3) => {
    //         graphdata.setNodeAttribute(layer3, "hidden", false)
    //       })
    //     })        
    //   }
    //   graphdata.setNodeAttribute(node, "hidden", exeNods.includes(node)?true:false)
    // });   
    graphdata.forEachNode((node,{ category1, category2 }) => {
      graphdata.setNodeAttribute(node, "hidden", exeNods.includes(node) ||exeNods.includes(category1) || exeNods.includes(category2))
    })
  })
  useEffect(() => {
    setSettings({
      nodeReducer: (node, data) => {
        const graph = sigma.getGraph();
        const newData: Attributes = { ...data, highlighted: data.highlighted || false };

        if (hoveredNode) {
          if (node === hoveredNode || graph.neighbors(hoveredNode).includes(node)) {
            newData.highlighted = true;
            newData.labelColor = '#fff'; 
          } else {
            newData.labelColor = '#fff';
            newData.color = "#FFFFFF";
            newData.highlighted = false;
          }
        }
        return newData;
      },
      edgeReducer: (edge, data) => {
        const graph = sigma.getGraph();
        const newData = { ...data, hidden: false };

        if (hoveredNode && !graph.extremities(edge).includes(hoveredNode)) {
          newData.hidden = true;
        }
        return newData;
      },
    });
  }, [hoveredNode, setSettings, sigma]);

  return null;
};