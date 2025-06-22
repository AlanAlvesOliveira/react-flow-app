import { Handle } from "@xyflow/react";
import { useCallback, useState, useRef, useEffect } from "react";

export default function CustomNode(props) {
    const [label, setLabel] = useState('Label');
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

    // Auto-focus quando entrar no modo de edição
    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editing]);

    return (
        <div className="" style={{ minWidth: '10em', textAlign: 'center' }}>
            <div>
                {!editing && (
                    <label onClick={handleEdit} htmlFor="text" style={{ cursor: 'pointer' }}>
                        {label}
                    </label>
                )}
                <Handle type="target" position="top" />
                <Handle type="source" position="bottom" />
            </div>
        </div>
    );
}