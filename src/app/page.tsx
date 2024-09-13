"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/login"); // Redirect to login page on first load
  }, [router]);

  return null; // No need to render anything, just redirect
};

export default IndexPage;
