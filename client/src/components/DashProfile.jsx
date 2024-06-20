import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Label } from "flowbite-react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  console.log(imageFileUploadProgress, imageFileUploadError);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        if (file.size <= 2 * 1024 * 1024) {
          setImageFile(file);
          setImageFileUrl(URL.createObjectURL(file));
          setImageFileUploadError(null);
        } else {
          setImageFileUploadProgress(null);
          setImageFileUploadError("La imagen debe ser menor a 2MB.");
        }
      } else {
        setImageFileUploadProgress(null);
        setImageFileUploadError("Selecciona un archivo de imagen válido.");
      }
    }
  };
  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploadError(null)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Saber que porcentaje se va subiendo
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) =>{
        setImageFileUploadProgress(null);
      },
   
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Perfil</h1>

      <form className="flex flex-col gap-4">
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        ></input>
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-lg overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >

          {imageFileUploadProgress && (
              <CircularProgressbar 
                  
                  value={imageFileUploadProgress || 0}
                  text={`${imageFileUploadProgress}`}
                strokeWidth={5}
                styles={{
                    root:{
                      width:'100%',
                      height:'100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    },
                    path:{
                      stroke: '#1D1D03',
                    },
                    text:{
                      fill: '#1D1D03',
                      fontSize: '26px',
                    }
                }}
                  />
          )}

          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="Usuario"
            className={`rounded-full w-full h-full object-cover border-8 ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-50'}`}
          />
        </div>
        <div>
          {imageFileUploadError && (
            <p className="text-red-600 font-medium pl-3 pt-3 text-center">
              {imageFileUploadError}
            </p>
          )}
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
            htmlFor="password"
            value="Password"
            className="pl-2 text-lg font-semibold"
          />
          <input
            type="password"
            id="password"
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
