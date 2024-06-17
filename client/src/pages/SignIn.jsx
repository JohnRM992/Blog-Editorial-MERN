import { Alert, Label, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import "../custom.css"
import { useDispatch , useSelector } from 'react-redux';
import { signInStart , signInSuccess ,signInFailure } from '../redux/user/userSlice';


export default function SignIn() {
  const [formData, setFormData] = useState({});
  // const[errorMessage , setErrorMessage] = useState(null);
  // const[loading, setLoading] = useState (false);
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if( !formData.email || !formData.password){
          return dispatch(signInFailure('Debes llenar todos los campos'))
      }
    try {
     dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false){
          dispatch(signInFailure(data.message))
      }
        
        if(res.ok){
          dispatch(signInSuccess(data))
          navigate('/')
        }
    
    } catch (error) {
        dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen  pt-40'>
      <div className="flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left side */}
        <div className='flex-1'>
          <img className="sm:w-full md:w-96 lg:w-full" src="../../images/cafeytinta_black2.png" alt="" />
          <p className='mb-2 text-center text-lg font-semibold'>Inicio de sesión</p>
        </div>

        {/* right side */}
        <div className="flex-1 lg:mr-5 h-full">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
         

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
                'Login'
              )}
            </button>
          </form>

          <div className="text-lg flex gap-2 mt-5">
            <span>¿No tienes una cuenta?</span>
            <Link to="/sign-up" className="text-blue-500 ml-1" >
           Registrarse
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}
