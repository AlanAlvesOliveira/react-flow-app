export const dataFlow = {
    flowName: "flowName",
    direction: "LR",
    selectedNode: undefined,
    typeComponent: null,
    edgeType: 'smoothstep',
    nodes: [
        {
            "id": "0.6913249882677255",
            "position": {
                "x": 372,
                "y": 86
            },
            "type": "CustomNode",
            "data": {
                "label": "Custom Node"
            },
            "dragHandle": ".drag-handle__custom",
            "measured": {
                "width": 199,
                "height": 53
            },
            "selected": false,
            "dragging": false,
            "targetPosition": "left",
            "sourcePosition": "right"
        },
        {
            "id": "0.44249911544610276",
            "position": {
                "x": 372,
                "y": 301
            },
            "type": "CustomNode",
            "data": {
                "label": "Custom Node"
            },
            "dragHandle": ".drag-handle__custom",
            "measured": {
                "width": 199,
                "height": 53
            },
            "selected": false,
            "dragging": false,
            "targetPosition": "left",
            "sourcePosition": "right"
        },
        {
            "id": "0.3888778942262371",
            "position": {
                "x": 744,
                "y": 86
            },
            "type": "CustomNode",
            "data": {
                "label": "Custom Node"
            },
            "dragHandle": ".drag-handle__custom",
            "measured": {
                "width": 199,
                "height": 53
            },
            "selected": false,
            "dragging": false,
            "targetPosition": "left",
            "sourcePosition": "right"
        },
        {
            "id": "0.7332383413146958",
            "position": {
                "x": -14.322624058656231,
                "y": 191.1289599022396
            },
            "type": "StartNode",
            "data": {
                "label": "Start node"
            },
            "dragHandle": ".drag-handle__custom",
            "measured": {
                "width": 199,
                "height": 53
            },
            "selected": false,
            "dragging": false,
            "targetPosition": "left",
            "sourcePosition": "right"
        },
        {
            "id": "0.27840725653522036",
            "position": {
                "x": 744,
                "y": 0
            },
            "type": "CustomNode",
            "data": {
                "label": "Custom Node"
            },
            "dragHandle": ".drag-handle__custom",
            "measured": {
                "width": 199,
                "height": 53
            },
            "selected": false,
            "dragging": false,
            "targetPosition": "left",
            "sourcePosition": "right"
        },
        {
            "id": "0.36575859068552274",
            "position": {
                "x": 744,
                "y": 344
            },
            "type": "CustomNode",
            "data": {
                "label": "Custom Node"
            },
            "dragHandle": ".drag-handle__custom",
            "measured": {
                "width": 199,
                "height": 53
            },
            "selected": false,
            "dragging": false,
            "targetPosition": "left",
            "sourcePosition": "right"
        },
        {
            "id": "0.7273818102118234",
            "position": {
                "x": 744,
                "y": 258
            },
            "type": "CustomNode",
            "data": {
                "label": "Custom Node"
            },
            "dragHandle": ".drag-handle__custom",
            "measured": {
                "width": 199,
                "height": 53
            },
            "selected": false,
            "dragging": false,
            "targetPosition": "left",
            "sourcePosition": "right"
        },
        {
            "id": "0.4523590377899547",
            "position": {
                "x": 744,
                "y": 172
            },
            "type": "CustomNode",
            "data": {
                "label": "Custom Node"
            },
            "dragHandle": ".drag-handle__custom",
            "measured": {
                "width": 199,
                "height": 53
            },
            "selected": false,
            "dragging": false,
            "targetPosition": "left",
            "sourcePosition": "right"
        },
        {
            "id": "0.36118158845957415",
            "position": {
                "x": 1345.1619849385,
                "y": 172.9548416039104
            },
            "type": "EndNode",
            "data": {
                "label": "End node"
            },
            "dragHandle": ".drag-handle__custom",
            "measured": {
                "width": 199,
                "height": 53
            },
            "targetPosition": "left",
            "sourcePosition": "right",
            "selected": false,
            "dragging": false
        }
    ],
    edges: [
        {
            "animated": true,
            "source": "0.7332383413146958",
            "target": "0.6913249882677255",
            "id": "xy-edge__0.7332383413146958-0.6913249882677255",
            "type": "smoothstep",
            "markerEnd": {
                "type": "arrowclosed",
                "width": 30,
                "height": 30
            },
            "label": "exit 1"
        },
        {
            "animated": true,
            "source": "0.7332383413146958",
            "target": "0.44249911544610276",
            "id": "xy-edge__0.7332383413146958-0.44249911544610276",
            "type": "smoothstep",
            "markerEnd": {
                "type": "arrowclosed",
                "width": 30,
                "height": 30
            },
            "label": ""
        },
        {
            "animated": true,
            "source": "0.6913249882677255",
            "target": "0.27840725653522036",
            "id": "xy-edge__0.6913249882677255-0.27840725653522036",
            "type": "smoothstep",
            "markerEnd": {
                "type": "arrowclosed",
                "width": 30,
                "height": 30
            },
            "label": "exit 2"
        },
        {
            "animated": true,
            "source": "0.6913249882677255",
            "target": "0.3888778942262371",
            "id": "xy-edge__0.6913249882677255-0.3888778942262371",
            "type": "smoothstep",
            "markerEnd": {
                "type": "arrowclosed",
                "width": 30,
                "height": 30
            },
            "label": "exit 3"
        },
        {
            "animated": true,
            "source": "0.44249911544610276",
            "target": "0.7273818102118234",
            "id": "xy-edge__0.44249911544610276-0.7273818102118234",
            "type": "smoothstep",
            "markerEnd": {
                "type": "arrowclosed",
                "width": 30,
                "height": 30
            },
            "label": ""
        },
        {
            "animated": true,
            "source": "0.44249911544610276",
            "target": "0.36575859068552274",
            "id": "xy-edge__0.44249911544610276-0.36575859068552274",
            "type": "smoothstep",
            "markerEnd": {
                "type": "arrowclosed",
                "width": 30,
                "height": 30
            },
            "label": ""
        },
        {
            "animated": true,
            "source": "0.6913249882677255",
            "target": "0.4523590377899547",
            "id": "xy-edge__0.6913249882677255-0.4523590377899547",
            "type": "smoothstep",
            "markerEnd": {
                "type": "arrowclosed",
                "width": 30,
                "height": 30
            },
            "label": "exit 4"
        },
        {
            "animated": true,
            "source": "0.27840725653522036",
            "target": "0.36118158845957415",
            "type": "smoothstep",
            "markerEnd": {
                "type": "arrowclosed",
                "width": 30,
                "height": 30
            },
            "id": "xy-edge__0.27840725653522036-0.36118158845957415",
            "label": ""
        },
        {
            "animated": true,
            "source": "0.3888778942262371",
            "target": "0.36118158845957415",
            "type": "smoothstep",
            "markerEnd": {
                "type": "arrowclosed",
                "width": 30,
                "height": 30
            },
            "id": "xy-edge__0.3888778942262371-0.36118158845957415",
            "label": ""
        },
        {
            "animated": true,
            "source": "0.4523590377899547",
            "target": "0.36118158845957415",
            "type": "smoothstep",
            "markerEnd": {
                "type": "arrowclosed",
                "width": 30,
                "height": 30
            },
            "id": "xy-edge__0.4523590377899547-0.36118158845957415",
            "label": ""
        },
        {
            "animated": true,
            "source": "0.7273818102118234",
            "target": "0.36118158845957415",
            "type": "smoothstep",
            "markerEnd": {
                "type": "arrowclosed",
                "width": 30,
                "height": 30
            },
            "id": "xy-edge__0.7273818102118234-0.36118158845957415",
            "label": ""
        },
        {
            "animated": true,
            "source": "0.36575859068552274",
            "target": "0.36118158845957415",
            "type": "smoothstep",
            "markerEnd": {
                "type": "arrowclosed",
                "width": 30,
                "height": 30
            },
            "id": "xy-edge__0.36575859068552274-0.36118158845957415",
            "label": ""
        }
    ]

}


