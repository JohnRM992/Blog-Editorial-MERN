import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, signInWithPopup , getAuth} from 'firebase/auth';
import { app } from '../firebase';

export default function OAuth() {
    const handleGoogleClick = async () =>{
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt: 'select_account'})

        try{

            const resultsFromGoogle = await signInWithPopup(auth,provider)
            const res = await('/api/auth/google', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                })

            })

        }catch(error){
            console.log(error);
        }
    }

  return (
    <button type="button" className='rounded-lg border-2 h-10 border-[#1D1D03]' onClick={handleGoogleClick}>
        <div className='flex justify-center'>
        <AiFillGoogleCircle className='w-6 h-6' />
        <p>Iniciar sesión con Google</p>
        </div>
    </button>
  )
}
