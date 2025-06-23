import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TextUpdaterNode from './components/TextUpdaterNode';
import { defaultNodes } from './nodes/defaultNodes'
import { defaultEdges } from './nodes/defaultEdges'
import SideBar from './components/SideBar';
import DevTools from './components/Devtools';
import { useDnD } from './components/DnDContext';
import NodeDetails from './components/NodeDetails';
import CustomNode from './components/CustomNode';
import { createNewNode } from './utils/nodeUtils';


const nodeTypes = {
  textUpdater: TextUpdaterNode,
  customNode: CustomNode
};



function Flow() {
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState(null);
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
      const newNode = createNewNode(type, position);
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );

  const updateNode = useCallback((updatedNode) => {
    setNodes(nds => nds.map(node =>
      node.id === updatedNode.id ? updatedNode : node
    ));
    setSelectedNode(updatedNode);
  }, []);

  // Função chamada quando um nó é clicado
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const onDeleteNode = useCallback((nodeId) => {
    setNodes(nds => nds.filter(node => node.id !== nodeId));
    setEdges(eds => eds.filter(edge =>
      edge.source !== nodeId && edge.target !== nodeId
    ));
    setSelectedNode(null); // Limpa a seleção após deletar
  }, []);


  const onPainelClick = () => {
    setSelectedNode(null)
  }

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
        onNodeClick={onNodeClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onPaneClick={onPainelClick}
      >
        <DevTools />
        <Background />
        <Controls />
        <MiniMap zoomable pannable />
      </ReactFlow>

      {selectedNode &&
        <NodeDetails
          selectedNode={selectedNode}
          onUpdateNode={updateNode}
          onDeleteNode={onDeleteNode}
        />
      }
    </div>
  );
}

export default Flow;