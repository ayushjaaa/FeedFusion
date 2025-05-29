import React from "react";
import { Route, Router  ,Routes  } from "react-router-dom";
import PublicRoute from "../PublicRoute/authoritarianRoute/authroutes";
import ProtecteRoute from "../ProtecteRoute/ProtecteRoute";

const AppRoutes = () => {
  return (
    <div>

        <Routes>
          {/* // Public routes// */}
          <Route path="/*" element={<PublicRoute />}></Route>
          {/* ProtectedRoute */}

          <Route path="/app/*" element={<ProtecteRoute/>}></Route>

          {/* 404 */}
          <Route path="*" element={<div>404</div>}></Route>
        </Routes>

    </div>
  );
};

export default AppRoutes;
