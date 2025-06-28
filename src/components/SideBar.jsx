import { useReactFlow } from "@xyflow/react";
import { useCallback, useContext } from "react";
import { createNewNode } from "../utils/nodeUtils";
import { FlowContext } from "../contexts/flow-context";


export default function SideBar() {


    const reactFlowInstance = useReactFlow();
    const context = useContext(FlowContext);
    const { direction, setTypeComponent } = context;

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
    }, [reactFlowInstance, direction]);

    const handleEnviar = () => {
        console.log(context);
    }

    const nodeTypes = ['input', 'textUpdater', 'customNode', 'default', 'output'];

    return (

        <div className="sidebar">
            <div className="sidebar-header">
                <h3>Flow Controls</h3>
            </div>
            <div className="sidebar-content">
                {nodeTypes.map((type) => (
                    <button
                        key={type}
                        className="btn"
                        onClick={() => onClick(type)}
                        onDragStart={(e) => onDragStart(e, type)}
                        onDragEnd={onDragEnd}
                        draggable
                    >
                        {type.charAt(0).toUpperCase() + type.slice(1)} Node
                    </button>
                ))}
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