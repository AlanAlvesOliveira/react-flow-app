export const defaultNodes = [
    {
        id: '1',
        data: { label: 'Start' },
        position: { x: 0, y: 0 },
        type: 'input',
    },
    {
        id: '2',
        data: { label: 'textUpdater' },
        position: { x: 100, y: 100 },
        type: 'textUpdater'

    },
    {
        id: '3',
        data: { label: 'CustomNode' },
        position: { x: -100, y: 100 },
        dragHandle: '.drag-handle__custom',
        type: 'customNode'

    },



];