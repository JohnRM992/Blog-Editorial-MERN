import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa el idioma español
import relativeTime from 'dayjs/plugin/relativeTime';
import { MdThumbUp } from "react-icons/md";
import {useSelector} from 'react-redux' ;

dayjs.extend(relativeTime); // Extiende dayjs con el plugin relativeTime
dayjs.locale('es'); // Establece el idioma a español

export default function Comment({ comment , onLike }) {
    const [user, setUser] = useState({});
    const {currentUser} = useSelector((state) => state.user)

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getUser();
    }, [comment]);

    return (
        <div className="flex items-center p-4 border-b">
            <div className="mr-3 flex-rhink-0">
                <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="h-12 w-12 object-cover rounded-full bg-gray-200"
                />
            </div>
            <div className="flex-1 ">
                <div className="flex items-center mb-2">
                    <span className="font-bold mr-2 text-sm truncate">
                        {user ? `@${user.username}` : "Usuario anónimo"}
                    </span>
                    <span className="text-gray-500 text-xs">
                        {dayjs(comment.createdAt).fromNow()}
                    </span>
                </div>
                <p className="text-sm pl-2 sm:text-base mb-2">{comment.content}</p>
                <div className='flex items-center pt-2 text-sm border-t max-w-fit gap-2'>
                    <button type="button" onClick={()=>onLike(comment._id)} 
                    className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id)
                        && '!text-blue-500'
                    }`}>
                    <MdThumbUp className='text-sm' />

                    </button>
                    <p className='text-gray-400'>
                        {
                            comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? 'like' : 'likes')
                        }
                    </p>
                </div>
            </div>
        </div>
    );
}
