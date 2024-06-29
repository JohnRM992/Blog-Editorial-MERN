import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(true);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = comments.length;

    try {
      const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
      const data = await res.json();

      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (res.ok) {
        setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <table className="shadow-md text-white bg-[#1D1D03] rounded-lg">
            <thead>
              <tr>
                <th className="p-3">Fecha de actualización</th>
                <th className="p-3">Comentario</th>
                <th className="p-3">Likes</th>
                <th className="p-3">PostId</th>
                <th className="p-3">UserId</th>
                <th className="p-3">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment._id} className="hover:bg-[#1D1D03] hover:text-white font-semibold text-[#1D1D03] border-2 border-[#1D1D03] bg-[#F7F5E8]">
                  <td className="text-center border-[#1D1D03] border-r-2 border-b-2">{new Date(comment.updatedAt).toLocaleDateString()}</td>
                  <td className="border-[#1D1D03] border-r-2 border-b-2 p-2">
                    {comment.content}
                  </td>
                  <td className="text-center border-[#1D1D03] border-r-2 border-b-2 w-28">
                    {comment.numberOfLikes}
                  </td>
                  <td className="p-2 text-center border-[#1D1D03] border-r-2 border-b-2">
                    {comment.postId}
                  </td>
                  <td className="p-2 text-center border-[#1D1D03] border-r-2 border-b-2">
                    {comment.userId}
                  </td>
                  <td className="text-center border-[#1D1D03] border-r-2 border-b-2 text-red-500 hover:underline cursor-pointer">
                    <span onClick={() => {
                      setShowModal(true);
                      setCommentIdToDelete(comment._id);
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
        <p>No hay comentarios aun</p>
      )}

      <Modal
        className="w-96 h-72 rounded-md mx-auto my-auto"
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header className="bg-[#F7F5E8] rounded-t-md border-2 border-t-2 border-black shadow-md" />
        <Modal.Body className="h-64 rounded-b-md border-l-2 border-r-2 border-b-2 border-black bg-[#F7F5E8] shadow-md">
          <div className="text-center">
            <HiOutlineExclamationCircle className="mt-3 h-14 w-14 text-[#1D1D03] mb-4 mx-auto" />
            <h3 className="mb-3 text-lg text-[#1D1D03]">
              ¿Estás seguro/a de que quieres eliminar este comentario?
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
                onClick={handleDeleteComment}
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
