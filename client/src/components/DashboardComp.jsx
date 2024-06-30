import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { HiArrowNarrowUp, HiOutlineAnnotation } from "react-icons/hi";
import { MdEditDocument } from "react-icons/md";
// import { HiOutlineUserGroup } from 'react-icons/hi';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments?limit=5`);
        const data = await res.json();

        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) fetchUsers();
    fetchPosts();
    fetchComments();
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md border-2 border-[#1D1D03]">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Usuarios</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <FaUsers className="bg-[#1D1D03] text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Ultimo mes</div>
          </div>
        </div>

        <div className="flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md border-2 border-[#1D1D03]">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Comentarios</h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiOutlineAnnotation className="bg-[#1D1D03] text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Ultimo mes</div>
          </div>
        </div>

        <div className="flex flex-col p-3 gap-4 md:w-72 w-full rounded-md shadow-md border-2 border-[#1D1D03]">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <MdEditDocument className="bg-[#1D1D03] text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Ultimo mes</div>
          </div>
        </div>
      </div>


        {/* Envuelve las 3 tablas */}
        <div className="flex flex-wrap gap-8 py-3 mx-auto justify-center">
                {/* Envuelve usuarios */}
                <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md border-2 border-[#1D1D03] mt-5">
                        <div className="flex justify-between p-3 text-sm font-semibold">
                            <h1 className="text-center p-2">Usuarios recientes</h1>
                            <button className="text-white bg-[#1D1D03] w-24 h-10 rounded-md hover:bg-black transition-all duration-300">
                                <Link to={'/dashboard?tab=users'}>
                                Ver todo
                                </Link>
                                </button>
                        </div>

                        <table className="bg-[#1D1D03] text-white">
                            <thead className="h-10">
                                <tr>
                                    <th>Imagen</th>
                                    <th>Usuario</th>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map((user) => (
                <tr key={user._id} className="hover:bg-[#1D1D03] hover:text-white font-semibold text-[#1D1D03] border-2 border-[#1D1D03] bg-[#F7F5E8]">
                  
                  <td className="border-[#1D1D03] border-r-2 border-b-2 p-2">
                    
                      <img 
                        src={user.profilePicture} 
                        alt={user.username}
                        className="border-2 border-[#1D1D03] rounded-full w-16 h-16 object-cover mx-auto m-1"
                      />
                    
                  </td>
                  {/* <td className="pl-6 pr-6 border-[#1D1D03] border-r-2 border-b-2 w-96"> */}
                  <td className="text-center p-3">
                    {user.username}
                  </td>
                 
                </tr>
              ))}
                            </tbody>
                        </table>
                </div>
                {/* Envuelve comentarios */}
                <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md border-2 border-[#1D1D03] mt-5">
                        <div className="flex justify-between p-3 text-sm font-semibold">
                            <h1 className="text-center p-2">Comentarios recientes</h1>
                            <button className="text-white bg-[#1D1D03] w-24 h-10 rounded-md hover:bg-black transition-all duration-300">
                                <Link to={'/dashboard?tab=comments'}>
                                Ver todo
                                </Link>
                                </button>
                        </div>

                        <table className="bg-[#1D1D03] text-white">
                            <thead className="h-10">
                                <tr>
                                    <th>Comentario</th>
                                    <th>Likes</th>
                                </tr>
                            </thead>
                            <tbody>
                            {comments.map((comment) => (
                <tr key={comment._id} className="hover:bg-[#1D1D03] hover:text-white font-semibold text-[#1D1D03] border-2 border-[#1D1D03] bg-[#F7F5E8]">
                  
                  <td className="border-[#1D1D03] border-r-2 border-b-2 w-96">
                    
                              <p className="line-clamp-2 p-2">{comment.content}</p>
                  </td>
                  {/* <td className="pl-6 pr-6 border-[#1D1D03] border-r-2 border-b-2 w-96"> */}
                  <td className="text-center">
                    {comment.numberOfLikes}
                  </td>
                 
                </tr>
              ))}
                            </tbody>
                        </table>
                </div>
                {/* Envuelve posts */}
                <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md border-2 border-[#1D1D03] mt-5">
                        <div className="flex justify-between p-3 text-sm font-semibold">
                            <h1 className="text-center p-2">Posts recientes</h1>
                            <button className="text-white bg-[#1D1D03] w-24 h-10 rounded-md hover:bg-black transition-all duration-300">
                                <Link to={'/dashboard?tab=users'}>
                                Ver todo
                                </Link>
                                </button>
                        </div>

                        <table className="bg-[#1D1D03] text-white">
                            <thead className="h-10">
                                <tr>
                                    <th>Imagen</th>
                                    <th>Titulo</th>
                                    <th>Categoría</th>
                                </tr>
                            </thead>
                            <tbody>
                            {posts.map((post) => (
                <tr key={post._id} className="hover:bg-[#1D1D03] hover:text-white font-semibold text-[#1D1D03] border-2 border-[#1D1D03] bg-[#F7F5E8]">
                  
                  <td className="border-[#1D1D03] border-r-2 border-b-2 p-2">
                    
                      <img 
                        src={post.image} 
                        alt='post'
                        className=" rounded-md w-14 h-10 object-cover mx-auto m-1"
                      />
                    
                  </td>
                  {/* <td className="pl-6 pr-6 border-[#1D1D03] border-r-2 border-b-2 w-96"> */}
                  <td className="text-center p-3 w-96">
                    {post.title}
                  </td>
                  <td className="text-center p-3 w-5">
                    {post.category}
                  </td>
                 
                </tr>
              ))}
                            </tbody>
                        </table>
                </div>
        </div>

    </div>
  );
}
