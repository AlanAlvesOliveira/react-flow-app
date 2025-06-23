export const createNewNode = (type, position) => {
    const id = `${Math.random()}`;

    // Objeto base do nó
    const baseNode = {
        id,
        position: position || {
            x: Math.random() * 100,
            y: Math.random() * 100
        },
        type,
        data: {
            label: `${type} node`
        },
        meta: {
            createdAt: new Date().toISOString(),
            createdBy: 'user'
        }
    };

    // Adiciona dragHandle apenas para customNode
    if (type === 'customNode') {
        return {
            ...baseNode,
            dragHandle: '.drag-handle__custom'
        };
    }

    return baseNode;
};

export const addNodeToFlow = (type, reactFlowInstance, position = null) => {
    const newNode = createNewNode(type, position, reactFlowInstance);
    reactFlowInstance.addNodes(newNode);
    return newNode; // Retorna o nó criado caso precise usá-lo
};