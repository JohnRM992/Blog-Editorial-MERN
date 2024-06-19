import React from "react";
import { useSelector } from "react-redux";
import { Label } from "flowbite-react";
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Perfil</h1>

      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-lg overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="Usuario"
            className="rounded-full w-full h-full object-cover border-8 border-[#1D1D03]"
          />
        </div>
        <div className="mt-5">
          <Label
            htmlFor="username"
            value="Usuario"
            className="pl-2 text-lg font-semibold"
          />
          <input
            type="text"
            id="username"
            value={currentUser.username}
            className="rounded-lg w-full border-2 border-[#1D1D03] focus-within:border-2 focus-within:border-[#A0C4FF]"
            disabled
          />
        </div>
        <div className="mt-5">
          <Label
            htmlFor="email"
            value="Email"
            className="pl-2 text-lg font-semibold"
          />
          <input
            type="text"
            id="email"
            value={currentUser.email}
            className="rounded-lg w-full border-2 border-[#1D1D03] focus-within:border-2 focus-within:border-[#A0C4FF]"
            disabled
          />
        </div>
        <div className="mt-5">
          <Label
            htmlFor="passwrd"
            value="Password"
            className="pl-2 text-lg font-semibold"
          />
          <input
            type="password"
            id="email"
            placeholder="***********"
            className="rounded-lg w-full border-2 border-[#1D1D03] focus-within:border-2 focus-within:border-[#A0C4FF]"
            disabled
          />
        </div>

        <button
          type="submit"
          className="mt-5 rounded-lg h-10 text-white bg-[#1D1D03] text-lg font-semibold transition-all duration-300 hover:bg-black hover:text-white"
        >
          Actualizar
        </button>
      </form>

    <div className="text-red-500 font-medium flex justify-between mt-5">
      <span className="cursor-pointer">Delete account</span>
      <span className="cursor-pointer">Logout</span>

    </div>

    </div>
  );
}
