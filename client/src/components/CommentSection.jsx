
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CommentSection({ postId }) {
    const { currentUser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
   const [commentError, setCommentError] = useState(null);
    const maxLength = 200;

    const handleChange = (e) => {
        if (e.target.value.length <= maxLength) {
            setComment(e.target.value);
        }
    };

    const charCountColor = comment.length === maxLength ? 'text-red-500' : 'text-gray-500';


    const handleSubmitComment = async (e) => {
        e.preventDefault();

        if(comment.length > 200) {
            return;
        }

        try{

            const res = await fetch('/api/comment/create' , {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
    
                },
                body: JSON.stringify({content: comment, postId , userId: currentUser._id}),
    
            });
    
            const data = await res.json();
            if(res.ok){
                setComment('');
                setCommentError(null)
            }

        }catch(error){
                setCommentError(error.message)
        }

      

    }
    return (
        <div className='max-w-2xl mx-auto w-full p-3'>
            {currentUser ? (
                <div className='pl-5 flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p>Iniciaste sesión como:</p>
                    <img
                        src={currentUser.profilePicture}
                        alt=""
                        className='h-8 w-8 object-cover rounded-full'
                    />
                    <Link to={'/dashboard?tab=profile'} className='font-semibold hover:text-[#1D1D03] hover:underline'>
                        @{currentUser.username}
                    </Link>
                </div>
            ) : (
                <div className='my-5 flex gap-2'>
                    Debes iniciar sesión para comentar.
                    <Link to={'/sign-in'} className='font-semibold hover:underline'>
                        Login
                    </Link>
                </div>
            )}
            {currentUser && (
                <form 
                onSubmit={handleSubmitComment}
                className='border-2 border-[#1D1D03] rounded-md p-3 shadow-md'>
                    <textarea
                        value={comment}
                        onChange={handleChange}
                        placeholder="Comentar..."
                        className='rounded-lg w-full h-24 border border-[#1D1D03] focus-within:border-2 focus-within:border-[#A0C4FF]'
                    ></textarea>
                    <div className='flex items-center mt-5 justify-between ml-3 mr-3'>
                    <div className={`text-right text-sm ${charCountColor}`}>{comment.length}/{maxLength} caracteres</div>
                    <button type="submit" className='transition-all duration-300 hover:bg-black ml-2 w-20 h-10 bg-[#1D1D03] rounded-md text-white'>Enviar</button>
                    </div>

                    {commentError && (
                            <p className="text-red-600 font-medium pl-3 pt-3">
                        {commentError}</p>
                    )}
                    
                </form>
                
            )}
        </div>
    );
}