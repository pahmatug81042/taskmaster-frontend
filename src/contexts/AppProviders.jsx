import React from "react";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";
import { ProjectProvider } from "./ProjectContext";
import { TaskProvider } from "./TaskContext";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ProjectProvider>
          <TaskProvider>{children}</TaskProvider>
        </ProjectProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;