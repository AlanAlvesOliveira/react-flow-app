import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

export default function SideBar() {
    const reactFlowInstance = useReactFlow();
    const onClick = useCallback(() => {
        const id = `${Math.random()}`;
        const newNode = {
            id,
            position: {
                x: Math.random() * 100,
                y: Math.random() * 100,
            },
            type: 'textUpdater',
            data: {
                label: `Node ${id}`,
            },
        };
        reactFlowInstance.addNodes(newNode);
    }, []);
    return (

        <div className="sidebar">
            <div className="sidebar-header">
                <h3>Flow Controls</h3>
            </div>
            <div className="sidebar-content">
                <button onClick={onClick} className="btn-add">
                    add node
                </button>
            </div>
            <div className="sidebar-footer">
                <small>v1.0.0</small>
            </div>

        </div>

    )
}