import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;

    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();

      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);

    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <table className="shadow-md text-white bg-[#1D1D03] rounded-lg">
            <thead>
              <tr>
                <th className="p-3">Fecha</th>
                <th className="p-3">Imagen</th>
                <th className="p-3">Titulo del post</th>
                <th className="p-3">Categoría</th>
                <th className="p-3">Eliminar</th>
                <th className="p-3"><span>Editar</span></th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post) => (
                <tr key={post._id} className="hover:bg-[#1D1D03] hover:text-white font-semibold text-[#1D1D03] border-2 border-[#1D1D03] bg-[#F7F5E8]">
                  <td className="text-center border-[#1D1D03] border-r-2 border-b-2">{new Date(post.updatedAt).toLocaleDateString()}</td>
                  <td className="border-[#1D1D03] border-r-2 border-b-2">
                    <Link to={`/posts/${post.slug}`}>
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-24 h-12 object-cover mx-auto p-1"
                      />
                    </Link>
                  </td>
                  <td className="pl-6 pr-6 border-[#1D1D03] border-r-2 border-b-2 w-screen">
                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                  </td>
                  <td className="text-center border-[#1D1D03] border-r-2 border-b-2">
                    {post.category}
                  </td>
                  <td className="text-center border-[#1D1D03] border-r-2 border-b-2 text-red-500 hover:underline cursor-pointer">
                    <span onClick={() => {
                      setShowModal(true);
                      setPostIdToDelete(post._id);
                    }}>Eliminar</span>
                  </td>
                  <td className="text-center border-[#1D1D03] border-r-2 border-b-2 text-teal-500 hover:underline cursor-pointer">
                    <Link to={`/update-post/${post._id}`}>
                      Editar
                    </Link>
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
        <p>No hay posts aun</p>
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
              ¿Estás seguro/a de que quieres eliminar este post?
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
                onClick={handleDeletePost}
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
