import Head from "next/head";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <>
      <Head>
        <title>Decentralized Substack</title>
        <meta name="description" content="Decentralized substack" />
      </Head>
      <NavBar activePage={'home'}/>
      <p>Home</p>
    </>
  );
};

export default Home;
