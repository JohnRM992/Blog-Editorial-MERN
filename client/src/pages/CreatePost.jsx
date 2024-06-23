import React, { useState } from "react";
import { FileInput} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase'
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {useNavigate} from 'react-router-dom'
export default function CreatePost() {

  const [file,setFile] = useState(null);
  const [imageUploadProgress , setImageUploadProgress] = useState(null);
  const [imageUploadError , setImageUploadError] = useState(null);
  const [formData , setFormData] = useState({});
  const [publishError , setPublishError] = useState(null);

  const navigate = useNavigate();
  const handleUploadImg = async () => {

      try{
          if(!file){
            setImageUploadError('Por favor seleccione una imagen')
            return;
          }

          setImageUploadError(null);

          const storage = getStorage(app);
          const fileName = new Date().getTime() + '-' + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef,file);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = 
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImageUploadProgress(progress.toFixed(0));
            },
            (error) => {
                setImageUploadError('Hubo un error al subir la imagen');
                setImageUploadProgress(null);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUploadProgress(null);
                    setImageUploadError(null);
                    setFormData({...formData, image: downloadURL});
                });
              }
            );
          

      }catch(error){
        setImageUploadError('Hubo un error al subir la imagen')
        setImageUploadProgress(null);
        console.log(error);
      }
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const res = await fetch('/api/post/create' , {
           method: 'POST',
           headers: {
            'Content-Type' : 'application/json'
           },
           body: JSON.stringify(formData)
        });
        const data = await res.json();

      

        if(!res.ok){
          setPublishError(data.message);
          return;
        }
        if(res.ok){
          setPublishError(null);
          navigate(`/post/${data.slug}`)
        }


    }catch(error) {
      setPublishError('Algo salió mal')
    }

  }

  return (
    
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Crear un post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className=" gap-4 sm:flex-row justify-between">
          <input
            onChange={(e) =>
              setFormData({ ...formData , title: e.target.value})
            }
            type="text"
            id="title"
            placeholder="Titulo"
            className="rounded-lg w-full border-2 border-[#1D1D03] focus-within:border-2 focus-within:border-[#A0C4FF]"
            
          ></input>

          <select
            onChange={(e)=>
              setFormData({ ...formData , category: e.target.value})
            }
           className="mt-5 w-full rounded-lg border-2 border-[#1D1D03] focus:border-2 focus:border-[#A0C4FF]">
            <option value="sincategoria">Seleccionar una categoria</option>
            <option value="noticias">Noticias</option>
            <option value="resena">Reseña</option>
            <option value="tecnologia">Tecnología</option>
            <option value="salud">Salud</option>
          </select>
        </div>

        <div className="flex gap-4 items-center justify-between border-2 border-[#1D1D03] h-14 rounded-md">
          {/* <input className="ml-2" type="file" accept="image/*"></input> */}
          <FileInput className="ml-2" id="file-upload bg-[#1D1D03]" onChange={(e) => setFile(e.target.files[0])} />

          <button className="text-white w-12 h-9 bg-[#1D1D03] transition-all duration-500 hover:bg-black mr-3 rounded-md disabled:opacity-50"
          type="button"
          onClick={handleUploadImg}
          disabled={imageUploadProgress}
          >
            {imageUploadProgress ? 
              <div >
                <CircularProgressbar 
                className="w-7 h-7 ml-2"
                value={imageUploadProgress}
                 />
              </div> 
              : (
                'Subir'
              )
            }
          
          </button>
        </div>
        {imageUploadError && (
          <p className="text-red-500 font-medium pl-3">
            *{imageUploadError}
            </p>
        )}

        {formData.image && (
          <img src={formData.image} alt="Imagen"  className="w-full h-72 object-fill  border-[#1D1D03] rounded-md"/>
        )}
        <ReactQuill
          theme="snow"
          placeholder="Escribir aqui..."
          className=" h-72 pb-10"
          required
          onChange={
            (value) => {
              setFormData({...formData, content: value});
            }}
        />

        <button
          type="submit"
          className=" rounded-lg h-10 text-white bg-[#1D1D03] text-lg font-semibold transition-all duration-300 hover:bg-black hover:text-white"
        >
          Publicar
        </button>
        {publishError && 
          <p className="text-red-500 font-medium pl-3">
            *{publishError}</p>
        }
      </form>
    </div>
  );
}
