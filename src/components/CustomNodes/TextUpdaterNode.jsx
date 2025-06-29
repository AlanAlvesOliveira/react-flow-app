import { Handle } from "@xyflow/react";
import { useCallback, useState, useRef, useEffect } from "react";

export default function TextUpdaterNode({ data }) {
    const [label, setLabel] = useState(data.label || 'Label');
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);

    const onChange = useCallback((evt) => {
        setLabel(evt.target.value || 'Label');
    }, []);

    const handleEdit = useCallback(() => {
        setEditing(prev => !prev);
    }, []);

    const handleKeyDown = useCallback((evt) => {
        if (evt.key === 'Enter') {
            handleEdit();
        }
    }, [handleEdit]);

    const handleNodeClick = useCallback((e) => {
        // Impede a propagação para evitar conflitos com drag
        e.stopPropagation();
        handleEdit();
    }, [handleEdit]);

    // Auto-focus quando entrar no modo de edição
    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editing]);

    return (
        <div className="text-updater-node" style={{ minWidth: '10em', textAlign: 'center' }}>
            <div>
                {!editing ? (
                    <label onClick={handleEdit} htmlFor="text" style={{ cursor: 'pointer' }}>
                        {label}
                    </label>
                ) : (
                    <input
                        ref={inputRef}
                        id="text"
                        name="text"
                        value={label}
                        onChange={onChange}
                        onBlur={handleEdit}
                        onKeyDown={handleKeyDown}
                        className="nodrag"
                        onClick={(e) => handleNodeClick(e)}
                    />
                )}
                <Handle type="target" position="top" />
                <Handle type="source" position="bottom" />
            </div>
        </div>
    );
}