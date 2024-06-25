import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";


export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(true);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = users.length;

    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

//   const handleDeleteUser = async () => {
//     setShowModal(false);

//     try {
//       const res = await fetch(`/api/user/deleteuser/${userIdToDelete}/${currentUser._id}`, {
//         method: 'DELETE',
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         console.log(data.message);
//       } else {
//         setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };


    const handleDeleteUser = async () => {

    }

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <table className="shadow-md text-white bg-[#1D1D03] rounded-lg">
            <thead>
              <tr>
                <th className="p-3">Fecha de creación</th>
                <th className="p-3">Imagen</th>
                <th className="p-3">Usuario</th>
                <th className="p-3">Email</th>
                <th className="p-3">Admin</th>
                <th className="p-3">Eliminar</th>
                
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-[#1D1D03] hover:text-white font-semibold text-[#1D1D03] border-2 border-[#1D1D03] bg-[#F7F5E8]">
                  <td className="text-center border-[#1D1D03] border-r-2 border-b-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="border-[#1D1D03] border-r-2 border-b-2">
                    
                      <img 
                        src={user.profilePicture} 
                        alt={user.username}
                        className="border-2 border-[#1D1D03] rounded-full w-16 h-16 object-cover mx-auto m-1"
                      />
                    
                  </td>
                  <td className="pl-6 pr-6 border-[#1D1D03] border-r-2 border-b-2 w-96">
                    {user.username}
                  </td>
                  <td className="text-center border-[#1D1D03] border-r-2 border-b-2">
                    {user.email}
                  </td>
                  <td className="text-center border-[#1D1D03] border-r-2 border-b-2">
                    {user.isAdmin ? (<FaCheck className="text-green-500 mx-auto" />) : <FaTimes className="text-red-500 mx-auto" />}
                  </td>
                  <td className="text-center border-[#1D1D03] border-r-2 border-b-2 text-red-500 hover:underline cursor-pointer">
                    <span onClick={() => {
                      setShowModal(true);
                      setUserIdToDelete(user._id);
                    }}>Eliminar</span>
                  </td>
             
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <button onClick={handleShowMore} className="w-full self-center py-7 font-semibold">Mostrar más</button>
          )}
        </>
      ) : (
        <p>No hay usuarios</p>
      )}

      <Modal
        className="w-96 h-72 rounded-md mx-auto my-auto"
        show={showModal}
        onClose={() => setShowModal(false)}
        popupp
        size="md"
      >
        <Modal.Header className="bg-[#F7F5E8] rounded-t-md border-2 border-t-2 border-black shadow-md" />
        <Modal.Body className="h-64 rounded-b-md border-l-2 border-r-2 border-b-2 border-black bg-[#F7F5E8] shadow-md">
          <div className="text-center">
            <HiOutlineExclamationCircle className="mt-3 h-14 w-14 text-[#1D1D03] mb-4 mx-auto" />
            <h3 className="mb-3 text-lg text-[#1D1D03]">
              ¿Estás seguro/a de que quieres eliminar este usuario?
            </h3>
            <div className="mb-5">
              <button
                className="rounded-md w-20 h-10 text-[#1D1D03] bg-gray-300 text-lg font-semibold transition-all duration-300 hover:bg-gray-500 hover:text-white"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="ml-5 rounded-md w-20 h-10 text-[#1D1D03] bg-red-500 text-lg font-semibold transition-all duration-300 hover:bg-red-700 hover:text-white"
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
