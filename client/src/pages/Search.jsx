import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard'
export default function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'sincategoria',
    });

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            });
        }
        const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`);
            if (!res.ok) {
                setLoading(false);
                return;
            }
            const data = await res.json();
            setPosts(data.posts);
            setLoading(false);
            if (data.posts.length === 9) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
        };
        fetchPosts();
    }, [location.search]);

    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setSidebarData({ ...sidebarData, searchTerm: e.target.value });
        }
        if (e.target.id === 'sort') {
            const order = e.target.value || 'desc';
            setSidebarData({ ...sidebarData, sort: order });
        }
        if (e.target.id === 'category') {
            const category = e.target.value || 'sincategoria';
            setSidebarData({ ...sidebarData, category });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        const searchQuery = urlParams.toString();

        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if(!res.ok){
            return;
        }
        if(res.ok){
            const data = await res.json();
            setPosts([...posts, ...data.posts]);
            if (data.posts.length === 9){
                setShowMore(true)
            }else{
                setShowMore(false);
            }
        }
    }

    return (
        <div className='flex flex-col md:flex-row'>
            <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className="flex items-center gap-2">
                        <label className='whitespace-nowrap font-semibold'>Busqueda:</label>
                        <input
                            type="text"
                            id="searchTerm"
                            className='rounded-md border-[#1D1D03] border-2 w-full'
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className='whitespace-nowrap font-semibold w-28'>Orden:</label>
                        <select
                            className='rounded-md border-2 border-[#1D1D03] w-full'
                            onChange={handleChange}
                            value={sidebarData.sort}
                            id='sort'>
                            <option value='desc'>Descendente</option>
                            <option value='asc'>Ascendente</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className='whitespace-nowrap font-semibold'>Categoría:</label>
                        <select
                            className='rounded-md border-2 border-[#1D1D03] '
                            onChange={handleChange}
                            value={sidebarData.category}
                            id='category'>
                            <option value='sincategoria'>Seleccionar una categoría</option>
                            <option value="noticias">Noticias</option>
                            <option value="resena">Reseña</option>
                            <option value="tecnologia">Tecnología</option>
                            <option value="salud">Salud</option>
                        </select>
                    </div>
                    <button type="submit" 
                            className='rounded-md w-full h-10 bg-[#1D1D03] text-white hover:bg-black transition-all duration-300'>Buscar</button>
                </form>
            </div>
                <div className='w-full'>
                    <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>Resultado de la busqueda</h1>
                    <div className='p-7 flex flex-wrap gap-4'>
                        {
                            !loading && posts.length === 0 && (<p className='text-xl text-gray-500 '>No se encontraron posts.</p>

                        )}
                        {
                            loading && (
                                <p className='text-xl text-gray-500'>Cargando...</p>
                            )
                        }
                        {
                            !loading && posts && posts.map((post) => (
                                <PostCard key={post._id} post={post}/>
                            ))}
                            {
                                showMore && <button 
                                                    onClick={handleShowMore}
                                                    className='w-full p-7 text-lg hover:underline'>Mostrar más</button>
                            }
                    </div>
                </div>
        </div>
    );
}
