import { act, captureOwnerStack, createContext, useMemo, useReducer } from "react";
import { dataFlow } from "../nodes/dataFlow";

export const FlowContext = createContext({
    // Estado inicial
    nodes: [],
    edges: [],
    selectedNode: undefined,
    direction: 'LR',
    edgeType: 'default',
    typeComponent: null,


    // Ações
    setNodes: (nodes) => { },
    setEdges: (edges) => { },
    setSelectedNode: (node) => { },
    setEdgeType: (edgeType) => { },
    updateNode: (node) => { },
    deleteNode: (nodeId) => { },
    applyLayout: (nodes, edges, direction) => { },
    setTypeComponent: (type) => { },
    setDirection: (direction) => { }
});

const initialState = dataFlow;

export default function FlowContextProvider({ children }) {

    const [state, dispatch] = useReducer(flowReducer, initialState);

    const setNodes = (nodes) => dispatch({ type: ActionTypes.SET_NODES, payload: nodes });
    const setEdges = (edges) => dispatch({ type: ActionTypes.SET_EDGES, payload: edges });
    const setSelectedNode = (node) => dispatch({ type: ActionTypes.SET_SELECTED_NODE, payload: node });
    const setEdgeType = (edgeType) => dispatch({ type: ActionTypes.SET_EDGE_TYPE, payload: edgeType });
    const updateNode = (node) => dispatch({ type: ActionTypes.UPDATE_NODE, payload: node });
    const deleteNode = (nodeId) => dispatch({ type: ActionTypes.DELETE_NODE, payload: nodeId });
    const applyLayout = (nodes, edges, direction) => dispatch({ type: ActionTypes.LAYOUT_CHANGE, payload: { nodes, edges, direction } });
    const setTypeComponent = (type) => dispatch({ type: ActionTypes.SET_TYPE_COMPONENT, payload: type });
    const setDirection = (direction) => dispatch({ type: ActionTypes.SET_DIRECTION, payload: direction });

    const value = useMemo(() => ({

        nodes: state.nodes,
        edges: state.edges,
        edgeType: state.edges?.length > 0 ? state.edges[0].type : 'default',
        selectedNode: state.selectedNode,
        direction: state.direction,
        typeComponent: state.typeComponent,

        setNodes,
        setEdges,
        setSelectedNode,
        setEdgeType,
        updateNode,
        deleteNode,
        applyLayout,
        setTypeComponent,
        setDirection
    }), [
        state.nodes,
        state.edges,
        state.edgeType,
        state.selectedNode,
        state.direction,
        state.typeComponent,

        setNodes,
        setEdges,
        setSelectedNode,
        setEdgeType,
        updateNode,
        deleteNode,
        applyLayout,
        setTypeComponent,
        setDirection
    ]);



    return (
        <FlowContext.Provider value={value}>
            {children}
        </FlowContext.Provider>
    );
}


const ActionTypes = {
    SET_NODES: 'SET_NODES',
    SET_EDGES: 'SET_EDGES',
    SET_SELECTED_NODE: 'SET_SELECTED_NODE',
    SET_EDGE_TYPE: 'SET_EDGE_TYPE',
    UPDATE_NODE: 'UPDATE_NODE',
    DELETE_NODE: 'DELETE_NODE',
    LAYOUT_CHANGE: 'LAYOUT_CHANGE',
    SET_TYPE_COMPONENT: 'SET_TYPE_COMPONENT',
    SET_DIRECTION: 'SET_DIRECTION'
};

function flowReducer(state, action) {
    switch (action.type) {
        case ActionTypes.SET_NODES:
            return { ...state, nodes: action.payload };
        case ActionTypes.SET_EDGES:
            return { ...state, edges: action.payload };
        case ActionTypes.SET_SELECTED_NODE:
            return { ...state, selectedNode: action.payload };
        case ActionTypes.SET_EDGE_TYPE:
            return { ...state, edgeType: action.payload };
        case ActionTypes.UPDATE_NODE:
            return {
                ...state,
                nodes: state.nodes.map(node =>
                    node.id === action.payload.id ? action.payload : node
                ),
                selectedNode: action.payload,
            };
        case ActionTypes.DELETE_NODE:
            return {
                ...state,
                nodes: state.nodes.filter(node => node.id !== action.payload),
                edges: state.edges.filter(edge =>
                    edge.source !== action.payload && edge.target !== action.payload
                ),
                selectedNode: null,
            };
        case ActionTypes.LAYOUT_CHANGE:
            return {
                ...state,
                nodes: action.payload.nodes,
                edges: action.payload.edges
            };
        case ActionTypes.SET_DIRECTION:
            return {
                ...state,
                direction: action.payload
            };
        case ActionTypes.SET_TYPE_COMPONENT:
            return {
                ...state,
                typeComponent: action.payload
            }
        default:
            return state;
    }
}

