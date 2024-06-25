// import React from 'react'
// import { Footer } from 'flowbite-react'

import { Link } from "react-router-dom";

export default function FooterComponent() {
  return (
    <footer className="bg-[#1D1D03] text-white">
        <div className="">
            {/* REDES */}
         
            <div className="grid lg:grid-cols-3 gap-3  sm:grid-cols-3 sm:gap-6 pt-5">
                <div>
                <Link to='/about'>
                <h4 className="text-center text-lg font-semibold mb-2">Nosotros</h4>
                <p className="text-center">Equipo</p>
                </Link>

                <div>
                    <h4 className="text-center text-lg font-semibold pt-5">Social</h4>
                <div className="pt-1 ">
                    <div className="flex mb-5 justify-center">
            <a href="https://www.instagram.com/cafeytinta.ediciones/"><img src="../../images/instagram_contorno_blanco.png" alt="Instagram" className="w-14 p-2"/></a>
            <a href="https://www.instagram.com/cafeytinta.ediciones/"><img src="../../images/instagram_contorno_blanco.png" alt="Instagram" className="w-14 p-2"/></a>
            <a href="https://www.instagram.com/cafeytinta.ediciones/"><img src="../../images/instagram_contorno_blanco.png" alt="Instagram" className="w-14 p-2"/></a>
            </div>
            </div>  

            </div>
                </div>
                <div>
                    <h4 className="text-lg  pl-2 font-semibold  flex justify-center mb-2 ">Servicios</h4>
                    <div className="flex gap-20 justify-center">

                    <div className="pl-2 ">
                    <p className="mt-2 mb-1">Servicio 1</p>
                    <p className="mt-2 mb-1">Servicio 2</p>
                    <p className="mt-2 mb-1">Servicio 3</p>
                    <p className="mt-2 mb-1">Servicio 4</p>
                    </div>
                    <div>
                    <p className="mt-2 mb-1">Servicio 5</p>
                    <p className="mt-2 mb-1">Servicio 6</p>
                    <p className="mt-2 mb-1">Servicio 7</p>
                    <p className="mt-2 mb-1">Servicio 8</p>
                    </div>
                    </div>
                </div>

                <div className="justify-center sm: mb-5 md:pr-1">
                    <h4 className="text-center text-lg font-semibold mb-5">Horarios de atención</h4>
                    <p className="text-center">Lunes a Viernes: <span className="ml-2">9 a 12 | 16 a 20</span> </p>
                    <p className="text-center">Sabado: <span className="ml-2">9 a 12</span> </p>
                </div>
            </div>
            {/* DERECHOS */}
        <div className="text-center border-t-2 border-t-[#F7F5E8] p-5">Café y tinta - Todos los derechos reservados</div>
        </div>
        
    </footer>
  )
}
