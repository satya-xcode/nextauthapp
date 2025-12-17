import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return <div className="p-10 min-h-screen bg-gray-300">{children}</div>;
}

export default Layout;
