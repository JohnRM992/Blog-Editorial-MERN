import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { HiChevronDown } from "react-icons/hi";
import { Navbar, MegaMenu, Avatar, Dropdown } from "flowbite-react";
import { useSelector } from "react-redux";
import "../custom.css";

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);

  useEffect(() => {
    // Close the dropdown menu if the user clicks outside of it
    function handleClickOutside(event) {
      if (!event.target.matches(".dropbtn")) {
        setDropdownOpen(false);
        setDropdownOpen2(false);
      }
    }
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Navbar className="bg-[#1D1D03] text-[#F5F5F5] ">
      <Link to="/" className="">
        <img
          className="hidden lg:block w-20 m-1"
          src="../../images/cafeytinta.png"
          alt=""
        />
        <img
          className="lg:hidden sm:block w-20 m-2"
          src="../../images/cafeytinta2.png"
          alt=""
        />
      </Link>
      <form>
        <div className="hidden lg:flex flex-row bg-white rounded-lg border-2 focus-within:border-2 focus-within:border-[#A0C4FF] text-black">
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent border-0 focus:outline-none focus:border-none focus:ring-0"
          />
          <button>
            <AiOutlineSearch className="text-black w-5 h-5 my-2" />
          </button>
        </div>
      </form>
      <div className="flex flex-row gap-1 md:order-2">
        <button
          type="submit"
          className="lg:hidden border-2 border-[#F7F5E8] transition-all duration-300 focus:bg-[#F7F5E8] px-3.5 w-12 h-10 rounded-full focus:text-[#1D1D03]"
        >
          <AiOutlineSearch />
        </button>

        {currentUser ? (
          <div className="dropdown">
            <button
              onClick={() => setDropdownOpen2(!dropdownOpen2)}
              className="dropbtn"
            >
              <img
                src={currentUser.profilePicture}
                alt="user"
                className="w-10 dropbtn rounded-full"
              />
            </button>
            <div
              id="myDropdown"
              className={`dropdown-content2 ${dropdownOpen2 ? "show" : ""}`}
            >
              <div className="min-w-40 text-center">
                <p className="pt-1 pb-1 border-b-2 border-gray-200">
                  <span className="block text-sm">@{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">
                    {currentUser.email}
                  </span>
                </p>
                <Link to={"dashboard?tab=profile"}>
                  <p className="pt-1 pb-1 transition-all duration-300 hover:bg-[#1D1D03] hover:text-white sm:active:bg-[#1D1D03]">
                    Perfil
                  </p>
                </Link>

                <p className="pt-1 pb-1 transition-all duration-300 rounded-bl-lg rounded-br-lg hover:bg-[#1D1D03] hover:text-white">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
  
          <Link to="sign-in">
            <button className="hidden lg:block transition-all duration-300 lg:hover:bg-[#F7F5E8] w-16 h-10 rounded-full lg:hover:text-[#1D1D03] mx-1 ">
              Login
            </button>
            <button className="lg:hidden border-2 border-[#F7F5E8] transition-all duration-300 lg:hover:bg-[#F7F5E8] w-16 h-10 rounded-full lg:hover:text-[#1D1D03] focus:bg-[#F7F5E8] focus:text-[#1D1D03]">
              Login
            </button>
          </Link>
        )}

        <Navbar.Toggle className="text-white focus:text-[#1D1D03] rounded-full" />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={"div"}>
          <Link to="/" className="font-normal text-base ">
            <button className="text-white transition-all duration-300  lg:hover:bg-[#F7F5E8] w-16 h-10 rounded-full lg:hover:text-[#1D1D03] focus:bg-[#F7F5E8] focus:text-[#1D1D03]">
              Home
            </button>
          </Link>
        </Navbar.Link>
        <Navbar.Link as={"div"}>
          <Link to="/about" className="font-normal text-base ">
            <button className="text-white transition-all duration-300  lg:hover:bg-[#F7F5E8] w-16 h-10 rounded-full lg:hover:text-[#1D1D03] focus:bg-[#F7F5E8] focus:text-[#1D1D03]">
              About
            </button>
          </Link>
        </Navbar.Link>

        <div className="dropdown hidden lg:block">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="dropbtn font-normal text-base text-white transition-all duration-300  lg:hover:bg-[#F7F5E8] w-24 h-10 rounded-full lg:hover:text-[#1D1D03] focus:bg-[#F7F5E8] focus:text-[#1D1D03]"
          >
            Servicios
          </button>
          <div
            id="myDropdown"
            className={`dropdown-content ${dropdownOpen ? "show" : ""} mt-5`}
          >
            <div className="flex flex-row">
              <div className="min-w-60 text-center  ">
                <p className="pt-2 pb-2 transition-all duration-300 rounded-tl-lg hover:bg-[#1D1D03] hover:text-white">
                  Servicio 1
                </p>
                <p className="pt-2 pb-1 transition-all duration-300 hover:bg-[#1D1D03] hover:text-white">
                  Servicio 2
                </p>
                <p className="pt-2 pb-2 transition-all duration-300 rounded-bl-lg hover:bg-[#1D1D03] hover:text-white">
                  Servicio 3
                </p>
              </div>
              <div className="min-w-60 text-center">
                <p className="pt-2 pb-2 transition-all duration-300 rounded-tr-lg hover:bg-[#1D1D03] hover:text-white">
                  Servicio 4
                </p>
                <p className="pt-2 pb-1 transition-all duration-300 hover:bg-[#1D1D03] hover:text-white">
                  Servicio 5
                </p>
                <p className="pt-2 pb-2 transition-all duration-300 rounded-br-lg hover:bg-[#1D1D03] hover:text-white">
                  Servicio 6
                </p>
              </div>
            </div>
          </div>
        </div>

        <MegaMenu.DropdownToggle className="text-white lg:hidden md:hidden sm:block pl-5 focus:text-black">
          Company
          <HiChevronDown />
        </MegaMenu.DropdownToggle>

        <MegaMenu.Dropdown className="lg:hidden md:hidden text-white">
          <div className="mx-auto mt-6 grid max-w-screen-xl  px-4 py-5 text-sm text-gray-500 dark:text-gray-400 md:grid-cols-3 md:px-6">
            <ul className="space-y-8 sm:mb-4 md:mb-0">
              <li>
                <a href="#" className="text-white font-normal text-base">
                  Online Stores
                </a>
              </li>
              <li>
                <a href="#" className="text-white font-normal text-base">
                  Segmentation
                </a>
              </li>
              <li>
                <a href="#" className="text-white font-normal text-base">
                  Marketing CRM
                </a>
              </li>
              <li>
                <a href="#" className="text-white font-normal text-base">
                  Online Stores
                </a>
              </li>
            </ul>
          </div>
        </MegaMenu.Dropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}
