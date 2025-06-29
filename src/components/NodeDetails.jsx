import { useCallback, useContext, useEffect, useState } from 'react';
import { FlowContext } from '../contexts/flow-context';

export default function NodeDetails() {
    const { selectedNode, edges, updateNode, deleteNode, setEdges } = useContext(FlowContext);
    const [nodeData, setNodeData] = useState(selectedNode?.data || {});
    const [edgeLabels, setEdgeLabels] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [prevNode, setPrevNode] = useState(null);
    const [startComponent, setStartComponent] = useState(false);

    // Filtra edges conectadas
    const edgesSelectedSource = edges.filter(x => x.source === selectedNode?.id);
    const edgesSelectedTarget = edges.filter(x => x.target === selectedNode?.id);

    // Inicializa os labels das edges
    useEffect(() => {
        if (selectedNode) {
            if (!startComponent) setStartComponent(true);

            if (prevNode && prevNode.id !== selectedNode.id) {
                // Nó mudou - animação de troca
                setIsVisible(false);
                setTimeout(() => {
                    setPrevNode(selectedNode);
                    initializeNodeData();
                    setIsVisible(true);
                }, 200); // Tempo da animação de saída
            } else {
                // Primeira renderização ou mesmo nó
                setPrevNode(selectedNode);
                initializeNodeData();
                setIsVisible(true);
            }
        } else {
            // Nó deselecionado
            setIsVisible(false);
        }
    }, [selectedNode]);

    const initializeNodeData = () => {
        setNodeData(selectedNode.data || {});
        const initialEdgeLabels = {};
        edges.forEach(edge => {
            initialEdgeLabels[edge.id] = edge?.label || '';
        });
        setEdgeLabels(initialEdgeLabels);
    };

    const handleNodeChange = useCallback((e) => {
        const { name, value } = e.target;
        setNodeData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleEdgeLabelChange = useCallback((edgeId, value) => {
        setEdgeLabels(prev => ({
            ...prev,
            [edgeId]: value
        }));
    }, []);

    const handleSave = useCallback(() => {
        if (selectedNode) {
            // Atualiza o nó
            updateNode({
                ...selectedNode,
                data: nodeData
            });

            // Atualiza as edges com os novos labels
            const updatedEdges = edges.map(edge => ({
                ...edge,
                label: edgeLabels[edge.id] || ''
            }));

            setEdges(updatedEdges);
        }
    }, [selectedNode, nodeData, edges, edgeLabels, updateNode, setEdges]);

    //o problema é essa linha, quando descomento a animação de saída é desligada
    if (!startComponent) return null;

    return (


        <div className={`node-details ${isVisible ? 'slide-in' : 'slide-out'}`}>
            < h3 > Editar Nó: {selectedNode?.id}</h3 >

            <div className="form-group">
                <label>Label do Nó:</label>
                <input
                    type="text"
                    name="label"
                    value={nodeData.label || ''}
                    onChange={handleNodeChange}
                />
            </div>

            {montaInputEdge(edgesSelectedTarget, "Edges Source", edgeLabels, handleEdgeLabelChange)}
            {montaInputEdge(edgesSelectedSource, "Edges Target", edgeLabels, handleEdgeLabelChange)}

            <div style={{ display: 'flex', gap: '1em', justifyContent: 'center', marginTop: '16px' }}>
                <button
                    onClick={() => deleteNode(selectedNode.id)}
                    className="save-btn delete-btn"
                >
                    Deletar
                </button>
                <button
                    onClick={handleSave}
                    className="save-btn"
                >
                    Salvar
                </button>
            </div>
        </div >
    );
}

function montaInputEdge(edgesList, label, edgeLabels, handleEdgeLabelChange) {
    if (edgesList.length === 0) return null; // Retorna nada se não houver edges

    return (
        <div className="form-group node-details-edge-input">
            <label>{label}</label>
            {edgesList.map((edge) => (
                <div key={edge.id}>
                    <label className='details-label-id'>{edge.target}:</label>
                    <input
                        type="text"
                        value={edgeLabels[edge.id] || ''}
                        onChange={(e) => handleEdgeLabelChange(edge.id, e.target.value)}
                        placeholder="Label da edge"
                    />
                </div>
            ))}
        </div>
    );
}