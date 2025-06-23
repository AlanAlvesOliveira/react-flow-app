import { useCallback, useEffect, useState } from 'react';

export default function NodeDetails({ selectedNode, onUpdateNode, onDeleteNode }) {
    const [nodeData, setNodeData] = useState(selectedNode?.data || {});

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setNodeData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    useEffect(() => {
        setNodeData(selectedNode?.data || {});
    }, [selectedNode]);

    const handleSave = useCallback(() => {
        if (selectedNode) {
            onUpdateNode({
                ...selectedNode,
                data: nodeData
            });
        }
    }, [selectedNode, nodeData, onUpdateNode]);


    return (
        <div key={selectedNode.id} className="node-details">
            <h3>Editar Nó: {selectedNode.id}</h3>

            <div className="form-group">
                <label>Label:</label>
                <input
                    type="text"
                    name="label"
                    value={nodeData.label || ''}
                    onChange={handleChange}
                />
            </div>

            <div style={{ display: 'flex', gap: '1em', justifyContent: 'center' }}>
                <button onClick={() => onDeleteNode(selectedNode.id)} className="save-btn">
                    Deletar
                </button>

                <button onClick={handleSave} className="save-btn">
                    Salvar
                </button>
            </div>

        </div>


    );
}