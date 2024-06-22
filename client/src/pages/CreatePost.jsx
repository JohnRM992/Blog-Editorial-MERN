import React from "react";
import { FileInput, Label } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Crear un post</h1>
      <form className="flex flex-col gap-4">
        <div className=" gap-4 sm:flex-row justify-between">
          <input
            type="text"
            id="title"
            placeholder="Titulo"
            className="rounded-lg w-full border-2 border-[#1D1D03] focus-within:border-2 focus-within:border-[#A0C4FF]"
            required
          ></input>

          <select className="mt-5 w-full rounded-lg border-2 border-[#1D1D03] focus:border-2 focus:border-[#A0C4FF]">
            <option value="sincategoria">Seleccionar una categoria</option>
            <option value="noticias">Noticias</option>
            <option value="resena">Reseña</option>
            <option value="tecnologia">Tecnología</option>
            <option value="salud">Salud</option>
          </select>
        </div>

        <div className="flex gap-4 items-center justify-between border-2 border-[#1D1D03] h-14 rounded-md">
          {/* <input className="ml-2" type="file" accept="image/*"></input> */}
          <FileInput className="ml-2" id="file-upload bg-[#1D1D03]" />
          <button className="text-white p-2 bg-[#1D1D03] mr-3 rounded-md">
            Subir
          </button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Escribir aqui..."
          className=" h-72 pb-10"
          required
        />

        <button
          type="submit"
          className=" rounded-lg h-10 text-white bg-[#1D1D03] text-lg font-semibold transition-all duration-300 hover:bg-black hover:text-white"
        >
          Publicar
        </button>
      </form>
    </div>
  );
}
