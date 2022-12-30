import React from "react";
import Head from "next/head";
import Nav from "./Nav";

const Layout = ({ children }) => (
  // return (
  <React.Fragment>
    <Head>
      <title>Tybloid List</title>
    </Head>

    <Nav />
    <div className="px-4">
      <div
        className="flex justify-center items-center mx-auto 
      bg-white rounded-lg w-3/4 my-16 p-8"
      >
        <div className="text-2xl font-medium">{children}</div>
      </div>
    </div>
  </React.Fragment>
  // );
);

export default Layout;
