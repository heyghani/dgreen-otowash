"use client";

import Layout from "@/components/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="p-8 text-black">
        <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
        <p>You are now logged in.</p>
      </div>
    </Layout>
  );
};

export default HomePage;
