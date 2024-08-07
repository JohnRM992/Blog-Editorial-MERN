import React, { useState, useEffect } from "react";
import { Link , useLocation , useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
// import { HiChevronDown } from "react-icons/hi";
// import { Navbar, MegaMenu } from "flowbite-react";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { slide as Menu } from "react-burger-menu";
import { useSelector } from "react-redux";
import { logoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

import "../custom.css";
import MenuMobile from "./MenuMobile";

export default function Header() {
  // const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
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

  const handleDropdown1 = () => {
    setDropdownOpen(!dropdownOpen);
    setDropdownOpen2(false);
  };

  const handleDropdown2 = () => {
    setDropdownOpen2(!dropdownOpen2);
    setDropdownOpen(false);
  };

  const [searchTerm,setSearchTerm] = useState('')

  useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const searchTermFromUrl = urlParams.get('searchTerm');

      if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl);
      }
  },[location.search])
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(logoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e)  => {
    e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('searchTerm', searchTerm)
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`)
  }
  return (
    <nav className="h-full bg-[#1D1D03] ">
      <div className="flex flex-row justify-around lg:justify-between ">
        <div className="ml-0 lg:ml-10">
          <Link to="/">
            <img
              className="hidden lg:block w-20 pt-3 pb-3"
              src="../../images/cafeytinta.png"
              alt=""
            />
            <img
              className="lg:hidden sm:block w-16 m-2"
              src="../../images/cafeytinta2.png"
              alt=""
            />
          </Link>
        </div>
        {/* Inicio de sección de busqueda */}
        <div className="self-center">
          <form onSubmit={handleSubmit}>
            <div className="hidden w-72 justify-between lg:flex flex-row bg-white rounded-lg border-2 focus-within:border-2 focus-within:border-[#A0C4FF] text-black">
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-transparent border-0 focus:outline-none focus:border-none focus:ring-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              ></input>
              <button>
                <AiOutlineSearch className="text-black w-5 h-5 my-2" />
              </button>
            </div>
          </form>
        </div>

        {/* INICIO DE BOTONES PRINCIPALES */}
        <div className="hidden lg:flex self-center gap-10 ">
          <div>
            <Link to="/" className="font-normal text-base">
              <button className="text-white transition-all duration-300 lg:hover:bg-[#F7F5E8] w-16 h-10 rounded-full lg:hover:text-[#1D1D03] focus:bg-[#F7F5E8] focus:text-[#1D1D03]">
                Home
              </button>
            </Link>
          </div>
          <div>
            <Link to="/about" className="font-normal text-base">
              <button className="text-white transition-all duration-300 lg:hover:bg-[#F7F5E8] w-16 h-10 rounded-full lg:hover:text-[#1D1D03] focus:bg-[#F7F5E8] focus:text-[#1D1D03]">
                About
              </button>
            </Link>
          </div>
          <div>
            {/* Inicio de Dropdown de Servicios */}
            <div className="dropdown">
              <button
                onClick={handleDropdown1}
                className="dropbtn font-normal text-base text-white transition-all duration-300 lg:hover:bg-[#F7F5E8] w-24 h-10 rounded-full lg:hover:text-[#1D1D03] focus:bg-[#F7F5E8] focus:text-[#1D1D03]"
              >
                Servicios
              </button>
              <div
                id="myDropdown"
                className={`dropdown-content ${
                  dropdownOpen ? "show" : ""
                } mt-5`}
              >
                <div className="flex flex-row">
                  <div className="min-w-60 text-center">
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
            {/* Fin del Dropdown de Servicios */}
          </div>
        </div>
        {/* FIN DE BOTONES PRINCIPALES */}

        {/* INICIO SECCIÓN LOGIN/BUSQUEDA */}
        <div className="self-center lg:pr-32 flex gap-2 outer-container">
          {/* Fin de sección de busqueda */}

          <div className="self-center">
            <button
              type="submit"
              className="lg:hidden border-2 border-[#F7F5E8] transition-all duration-300 focus:bg-[#F7F5E8] px-3.5 w-12 h-10 rounded-full focus:text-[#1D1D03] text-white"
            >
              <AiOutlineSearch />
            </button>
          </div>

          {/* Inicio de Dropdown de sección de Login/Usuario */}
          {currentUser ? (
            <div className="dropdown self-center">
              <button onClick={handleDropdown2} className="dropbtn">
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
                    <span className="block text-sm">
                      @{currentUser.username}
                    </span>
                    <span className="block text-sm font-medium truncate">
                      {currentUser.email}
                    </span>
                  </p>
                  <Link to={"dashboard?tab=profile"}>
                    <p className="font-medium pt-1 pb-1 transition-all duration-300 hover:bg-[#1D1D03] hover:text-white sm:active:bg-[#1D1D03]">
                      Perfil
                    </p>
                  </Link>
                  <p onClick={handleLogout} className="font-medium pt-1 pb-1 transition-all duration-300 rounded-bl-lg rounded-br-lg hover:bg-[#1D1D03] hover:text-white">
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Inicio de boton de Login
            <div className="self-center">
              <Link to="sign-in">
                <button className="hidden text-white lg:block transition-all duration-300 lg:hover:bg-[#F7F5E8] w-16 h-10 rounded-full lg:hover:text-[#1D1D03] mx-1">
                  Login
                </button>
                <button className="text-white lg:hidden border-2 border-[#F7F5E8] transition-all duration-300 lg:hover:bg-[#F7F5E8] w-16 h-10 rounded-full lg:hover:text-[#1D1D03] focus:bg-[#F7F5E8] focus:text-[#1D1D03]">
                  Login
                </button>
              </Link>
            </div>
          )}

          <div>
            <MenuMobile />
          </div>
        </div>
      </div>
    </nav>
  );
}
