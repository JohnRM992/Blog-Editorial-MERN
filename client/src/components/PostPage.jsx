import { Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentSection from './CommentSection';
import PostCard from './PostCard';

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }

        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="p-3 flex flex-col  mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>

      <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
        <button className="mb-5 font-semibold h-10 w-16 border-2 border-[#1D1D03] rounded-full">
          {post && post.category}
        </button>
      </Link>

        <div className='max-w-6xl mx-auto'>

      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-5 p-3 max-h-[600px] w-full object-cover shadow-md"
      />
      <div className="flex justify-between pt-3 pl-5 pr-5 border-b border-slate-300">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} min de lectura
        </span>
      </div>

      <div
        className="mt-7 p-7 text-justify mx-auto w-full post-content border-l border-r border-slate-300"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      <CommentSection postId={post._id} />

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Artículos recientes</h1>

        </div>

      </div>
      <div className="flex flex-wrap gap-5 mt-5 justify-center mb-5">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />
           
          )}
        </div>
    </main>
  );
}
