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
import DevTools from './components/Devtools';
import { useDnD } from './components/DnDContext';


const nodeTypes = {
  textUpdater: TextUpdaterNode
};



function Flow() {
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

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

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: `${Math.random()}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
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

        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <DevTools />
        <Background />
        <Controls />
      </ReactFlow>


    </div>
  );
}

export default Flow;