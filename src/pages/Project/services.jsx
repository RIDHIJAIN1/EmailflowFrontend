const listNodeStyle = {
    border: '2px solid #FF5733',
    borderRadius: '5px',
    padding: '10px',
    background: 'white',
};
function ListElement({ selectedList }) {
    return (
        <><p style={{ color: "#FF5733" }}>Lead Source</p><p>{selectedList}</p></>
    )
}

const mailNodeStyle = {
    border: '2px solid #40E0D0',
    borderRadius: '5px',
    padding: '10px',
    background: 'white',
};
function TemplateElement({ selectedList }) {
    return (
        <><p style={{ color: "#40E0D0" }}>Mail Template</p><p>{selectedList}</p></>
    )
}

const waitNodeStyle = {
    border: '2px solid #DAA520',
    borderRadius: '5px',
    padding: '10px',
    background: 'white',
};
function WaitElement({ waitFor, waitType }) {
    return (
        <><p style={{ color: "#DAA520" }}>Wait</p><p>{waitFor} {waitType}</p></>
    )
}

// This function handles adding a new node horizontally from Node 1
export const createNewListNode = (node, nodes, setNodes, edges, setEdges, addEdge, selectedName, selectedId) => {
    const newNode = {
        id: `${nodes.length + 1}`, // Unique ID
        position: { x: node.position.x, y: node.position.y }, // Same position as Node 1
        data: { label: (<ListElement selectedList={selectedName} />), type: "list", id: selectedId},
        style: listNodeStyle
    };

    // Shift Node 1 to the right
    const updatedNodes = nodes.map((n) =>
        n.id === '1' ? { ...n, position: { x: n.position.x + 200, y: n.position.y } } : n
    );

    // Add a new edge connecting Node 2 to the new node
    const newEdge = {
        id: `e${newNode.id}-2`, // Unique ID for the edge
        source: newNode.id, // Source (new node)
        target: '2', // Target (Node 2)
    };

    setEdges((eds) => addEdge(newEdge, eds)); // Add edge to state
    setNodes([...updatedNodes, newNode]); // Add new node to state
};
// This function handles adding a new node vertically from Node 3
export const createNewEmailNode = (node, nodes, setNodes, edges, setEdges, selectedName, selectedId, type='email') => {
    let newNode = {};
    if(type=='wait'){
        newNode = {
            id: `${nodes.length + 1}`, // Unique ID
            position: { x: node.position.x, y: node.position.y }, // Same position as Node 3
            data: { label: (<WaitElement waitFor={selectedName.waitFor} waitType={selectedName.waitType} />), type: "wait", waitFor:selectedName.waitFor, waitType:selectedName.waitType },
            style: waitNodeStyle
        };
    } else{
        newNode = {
            id: `${nodes.length + 1}`, // Unique ID
            position: { x: node.position.x, y: node.position.y }, // Same position as Node 3
            data: { label: (<TemplateElement selectedList={selectedName} />), type: "mail", id: selectedId },
            style: mailNodeStyle
        };
    }

    // Shift Node 3 downward
    const updatedNodes = nodes.map((n) =>
        n.id === '3' ? { ...n, position: { x: n.position.x, y: n.position.y + 100 } } : n
    );

    // Remove any edge connected to Node 3
    const updatedEdges = edges.filter((edge) => edge.target !== '3');
    setEdges(updatedEdges);

    // Create a new edge from the source of the removed edge to the new node
    const sourceNode = edges.find((edge) => edge.target === '3')?.source || '2'; // Default to Node 2 if no edge exists
    const newEdge1 = {
        id: `e${sourceNode}-${newNode.id}`, // Unique ID for the edge
        source: sourceNode, // Source
        target: `${newNode.id}`, // New node
    };

    const newEdge2 = {
        id: `e${newNode.id}-3`, // Edge from new node to Node 3
        source: newNode.id,
        target: '3',
    };

    setEdges((eds) => [...eds, newEdge1, newEdge2]); // Add new edges
    setNodes([...updatedNodes, newNode]); // Add new node to state
};



