import React from "react";
import Sidebar from "../components/Sidebar";
import getMessage from "../hooks/getMessages";
import { useSelector } from "react-redux";
import Message from "../components/MessageArea";


const Home = () => {
  const {selectedUser} = useSelector(state=>state.user)
  getMessage()
  return (
    <div className="h-screen w-full bg-slate-950 flex overflow-hidden">
      <Sidebar />
      <Message />
    </div>
  );
};

export default Home;