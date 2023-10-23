import React, { ReactNode, FC } from "react";
import Navbar from "./navbar/Navbar";
type BodyProps = {
  children: ReactNode;
};

const Body: FC<BodyProps> = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <main className="container">{children}</main>
      <div>
        
      </div>
    </div>
  );
};

export default Body;
