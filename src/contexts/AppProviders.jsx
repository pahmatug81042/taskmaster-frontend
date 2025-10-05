import React from "react";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { ProjectProvider } from "./ProjectContext";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ProjectProvider>
          {children}
        </ProjectProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;