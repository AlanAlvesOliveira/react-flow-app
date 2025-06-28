import { createContext, useMemo, useReducer } from "react";
import { dataFlow } from "../data/mockDataFlow";

export const FlowContext = createContext({
    //flow
    nodes: [],
    edges: [],
    selectedNode: undefined,
    //view
    direction: 'LR',
    edgeType: 'default',
    //dnd
    typeComponent: null,


    //actions=>flow
    setNodes: (nodes) => { },
    setEdges: (edges) => { },
    setSelectedNode: (node) => { },
    updateNode: (node) => { },
    deleteNode: (nodeId) => { },
    applyLayout: (nodes, edges, direction) => { },
    //actions=>view
    setDirection: (direction) => { },
    setEdgeType: (edgeType) => { },
    //actions=>dnd
    setTypeComponent: (type) => { },
});


const initialState = dataFlow

// const initialState = {
//     flowName: 'flowName',
//     direction: 'LR',
//     edgeType: 'default',
//     selectedNode: undefined,
//     typeComponent: null,
//     nodes: [],
//     edges: []
// };

export default function FlowContextProvider({ children }) {

    const [state, dispatch] = useReducer(flowReducer, initialState);

    const actions = useMemo(() => ({
        setNodes: (nodes) => dispatch({ type: ActionTypes.SET_NODES, payload: nodes }),
        setEdges: (edges) => dispatch({ type: ActionTypes.SET_EDGES, payload: edges }),
        setSelectedNode: (node) => dispatch({ type: ActionTypes.SET_SELECTED_NODE, payload: node }),
        setEdgeType: (edgeType) => dispatch({ type: ActionTypes.SET_EDGE_TYPE, payload: edgeType }),
        updateNode: (node) => dispatch({ type: ActionTypes.UPDATE_NODE, payload: node }),
        deleteNode: (nodeId) => dispatch({ type: ActionTypes.DELETE_NODE, payload: nodeId }),
        applyLayout: (nodes, edges, direction) => dispatch({ type: ActionTypes.LAYOUT_CHANGE, payload: { nodes, edges, direction } }),
        setTypeComponent: (type) => dispatch({ type: ActionTypes.SET_TYPE_COMPONENT, payload: type }),
        setDirection: (direction) => dispatch({ type: ActionTypes.SET_DIRECTION, payload: direction }),
    }), []);

    const value = useMemo(() => ({

        nodes: state.nodes,
        edges: state.edges,
        edgeType: state.edgeType,
        selectedNode: state.selectedNode,
        direction: state.direction,
        typeComponent: state.typeComponent,

        ...actions
    }), [
        state.nodes,
        state.edges,
        state.edgeType,
        state.selectedNode,
        state.direction,
        state.typeComponent
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
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

