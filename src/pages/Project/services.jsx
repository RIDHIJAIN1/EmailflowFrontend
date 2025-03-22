import { NodeWrapper } from "../../components/project/NodeWrapper";
const listNodeStyle = {
    border: '2px solid #FF5733',
    borderRadius: '5px',
    padding: '10px',
    background: 'white',
};
function ListElement({ selectedList, new_id }) {
    return (
        <><p className="have-id" data-id={new_id} style={{ color: "#FF5733" }}>Lead Source</p><p>{selectedList}</p></>
    )
}

const mailNodeStyle = {
    border: '2px solid #40E0D0',
    borderRadius: '5px',
    padding: '10px',
    background: 'white',
};
function TemplateElement({ selectedList, new_id }) {
    return (
        <><p className="have-id" data-id={new_id} style={{ color: "#40E0D0" }}>Mail Template</p><p>{selectedList}</p></>
    )
}

const waitNodeStyle = {
    border: '2px solid #DAA520',
    borderRadius: '5px',
    padding: '10px',
    background: 'white',
};
function WaitElement({ waitFor, waitType, new_id }) {
    return (
        <><p className="have-id" data-id={new_id} style={{ color: "#DAA520" }}>Wait</p><p>{waitFor} {waitType}</p></>
    )
}
// This function handles adding a new node horizontally from Node 1
export const createNewListNode = (node, nodes, setNodes, edges, setEdges, addEdge, selectedName, selectedId, onEdit, onDelete) => {
    let new_id = nodes.length + 1;
    const newNode = {
        id: `${new_id}`, // Unique ID
        position: { x: node.position.x, y: node.position.y }, // Same position as Node 1
        data: { label: (<NodeWrapper onEdit={onEdit} onDelete={onDelete}><ListElement selectedList={selectedName} new_id={new_id} /></NodeWrapper>), type: "list", id: selectedId },
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
export const createNewEmailNode = (node, nodes, setNodes, edges, setEdges, selectedName, selectedId, type = 'email', onEdit, onDelete) => {
    let newNode = {};
    let new_id = nodes.length + 1;
    if (type == 'wait') {
        newNode = {
            id: `${new_id}`, // Unique ID
            position: { x: node.position.x, y: node.position.y }, // Same position as Node 3
            data: { label: (<NodeWrapper onEdit={onEdit} onDelete={onDelete}><WaitElement waitFor={selectedName.waitFor} waitType={selectedName.waitType} new_id={new_id} /></NodeWrapper>), type: "wait", waitFor: selectedName.waitFor, waitType: selectedName.waitType },
            style: waitNodeStyle
        };
    } else {
        newNode = {
            id: `${new_id}`, // Unique ID
            position: { x: node.position.x, y: node.position.y }, // Same position as Node 3
            data: { label: (<NodeWrapper onEdit={onEdit} onDelete={onDelete}><TemplateElement selectedList={selectedName} new_id={new_id} /></NodeWrapper>), type: "mail", id: selectedId },
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



