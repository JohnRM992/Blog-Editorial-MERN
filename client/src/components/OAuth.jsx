import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';

export default function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });

        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            
            const res = await fetch('/api/auth/google' , {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
            });

            // Verificar si la respuesta es exitosa
            if (res.ok) {
                const data = await res.json();
                dispatch(signInSuccess(data));
                navigate('/');
            } 
            
        } catch (error) {
            console.error('Error al inciar sesión con Google:', error);
        }
    };

    return (
        <button type="button" className='rounded-lg border-2 h-10 border-[#1D1D03]' onClick={handleGoogleClick}>
            <div className='flex justify-center'>
                <AiFillGoogleCircle className='w-6 h-6' />
                <p>Iniciar sesión con Google</p>
            </div>
        </button>
    );
}
