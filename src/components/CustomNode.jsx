import { Handle } from "@xyflow/react";
import { useCallback, useState, useRef, useEffect } from "react";

export default function CustomNode({ id, data, selected, targetPosition, sourcePosition }) {
    const [label, setLabel] = useState(data.label || 'Novo Nó');

    // Atualiza o label quando os dados externos mudam
    useEffect(() => {
        if (data.label && data.label !== label) {
            setLabel(data.label);
        }
    }, [data.label]);


    return (
        <div className={`custom-node ${selected ? 'selected' : ''}`}                    >
            <div className="node-content">
                <div
                    className="node-label"
                    title="Clique para editar"
                >
                    {label}
                </div>
                <div className='drag-handle__label'>
                    <span className="drag-handle__custom" >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 10H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M6 14H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </span>
                </div>
            </div>

            <Handle type="target" position={targetPosition || 'left'} className="node-handle" />
            <Handle type="source" position={sourcePosition || 'right'} className="node-handle" />
        </div>
    );
}