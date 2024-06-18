import { Alert, Label, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import "../custom.css"
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const[errorMessage , setErrorMessage] = useState(null);
  const[loading, setLoading] = useState (false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if(!formData.username || !formData.email || !formData.password){
          return setErrorMessage('Por favor rellena todos los campos')
      }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false){
          return setErrorMessage(data.message)
      }
        setLoading(false);
        if(res.ok){
          navigate('/sign-in')
        }
      console.log(data); // Maneja la respuesta del servidor aquí
    } catch (error) {
        setLoading(false);
    }
  };

  return (
    <div className='min-h-screen  pt-40'>
      <div className="flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side */}
        <div className='flex-1'>
          <img className="sm:w-full md:w-96 lg:w-96" src="../../images/cafeytinta_black2.png" alt="" />
          <p className='mb-2 text-center text-lg font-semibold'>Formulario de registro</p>
        </div>

        {/* right side */}
        <div className="flex-1 lg:mr-5 h-96">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username" value="Usuario" className='pl-2 text-lg font-semibold' />
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className='rounded-lg w-full border-2 border-[#1D1D03] focus-within:border-2 focus-within:border-[#A0C4FF]'
                
              />
            </div>

            <div>
              <Label htmlFor="email" value="Correo" className='pl-2 text-lg font-semibold' />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className='rounded-lg w-full border-2 border-[#1D1D03] focus-within:border-2 focus-within:border-[#A0C4FF]'
                
              />
            </div>

            <div>
              <Label htmlFor="password" value="Contraseña" className='pl-2 text-lg font-semibold' />
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className='rounded-lg w-full border-2 border-[#1D1D03] focus-within:border-2 focus-within:border-[#A0C4FF]'
                
              />
            </div>

            <button
              type="submit"
              className='mt-5 rounded-lg h-10 text-white bg-[#1D1D03] text-lg font-semibold transition-all duration-300 hover:bg-black hover:text-white' 
              disabled={loading}>
              {loading ? (
                <>
                <Spinner size='sm' />
                <span className='pl-3'>Cargando...</span>
                </>
              ): (
                'Registrarse'
              )}
            </button>
            <OAuth />
          </form>

          <div className="text-lg  font-medium text-center mt-5">
            <span>¿Tienes una cuenta?</span>
            <Link to="/sign-in" className="text-blue-500 ml-1" >
           Login
            </Link>
          </div>
          {
            errorMessage && (
              <p className="text-red-600 font-medium pl-3 pt-3">
              *{errorMessage}
            </p>
            )
          }
        </div>
      </div>
    </div>
  );
}
