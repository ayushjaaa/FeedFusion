import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {submitInterest} from '../../features/intrestbysuperadmin/Intrestbysuperadmin'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
const DynamicTreeForm = () => {
  // Unique ID generator
  const nextId = useRef(1);

  const dispatch = useDispatch()
  const {token} = useSelector((state)=>state.counter.auth)
  const navigate = useNavigate()

  // Root node state
  const [treeData, setTreeData] = useState({
    id: 0,
    name: 'Root',
    children: [],
  });

  // Add child node (Solution 1: Proper cloning without mutation)
  const handleAddNode = (nodeId) => {
    const updatedTree = JSON.parse(JSON.stringify(treeData));
// console.log(updatedTree.id)
    const addNodeToTree = (currentNode) => {
      // console.log("nodeId",nodeId)
     console.log("currentNode",currentNode)
      if (currentNode.id === nodeId) {
        // console.log("currnt = node")
        currentNode.children.push({ id: nextId.current++, name: '', children: [] });
      } else {
        console.log("currentNode 2",currentNode)
        currentNode.children.forEach(addNodeToTree);
      }
    };

    addNodeToTree(updatedTree);
    setTreeData(updatedTree);
  };

  // Update node name (Solution 2: State-safe updating)
  const handleNameChange = (nodeId, newName) => {
    const updatedTree = JSON.parse(JSON.stringify(treeData));

    const updateNodeName = (currentNode) => {
      if (currentNode.id === nodeId) {
        currentNode.name = newName;
      } else {
        currentNode.children.forEach(updateNodeName);
      }
    };

    updateNodeName(updatedTree);
    setTreeData(updatedTree);
  };

  // Remove child node (Improved)
  const handleRemoveNode = (parentId, nodeIdToRemove) => {
    const updatedTree = JSON.parse(JSON.stringify(treeData));

    const removeNodeFromTree = (currentNode) => {
      if (currentNode.id === parentId) {
        currentNode.children = currentNode.children.filter((child) => child.id !== nodeIdToRemove);
      } else {
        currentNode.children.forEach(removeNodeFromTree);
      }
    };

    removeNodeFromTree(updatedTree);
    setTreeData(updatedTree);
  };

  // Recursive renderer
  const renderTree = (node, parentId = null) => (
    <div key={node.id} className=" p-4 rounded-md mb-4">
      <div className="flex items-center">
        <input
          type="text"
          value={node.name}
          onChange={(e) => handleNameChange(node.id, e.target.value)}
          placeholder="Enter name"
          className="flex-1 p-2 border rounded mr-2"
        />
        <button
          onClick={() => handleAddNode(node.id)}
          className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
        >
          +
        </button>
        {parentId !== null && (
          <button
            onClick={() => handleRemoveNode(parentId, node.id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            –
          </button>
        )}
      </div>

      {node.children.length > 0 && (
        <div className="ml-4 mt-2">
          {node.children.map((child) => renderTree(child, node.id))}
        </div>
      )}
    </div>
  );

  // Submit data
  const handleSubmit = () =>{
    const url = "/superadmin/intrest";
    const Token = token;
    console.log(treeData)
     dispatch(submitInterest({url,Token,treeData})).unwrap().then((result)=>{
 toast.success("interest created successful");
 navigate("/app/allpost")
     })
     .catch((error)=>{
      console.log(error)
      toast.error("login plz")
      navigate('/login')

     })
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dynamic Tree Form</h2>
      {renderTree(treeData)}
      <button
        onClick={handleSubmit}
        className="mt-4 w-full py-2 bg-green-500 text-white rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default DynamicTreeForm;
