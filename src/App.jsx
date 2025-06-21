import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TextUpdaterNode from './components/TextUpdaterNode';
import { defaultNodes } from './nodes/defaultNodes'
import { defaultEdges } from './nodes/defaultEdges'
import SideBar from './components/SideBar';


const nodeTypes = {
  textUpdater: TextUpdaterNode
};



function Flow() {
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );



  const edgeOptions = {
    animated: true,
  };

  return (
    <div id='app'>

      <SideBar />
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        fitView
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={edgeOptions}
      >
        <Background />
        <Controls />
      </ReactFlow>


    </div>
  );
}

export default Flow;