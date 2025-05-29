// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const interestData = [
//   {
//     id: 'tech',
//     label: 'Tech',
//     children: [
//       {
//         id: 'programming',
//         label: 'Programming',
//         children: [
//           { id: 'javascript', label: 'JavaScript' },
//           { id: 'python', label: 'Python' },
//         ],
//       },
//       {
//         id: 'gadgets',
//         label: 'Gadgets',
//       },
//     ],
//   },
//   {
//     id: 'work',
//     label: 'Radio',
//     children: [
//       {
//         id: 'shhs',
//         label: 'Some Sub',
//       },
//     ],
//   },
// ];

// // Recursive search function to find an item by ID
// const findItemById = (items, id) => {
//   for (let item of items) {
//     if (item.id === id) return item;
//     if (item.children) {
//       const found = findItemById(item.children, id);
//       if (found) return found;
//     }
//   }
//   return null;
// };

// const BasicTreeView = () => {
//   const { id } = useParams(); // from URL
//   console.log(id)
//   const navigate = useNavigate();
// const [first, setfirst] = useState([])
//   let currentItems = interestData;

//   if (id) {
//     const found = findItemById(interestData, id);
//     if (found && found.children) {
//       currentItems = found.children;
//     } else {
//       currentItems = [];
//     }
//   }

// const setDatasets = (id)=>{

//   console.log(id)
// setfirst([...first,id])

//    navigate(`/app/interests/${id}`)

// }
// console.log(first)
//   return (
//     <div style={{ padding: 20 }}>
//       <h2>{id ? `Sub Interests of "${id}"` : 'Top Level Interests'}</h2>
//       {currentItems.length === 0 ? (
//         <p>No sub-interests found.</p>
//       ) : (
//         <ul>
//           {currentItems.map((item) => (
//             <li key={item.id} style={{ margin: 10 }}>
//               <span  onClick={() => setDatasets(item.id) } >{item.label}</span>
//               {item.children && (
//                 <button
//                   style={{ marginLeft: 10 }}
//                   onClick={() => setDatasets(item.id) }
//                 >

//                   {item.label}
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default BasicTreeView;
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  const [intrest, setintrest] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  let currentItems = interestData;
  if (id) {
    const found = findItemById(interestData, id);
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
    "#FFB6C1", "#ADD8E6", "#90EE90", "#FFD700",
    "#FFA07A", "#E6E6FA", "#FF69B4", "#D8BFD8", "#87CEFA",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          fontSize: "32px",
          marginBottom: "30px",
          fontWeight: "700",
          color: "#333",
          textAlign: "center",
        }}
      >
        {id
          ? currentItems.length > 0
            ? `Sub Interests of "${id}"`
            : `No more sub-interests.`
          : "Explore Your Interests"}
      </h2>

      {currentItems.length === 0 ? (
        <button
          style={{
            padding: "12px 28px",
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onClick={() => alert("Submit logic can go here")}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#45A049")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#4CAF50")}
        >
          Submit Now
        </button>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "15px",
            maxWidth: "900px",
          }}
        >
          {currentItems.map((elem, index) => (
            <div
              key={elem.id}
              onClick={() => getNavigate(elem.id)}
              style={{
                backgroundColor: tagColors[index % tagColors.length],
                padding: "12px 24px",
                borderRadius: "25px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
                color: "#333",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
