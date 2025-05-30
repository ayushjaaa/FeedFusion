import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { intrestchange,addintrest } from "../../features/Postform/PostFormSlice";
import { useTheme } from "@emotion/react";
import { useSelector } from "react-redux";
import {submitPost} from '../../features/Postform/PostFormSlice'

// Sample data
const interestData = [
  {
    id: "tech",
    label: "Tech",
    children: [
      {
        id: "programming",
        label: "Programming",
        children: [
          { id: "javascript", label: "JavaScript" },
          { id: "python", label: "Python" },
        ],
      },
      { id: "gadgets", label: "Gadgets" },
    ],
  },
  {
    id: "work",
    label: "Radio",
    children: [{ id: "shhs", label: "Some Sub" }],
  },
];



// Recursive finder function
const findItemById = (items, id) => {
  for (let item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }
  return null;
};

const BasicTreeView = () => {
const {Postcontent} = useSelector((state)=>state.counter.FormData)
const token = useSelector((state) => state.counter.auth.token);
console.log(token)

  const theme = useTheme()
  const [intrest, setintrest] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  function SubmitIntrest(e) {
    alert("Submit logic can go here")
    console.log(Postcontent)
    dispatch(submitPost(token,Postcontent))
    navigate('/app/allpost')

  }
  dispatch(addintrest(intrest))
  

  let currentItems = interestData;
  if (id) {
    const found = findItemById(interestData, id);
    if (found?.children && found.children.length === 0) {
      dispatch(intrestchange());
    }
    if (found && found.children) {
      currentItems = found.children;
    } else {
      currentItems = [];
    }
  }

  const getNavigate = (id) => {
    setintrest([...intrest, id]);
    navigate(`/app/interests/${id}`);
  };

  const tagColors = [
    "bg-pink-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-400",
    "bg-orange-300",
    "bg-purple-300",
    "bg-pink-400",
    "bg-purple-400",
    "bg-sky-300",
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-10 box-border ">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        {id
          ? currentItems.length > 0
            ? `Sub Interests of "${id}"`
            : `No more sub-interests.`
          : "Explore Your Interests"}
      </h2>

      {currentItems.length === 0 ? (
        <button
          onClick={() => SubmitIntrest()}
          className="px-7 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold cursor-pointer transition-colors duration-300 hover:bg-green-700 focus:outline-none"
        >
          Submit Now
        </button>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl">
          {currentItems.map((elem, index) => (
            <div
              key={elem.id}
              onClick={() => getNavigate(elem.id)}
              className={`${tagColors[index % tagColors.length]} px-6 py-3 rounded-full cursor-pointer font-semibold text-gray-800 shadow-md transform transition-transform duration-200 hover:scale-105 select-none`}
            >
              {elem.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BasicTreeView;
