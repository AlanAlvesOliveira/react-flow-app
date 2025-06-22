import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TextUpdaterNode from './components/TextUpdaterNode';
import { defaultNodes } from './nodes/defaultNodes'
import { defaultEdges } from './nodes/defaultEdges'
import SideBar from './components/SideBar';
import DevTools from './components/Devtools';


const nodeTypes = {
  textUpdater: TextUpdaterNode
};



function Flow() {
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  // const onNodesDelete = useCallback(
  //   (deleted) => {
  //     setEdges(
  //       deleted.reduce((acc, node) => {
  //         const incomers = getIncomers(node, nodes, edges);
  //         const outgoers = getOutgoers(node, nodes, edges);
  //         const connectedEdges = getConnectedEdges([node], edges);

  //         const remainingEdges = acc.filter(
  //           (edge) => !connectedEdges.includes(edge),
  //         );

  //         const createdEdges = incomers.flatMap(({ id: source }) =>
  //           outgoers.map(({ id: target }) => ({
  //             id: `${source}->${target}`,
  //             source,
  //             target,
  //           })),
  //         );

  //         return [...remainingEdges, ...createdEdges];
  //       }, edges),
  //     );
  //   },
  //   [nodes, edges],
  // );



  const edgeOptions = {
    animated: true,
  };

  return (
    <div id='app'>

      <SideBar />
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        fitView
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={edgeOptions}


      >
        <DevTools />
        <Background />
        <Controls />
      </ReactFlow>


    </div>
  );
}

export default Flow;