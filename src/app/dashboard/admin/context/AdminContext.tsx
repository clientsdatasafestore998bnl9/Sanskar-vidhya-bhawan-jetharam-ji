"use client";
import React, { createContext, useContext, ReactNode } from "react";

export const AdminContext = createContext<any>({});
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children, value }: { children: ReactNode, value: any }) => {
    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
