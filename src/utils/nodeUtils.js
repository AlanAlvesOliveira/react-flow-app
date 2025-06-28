

export const createNewNode = (type, position, direction) => {

    const isHorizontal = direction === 'LR';

    //LR => Horizontal
    //TB => Vertical

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
        targetPosition: isHorizontal ? 'left' : 'top',
        sourcePosition: isHorizontal ? 'right' : 'bottom',
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
