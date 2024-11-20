import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomNode from "../../components/project/CustomNode";
import DropdownModal from "../../components/project/DropdownModal";
import SourceBlockModal from "../../components/project/SourceBlockModal";
import WaitModal from "../../components/project/WaitModal";
import { createNewEmailNode, createNewListNode } from "./services";
import { getProjectById, saveSequence, startProject } from "../../utils/api";
import { toast } from "react-toastify";
// import { useParams } from 'react-router-dom';

const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 10 },
    data: {
      label: (
        <>
          <p>+</p>
          <p>Add Lead Source</p>
        </>
      ),
    },
  },
  {
    id: "2",
    position: { x: 100, y: 100 },
    data: { label: "Sequence Start Point" },
  },
  {
    id: "3",
    position: { x: 100, y: 200 },
    data: {
      label: (
        <>
          <p>+</p>
        </>
      ),
    },
  },
];
const initialEdges = [{ id: "e2-3", source: "2", target: "3" }];

function Project() {
  const { id } = useParams();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownModalOpen, setDropdownModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [showWaitField, setShowWaitField] = useState(false);
  const [modalType, setModalType] = useState(1);
  const [isSaved , setIsSaved] = useState(false);
  // horizontal = 1   vertical = 3
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const handleNodeClick = useCallback(
    (event, node) => {
      let updatedModalContent = {};
      let cardData = [];
      if (node.id === "1") {
        updatedModalContent = {
          title: "Add a Source Block",
          description:
            "Pick a block & configure, any new leads that match rules will be added to sequence automatically.",
          icon: "📈",
          type: "Sources",
          heading: "Sources",
        };
        setShowWaitField(false);
        setModalType(1);
      } else if (node.id === "3") {
        updatedModalContent = {
          title: "Rule Configuration",
          description:
            "Define specific rules to segment leads and automate sequences.",
          icon: "⚙️",
          type: "Outreach",
          heading: "Outreach",
        };
        // setShowWaitField(nodes.filter((node) => node.data.type === "mail").length > 0 ? true : false);
        setModalType(3);
      }

      if (updatedModalContent.title) {
        setModalContent(updatedModalContent);
        setModalOpen(true);
        setDropdownModalOpen(false);
      }
    },
    [nodes, setModalOpen, setDropdownModalOpen, setModalContent]
  );

  const closeModal = () => {
    setModalOpen(false);
    setDropdownModalOpen(false);
  };

  const handleModalSelect = () => {
    setModalOpen(false); // Close SourceBlockModal
    setDropdownModalOpen(true); // Open DropdownModal after closing SourceBlockModal
  };

  const handleRemoveNode = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
  };

  const [waitModalOpen, setWaitModalOpen] = useState(false);

  const handleWaitInsert = (data) => {
    // Process and add the wait block data to the nodes or logic
    const node3 = nodes.find((node) => node.id === "3"); // Node 3 reference
    const type = "wait";
    createNewEmailNode(
      node3,
      nodes,
      setNodes,
      edges,
      setEdges,
      data,
      null,
      type
    );
    setWaitModalOpen(false);
    setModalOpen(false);
  };

  const handleWaitOpen = () => {
    setWaitModalOpen(true);
  };

  const handleDropdownSelect = (selectedName, selectedId) => {
    const node1 = nodes.find((node) => node.id === "1"); // Node 1 reference
    const node3 = nodes.find((node) => node.id === "3"); // Node 3 reference

    if (modalType === 1 && node1) {
      createNewListNode(
        node1,
        nodes,
        setNodes,
        edges,
        setEdges,
        addEdge,
        selectedName,
        selectedId
      );
    } else if (modalType === 3 && node3) {
      createNewEmailNode(
        node3,
        nodes,
        setNodes,
        edges,
        setEdges,
        selectedName,
        selectedId
      );
    }
  };

  const handleStart = async () => {
    if(!isSaved){
      toast.warning("Please save your project before starting")
      return;
    }
    try {    
      const response = await startProject(id);
      toast.success("Flow will begin in an hour")
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Error starting sequence")
    }
  };

  const handelSave = async () => {
    const lists = nodes.filter(
      (node) => !["1", "2", "3"].includes(node.id) && node.data?.type === "list"
    );

    const sequences = nodes.filter(
      (node) => !["1", "2", "3"].includes(node.id) && node.data?.type !== "list"
    );
    // Extract lists data
    const extractedLists = lists.map((list) => list.data.id);
    // Extract sequences data
    const extractedSequences = sequences.map((sequence) => {
      if (sequence.data.type === "mail") {
        return { id: sequence.data.id, type: sequence.data.type };
      } else if (sequence.data.type === "wait") {
        return {
          waitFor: sequence.data.waitFor,
          waitType: sequence.data.waitType,
          type: sequence.data.type,
        };
      }
    });

    const result = {
      lists: extractedLists,
      sequences: extractedSequences,
    };
    console.log(JSON.stringify(result, null, 2));

    try {
      const savedData = await saveSequence(id, { sequence: result });
      setIsSaved(true);
      toast.success("Flow Saved Successfully")
      console.log("Project uploaded successfully", savedData);
    } catch (error) {
      console.log("Error saving sequence", error);
      toast.error("Error")
    }
  };

  useEffect(() => {
    const fetchProject = async (id) => {
      try {
        const response = await getProjectById(id);
        setProjects(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject(id);

    const listNodes = nodes.filter(
      (node) => !["1", "2", "3"].includes(node.id) && node.data?.type !== "list"
    );
    const lastListNode = listNodes[listNodes.length - 1];
    if (lastListNode) {
      if (lastListNode.data.type == "mail") setShowWaitField(true);
      else setShowWaitField(false);
    } else setShowWaitField(false);
  }, [nodes]);

  return (
    <>
      <div className="m-auto justify-center mx-auto">
        <div className="flex justify-evenly items-center pt-6 pb-4">
          <h1 className="font-serif text-4xl font-semibold pt-10  text-blue-400">
            Design Your Email Marketing Sequence Flow
          </h1>
         
        </div>
        <div className="flex justify-center">
        <button
  type="button"
  className="px-6 py-2 mr-2 text-white bg-gradient-to-r from-blue-400 to-blue-500 shadow-md rounded-lg hover:from-blue-500 hover:to-blue-600 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
  onClick={handelSave}
>
  Save
</button>
<button
  type="button"
  className="px-6 py-2 text-white bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-md rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400"
  onClick={handleStart}
>
  Start
</button>

          </div>
        <div className="" style={{ width: "100vw", height: "200vh" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            nodeTypes={{
              custom: (nodeProps) => (
                <CustomNode
                  {...nodeProps}
                  onRemove={handleRemoveNode}
                  onEdit={(nodeId) => {
                    // Add your logic for handling the edit functionality
                    console.log(`Edit node: ${nodeId}`);
                  }}
                />
              ),
            }}
          >
            <Controls />
            <MiniMap />
            <Background gap={50} size={1} />
          </ReactFlow>
        </div>
        <SourceBlockModal
          isOpen={modalOpen}
          onClose={closeModal}
          title={modalContent.title}
          onSelect={handleModalSelect}
          description={modalContent.description}
          heading={modalContent.heading}
          icon={modalContent.icon}
          modalType={modalType}
          showWaitField={showWaitField}
          onWaitOpen={handleWaitOpen}
        />
        <DropdownModal
          isOpen={dropdownModalOpen}
          onClose={() => setDropdownModalOpen(false)}
          onSelect={handleDropdownSelect}
          modalType={modalType}
          selectedLists={nodes
            .filter(
              (node) =>
                !["1", "2", "3"].includes(node.id) && node.data?.type === "list"
            )
            .map((list) => list.data.id)}
        />
        <WaitModal
          isOpen={waitModalOpen}
          onClose={() => setWaitModalOpen(false)}
          onInsert={handleWaitInsert} // Handle data from WaitModal
        />
      </div>
    </>
  );
}

export default Project;
