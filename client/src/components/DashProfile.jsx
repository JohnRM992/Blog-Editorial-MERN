import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Label, Modal } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";

export default function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser , error} = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    email: currentUser.email,
    password: "",
    profilePicture: currentUser.profilePicture,
  });
  const [isEditing, setIsEditing] = useState(false);
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
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    e.preventDefault();
    if (isEditing) {
      if (
        formData.username === currentUser.username &&
        formData.email === currentUser.email &&
        formData.profilePicture === currentUser.profilePicture &&
        formData.password === ""
      ) {
        setUpdateUserError("No se hicieron cambios");
        return;
      }

      if (imageFileUploading) {
        setUpdateUserError("Por favor espere a que se suba la imagen");
        return;
      }

      try {
        dispatch(updateStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();

        if (!res.ok) {
          dispatch(updateFailure(data.message));
          setUpdateUserError(data.message);
        } else {
          dispatch(updateSuccess(data));
          setUpdateUserSuccess("Perfil actualizado correctamente");
          setIsEditing(false); // Exit editing mode on success
        }
      } catch (error) {
        dispatch(updateFailure(error.message));
        setUpdateUserError(error.message);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',

        });
        const data = await res.json();

        if(!res.ok) {
          dispatch(deleteUserFailure(data.message))
        }else {
          dispatch(deleteUserSuccess(data))
        }
    } catch (error) {
        dispatch(deleteUserFailure(error.message))
    }
  };
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Perfil</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
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
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: "#1D1D03",
                },
                text: {
                  fill: "#1D1D03",
                  fontSize: "26px",
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="Usuario"
            className={`rounded-full w-full h-full object-cover border-8 ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-50"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <p className="text-red-600 font-medium pl-3 pt-3 text-center">
            {imageFileUploadError}
          </p>
        )}
        <div className="mt-5">
          <Label
            htmlFor="username"
            value="Usuario"
            className="pl-2 text-lg font-semibold"
          />
          <input
            type="text"
            id="username"
            value={formData.username}
            className="rounded-lg w-full border-2 border-[#1D1D03] focus-within:border-2 focus-within:border-[#A0C4FF] disabled:opacity-50"
            disabled={!isEditing}
            onChange={handleChange}
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
            value={formData.email}
            className="rounded-lg w-full border-2 border-[#1D1D03] focus-within:border-2 focus-within:border-[#A0C4FF] disabled:opacity-50"
            disabled={!isEditing}
            onChange={handleChange}
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
            className="rounded-lg w-full border-2 border-[#1D1D03] focus-within:border-2 focus-within:border-[#A0C4FF] disabled:opacity-50"
            disabled={!isEditing}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="mt-5 rounded-lg h-10 text-white bg-[#1D1D03] text-lg font-semibold transition-all duration-300 hover:bg-black hover:text-white disabled:opacity-50"
          disabled={imageFileUploading}
        >
          {isEditing ? "Actualizar" : "Editar"}
        </button>
      </form>

      <div className="text-red-500 font-medium flex justify-between mt-5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Eliminar cuenta
        </span>
        <span className="cursor-pointer">Logout</span>
      </div>
      {updateUserSuccess && (
        <p className="text-green-500 font-medium pl-3 pt-3">
          *{updateUserSuccess}
        </p>
      )}
      {updateUserError && (
        <p className="text-red-500 font-medium pl-3 pt-3">*{updateUserError}</p>
      )}

{error && (
        <p className="text-red-500 font-medium pl-3 pt-3">
          *{error}
        </p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popupp
        size="md"
      >
        <Modal.Header className="bg-[#F7F5E8] border-b-[#1D1D03]" />
        <Modal.Body className="bg-[#F7F5E8]">
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-[#1D1D03] mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-[#1D1D03]">
              ¿Estás seguro de que quieres eliminar tu cuenta?
            </h3>
            <div className="gap-5">
              <button
                className="rounded-md w-20 h-10 text-[#1D1D03] bg-gray-300 text-lg font-semibold transition-all duration-300 hover:bg-gray-500 hover:text-white "
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="ml-5  rounded-md w-20 h-10 text-[#1D1D03] bg-red-500 text-lg font-semibold transition-all duration-300 hover:bg-red-700 hover:text-white"
                onClick={handleDeleteUser}
              >
                Aceptar
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
