import { useCallback, useContext } from 'react';
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
import TextUpdaterNode from './TextUpdaterNode';
import SideBar from './SideBar';
import DevTools from './Devtools';
import NodeDetails from './NodeDetails';
import CustomNode from './CustomNode';
import { createNewNode } from '../utils/nodeUtils';
import { FlowContext } from '../contexts/flow-context'; // Importe o contexto
import { getLayoutedElements } from '../utils/transformFlowVerticalHorizontal';

const SUPPORTED_EDGE_TYPES = ['default', 'smoothstep', 'straight'];

const nodeTypes = {
    textUpdater: TextUpdaterNode,
    customNode: CustomNode
};

export default function Flow() {

    const {
        nodes,
        edges,
        selectedNode,
        edgeType,
        direction,
        typeComponent,

        setNodes,
        setEdges,
        setSelectedNode,
        setEdgeType,
        updateNode,
        deleteNode,
        applyLayout,
        setDirection
    } = useContext(FlowContext);


    const { screenToFlowPosition } = useReactFlow();

    const onNodesChange = useCallback(
        (changes) => setNodes(applyNodeChanges(changes, nodes)),
        [nodes, setNodes]
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges(applyEdgeChanges(changes, edges)),
        [edges, setEdges]
    );

    const onConnect = useCallback(
        (params) => setEdges(addEdge({
            ...params,
            type: edgeType,
            markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 30,
                height: 30,
            },
        }, edges)),
        [edgeType, edges, setEdges]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            if (!typeComponent) return;

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = createNewNode(typeComponent, position, direction);
            setNodes([...nodes, newNode]);
        },
        [screenToFlowPosition, typeComponent, nodes, setNodes]
    );

    const onNodeClick = useCallback((event, node) => {
        setSelectedNode(node);
    }, [setSelectedNode]);

    const onDeleteNode = useCallback((nodeId) => {
        deleteNode(nodeId);
    }, [deleteNode]);

    const onPainelClick = useCallback(() => {
        setSelectedNode(null);
    }, [setSelectedNode]);

    const onLayout = useCallback((direction) => {
        // 1. Primeiro atualiza a direção
        setDirection(direction);

        // 2. Depois calcula e aplica o novo layout
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            nodes,
            edges,
            direction
        );

        applyLayout(layoutedNodes, layoutedEdges);
    }, [nodes, edges, setDirection, applyLayout]);


    const changeEdge = useCallback(() => {

        const currentIndex = SUPPORTED_EDGE_TYPES.indexOf(edgeType);
        const nextIndex = (currentIndex + 1) % SUPPORTED_EDGE_TYPES.length;
        const newType = SUPPORTED_EDGE_TYPES[nextIndex];

        setEdgeType(newType);
        setEdges(edges.map(edge => ({
            ...edge,
            type: newType,
            markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 30,
                height: 30,
            },
        })));
    }, [edgeType, edges, setEdges, setEdgeType]);

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
            >
                <DevTools />
                <Background />
                <Controls />
                <MiniMap zoomable pannable />
                <Panel position="top-right">
                    <div style={{ display: 'flex', gap: '1em' }}>
                        <button className="btn" onClick={() => changeEdge()}>
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