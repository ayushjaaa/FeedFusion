import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import RoleProtectedRoute from "../RoleProtectedRoute/RoleProtectedRoute";
import AdminDashboard from "../../components/AdminDashboard";
import Allposts from "../../features/dashboard/Allposts";
import Layout from "../../features/dashboard/Layout";
import DynamicTreeForm from "../../components/components/DynamicTreeForm";
import UseTreeItemHookProperties from '../../components/components/BasicTreeView'
const ProtecteRoute = () => {
  return (
    <div>
      <Routes>
        {/* // start for admin dasborad and have the layout beacuse layout is comman for all the page */}
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/admin-dashboard" replace />} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <RoleProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </RoleProtectedRoute>
              </ProtectedRoute>
            }
          />
               <Route path="/allpost" element={<Allposts />} />
               <Route path="/addpost" element={< DynamicTreeForm/>} />
         
               <Route path="/interests" element={<UseTreeItemHookProperties />} />
        <Route path="interests/:id" element={<UseTreeItemHookProperties />} />
               
         
        </Route>  
   
      </Routes>
    </div>
  );
};

export default ProtecteRoute;
