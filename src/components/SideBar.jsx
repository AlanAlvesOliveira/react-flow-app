import { useReactFlow } from "@xyflow/react";
import { useCallback, useContext } from "react";
import { createNewNode } from "../utils/nodeUtils";
import { FlowContext } from "../contexts/flow-context";


export default function SideBar() {


    const reactFlowInstance = useReactFlow();
    const { direction, setTypeComponent } = useContext(FlowContext);

    const onDragStart = (event, nodeType) => {

        setTypeComponent(nodeType);

        event.dataTransfer.setData('text/plain', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDragEnd = () => {
        setTypeComponent(null); // Resetar ao soltar
    };

    const onClick = useCallback((type) => {

        const newNode = createNewNode(type, null, direction);
        reactFlowInstance.addNodes(newNode);
    }, [reactFlowInstance]);

    const handleEnviar = () => {
        console.log(reactFlowInstance.getNodes());
        console.log(reactFlowInstance.getEdges());
    }


    return (

        <div className="sidebar">
            <div className="sidebar-header">
                <h3>Flow Controls</h3>
            </div>
            <div className="sidebar-content">


                <button
                    className="btn"
                    onClick={() => onClick('input')}
                    onDragStart={(e) => onDragStart(e, 'input')}
                    draggable
                >
                    Input Node
                </button>
                <button
                    className="btn"
                    onClick={() => onClick('textUpdater')}
                    onDragStart={(e) => onDragStart(e, 'textUpdater')}
                    draggable
                >
                    Text Node
                </button>

                <button
                    className="btn"
                    onClick={() => onClick('customNode')}
                    onDragStart={(e) => onDragStart(e, 'customNode')}
                    draggable
                >
                    Custom Node
                </button>
                <button
                    className="btn"
                    onClick={() => onClick('default')}
                    onDragStart={(e) => onDragStart(e, 'default')}
                    draggable
                >
                    Default Node
                </button>

                <button
                    className="btn"
                    onClick={() => onClick('output')}
                    onDragStart={(e) => onDragStart(e, 'output')}
                    draggable
                >
                    Output Node
                </button>
            </div>
            <div className="sidebar-footer">
                <button
                    className="btn"
                    onClick={() => handleEnviar()}
                >
                    Enviar dados
                </button>
                <small>v1.0.0</small>
            </div>

        </div>

    )
}