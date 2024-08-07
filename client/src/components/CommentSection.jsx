import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import {Modal} from 'flowbite-react'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
export default function CommentSection({ postId }) {
  
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal , setShowModal] = useState(false);
  const [commentToDelete , setCommentToDelete] = useState(null);
  const navigate = useNavigate();
  const maxLength = 200;

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setComment(e.target.value);
    }
  };

  const charCountColor =
    comment.length === maxLength ? "text-red-500" : "text-gray-500";

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (comment.length > 200) {
      return;
    }

    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostsComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }

      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async(commentId) => {
    setShowModal(false);
      try {
          if(!currentUser){
            navigate('/sign-in');
            return
          }

          const res = await fetch(`/api/comment/deleteComment/${commentId}`,{
              method: 'DELETE',
          });
            if(res.ok){
              const data = await res.json();
             
          setComments(comments.filter((comment) => comment._id !== commentId))
               
            }
      }catch(error){
        console.log(error);
      }
  }

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="pl-5 flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Iniciaste sesión como:</p>
          <img
            src={currentUser.profilePicture}
            alt=""
            className="h-8 w-8 object-cover rounded-full"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="font-semibold hover:text-[#1D1D03] hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="my-5 flex gap-2">
          Debes iniciar sesión para comentar.
          <Link to={"/sign-in"} className="font-semibold hover:underline">
            Login
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmitComment}
          className="border-2 border-[#1D1D03] rounded-md p-3 shadow-md"
        >
          <textarea
            value={comment}
            onChange={handleChange}
            placeholder="Comentar..."
            className="rounded-lg w-full h-24 border border-[#1D1D03] focus-within:border-2 focus-within:border-[#A0C4FF]"
          ></textarea>
          <div className="flex items-center mt-5 justify-between ml-3 mr-3">
            <div className={`text-right text-sm ${charCountColor}`}>
              {comment.length}/{maxLength} caracteres
            </div>
            <button
              type="submit"
              className="transition-all duration-300 hover:bg-black ml-2 w-20 h-10 bg-[#1D1D03] rounded-md text-white"
            >
              Enviar
            </button>
          </div>

          {commentError && (
            <p className="text-red-600 font-medium pl-3 pt-3">{commentError}</p>
          )}
        </form>
      )}

      {comments.length === 0 ? (
        <p className="font-semibold my-5">No hay comentarios aun</p>
      ) : (
        <>
          <div className="my-5 flex items-center gap-1">
            <p className="pl-3">Comentarios</p>
            <div className="border border-[#1D1D03] py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>

          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) =>{
                setShowModal(true)
                setCommentToDelete(commentId)

              } }
            />
          ))}
        </>
      )}

<Modal
        className="w-96 h-full rounded-md mx-auto my-auto "
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header className=" bg-[#F7F5E8] rounded-t-md border-2 border-t-2 border-black shadow-md" />
        <Modal.Body className="h-64 rounded-b-md border-l-2 border-r-2 border-b-2 border-black bg-[#F7F5E8] shadow-md">
          <div className="text-center">
            <HiOutlineExclamationCircle className="mt-3 h-14 w-14 text-[#1D1D03] mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-[#1D1D03]">
              ¿Estás seguro/a de que quieres eliminar tu comentario?
            </h3>
            <div className="mb-5">
              <button
                className="rounded-md w-20 h-10 text-[#1D1D03] bg-gray-300 text-lg font-semibold transition-all duration-300 hover:bg-gray-500 hover:text-white "
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="ml-5  rounded-md w-20 h-10 text-[#1D1D03] bg-red-500 text-lg font-semibold transition-all duration-300 hover:bg-red-700 hover:text-white"
                onClick={() => handleDelete(commentToDelete)}
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
