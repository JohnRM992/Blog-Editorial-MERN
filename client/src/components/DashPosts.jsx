import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const  [showMore , setShowMore ] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if(data.posts.length < 9 ){
            setShowMore(false)
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id, currentUser.isAdmin]); // Añadir currentUser.isAdmin como dependencia


  const handleShowMore = async ( ) => {
      const startIndex = userPosts.length;

      try{
          const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
          const data = await res.json();


          if(res.ok){
            // MANTENER LOS POSTS ANTERIORES
            setUserPosts((prev) => [...prev, ...data.posts]);
            if(data.posts.length < 9 ){
              setShowMore(false);
            }
          }
      }catch(error){
        console.log(error);
      }
  } 

  return (
    <div className=" table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300" >
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <table className=" shadow-md   text-white bg-[#1D1D03] rounded-lg h-48">
            <thead>
              <tr >
                <th className="p-3">Fecha de actualización</th>
                <th className="p-3">Imagen del post</th>
                <th className="p-3">Titulo del post</th>
                <th className="p-3">Categoría</th>
                <th className="p-3">Eliminar</th>
                <th className="p-3"><span>Editar</span></th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post) => (
                <tr key={post._id} className="hover:bg-[#1D1D03] hover:text-white  font-semibold text-[#1D1D03] border-2 border-[#1D1D03] bg-[#F7F5E8]">
                  <td className="text-center border-[#1D1D03] border-r-2 border-b-2 ">{new Date(post.updatedAt).toLocaleDateString()}</td>
                  <td className=" border-[#1D1D03] border-r-2 border-b-2 ">
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
                    <span>Eliminar</span>
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
    </div>
  );
}
