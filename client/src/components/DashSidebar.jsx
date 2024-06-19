import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { Sidebar } from 'flowbite-react';
import { FaUserCircle } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="w-full md:w-60  ">
      <Link to="/dashboard?tab=profile">
        <button className="rounded-md flex pl-5 pt-3 text-[1D1D03] bg-[#F7F5E8] w-11/12 h-14 mt-5 ml-4 md:ml-2.5   focus:border-black focus:border-2">
          <FaUserCircle className="w-8 h-8" />
          <p className="font-medium pt-1">Perfil</p>
        </button>
      </Link>

      <button className="rounded-md flex pl-5 pt-3 text-[1D1D03] bg-[#F7F5E8] w-11/12 h-14 mt-5 ml-4 md:ml-2.5  mb-5 focus:border-black focus:border-2">
        <IoMdLogOut className="w-8 h-8" />
        <p className="font-medium pt-1">Logout</p>
      </button>
    </div>
  );
}