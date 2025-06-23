import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import { useDnD } from "./DnDContext";

export default function SideBar() {
    const reactFlowInstance = useReactFlow();


    const [_, setType] = useDnD();

    const onDragStart = (event, nodeType) => {
        console.log(nodeType)
        setType(nodeType);
        event.dataTransfer.setData('text/plain', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onClick = useCallback((type) => {

        const id = `${Math.random()}`;
        const newNode = {
            id,
            position: {
                x: Math.random() * 100,
                y: Math.random() * 100,
            },
            type: type,
            data: {
                label: `${type} node`
            },
        };
        reactFlowInstance.addNodes(newNode);
    }, [reactFlowInstance]);



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
                    onClick={() => onClick('default')}
                    onDragStart={(e) => onDragStart(e, 'default')}
                    draggable
                >
                    Default Node
                </button>

                <button
                    className="btn"
                    onClick={() => onClick('default')}
                    onDragStart={(e) => onDragStart(e, 'output')}
                    draggable
                >
                    Output Node
                </button>
            </div>
            <div className="sidebar-footer">
                <small>v1.0.0</small>
            </div>

        </div>

    )
}