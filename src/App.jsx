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
import { defaultNodes } from './nodes/defaultNodes'
import { defaultEdges } from './nodes/defaultEdges'
import SideBar from './components/SideBar';
import DevTools from './components/Devtools';
import { useDnD } from './components/DnDContext';
import NodeDetails from './components/NodeDetails';
import CustomNode from './components/CustomNode';
import { createNewNode } from './utils/nodeUtils';
import dagre from '@dagrejs/dagre';

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));


const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction, ranksep: 200 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  defaultNodes,
  defaultEdges,
);

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

  const edgeOptions = {
    animated: true
  };

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
        type: newType, // Usa o novo tipo aqui
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 30,
          height: 30,
        },
      }))
    );
  }, [edgeType]); // Adicione edgeType como dependência


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