import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import {socialNetworkGraph, userGraph} from "../../axios/apiCalls"
import { useNavigate } from "react-router-dom";


const GraphComponent = () => {
  const fgRef = useRef(null);
  const navigate = useNavigate();

  const [graphData, setGraphData] = useState({nodes: [], links: []});
  
  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('link').distance(50); // Adjust the link distance as needed
    }
    socialNetworkGraph().then(response => {
      if (response.status == 200) {
        generateGraphData(response.data)
        console.log(response.data)
      }
    })
  }, []);
  
  const generateGraphData = (data) => {
    console.log(data)
    const {nodes, connections} = data
    
    const nodesL = nodes.map((node) => ({
      id: node,
      label: node
    }));

    const linkL = connections.map((connection) => ({
      source: connection.source,
      target: connection.target
    }));

    console.log(nodesL, linkL)
    setGraphData({nodes: nodesL, links: linkL})
  };

  return (
    <div className='flex justify-center'>
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel="label"
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        emitPar
        onNodeClick={(node) => navigate(`/perfil/${node.id}`)}
      />
    </div>
  );
};

export default GraphComponent;