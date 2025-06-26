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
  Panel,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TextUpdaterNode from './components/TextUpdaterNode';
import SideBar from './components/SideBar';
import DevTools from './components/Devtools';
import { useDnD } from './components/DnDContext';
import NodeDetails from './components/NodeDetails';
import CustomNode from './components/CustomNode';
import { createNewNode } from './utils/nodeUtils';
import dagre from '@dagrejs/dagre';

// import { defaultNodes } from './nodes/defaultNodes'
// import { defaultEdges } from './nodes/defaultEdges'
import { dataFlow } from './nodes/dataFlow';
import { getLayoutedElements } from './utils/transformFlowVerticalHorizontal';
const { defaultNodes, defaultEdges } = dataFlow;


const SUPPORTED_EDGE_TYPES = ['default', 'smoothstep', 'straight'];


const nodeTypes = {
  textUpdater: TextUpdaterNode,
  customNode: CustomNode
};



function Flow() {
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);
  //const [layoutDirection, setLayoutDirection] = useState('TB');
  const { screenToFlowPosition } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState(null);
  const [type] = useDnD();
  const [edgeType, setEdgeType] = useState('smoothstep');

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({
      ...params,
      type: edgeType,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 30,
        height: 30,
      },
    }, eds)),
    [edgeType],
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



  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction,
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges],
  );

  const changeEdge = useCallback(() => {
    // Alterna entre os tipos
    const currentIndex = SUPPORTED_EDGE_TYPES.indexOf(edgeType);
    const nextIndex = (currentIndex + 1) % SUPPORTED_EDGE_TYPES.length;
    const newType = SUPPORTED_EDGE_TYPES[nextIndex];

    setEdgeType(newType);

    setEdges(prevEdges =>
      prevEdges.map(edge => ({
        ...edge,
        type: newType,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 30,
          height: 30,
        },
      }))
    );
  }, [edgeType]);


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
        defaultEdgeOptions={{ animated: true }}
        onNodeClick={onNodeClick}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onPaneClick={onPainelClick}
      // minZoom={1.05}
      >
        <DevTools />
        <Background />
        <Controls />
        <MiniMap zoomable pannable />
        <Panel position="top-right">
          <div style={{ display: 'flex', gap: '1em' }}>
            <button className="btn" onClick={() => changeEdge('TB')}>
              Change Edge
            </button>
            <button className="btn" onClick={() => onLayout('TB')}>
              vertical layout
            </button>
            <button className="btn" onClick={() => onLayout('LR')}>
              horizontal layout
            </button>
          </div>

        </Panel>
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