import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';

export const MenuMobile = () => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <button onClick={toggle}>
        <div className='sm:flex lg:hidden'>
          <GiHamburgerMenu className='h-16 w-10 text-[#F7F5E8]' />
        </div>
      </button>
      <Menu open={open}>
        <button
          aria-label="Close"
          className="absolute top-3 right-3 text-5xl text-white cursor-pointer"
          onClick={toggle}
        >
          &times;
        </button>

        <MenuContainer>
          <Link to="/" onClick={toggle}>
            <MenuItem>
              <p className="bg-[#F7F5E8] text-black w-full h-10 active:text-black active:rounded-md">Inicio</p>
            </MenuItem>
          </Link>

          <Link to="/about" onClick={toggle}>
            <MenuItem>
              <p className="bg-[#F7F5E8] text-black w-full h-10 active:text-black active:rounded-md">Nosotros</p>
            </MenuItem>
          </Link>

          <MenuItem>
            <p className="bg-[#F7F5E8] text-black w-full h-10 active:text-black active:rounded-md">
              Servicios
            </p>
            <div className='flex justify-center mt-3'>
              <div>
                <p className='text-2xl'>Traducción</p>
                <p className='text-2xl mt-2'>Redacción</p>
                <p className='text-2xl mt-2'>Diseño gráfico</p>
                <p className='text-2xl mt-2'>Servicio 4</p>
                <p className='text-2xl mt-2'>Servicio 5</p>
              </div>
            </div>
          </MenuItem>
        </MenuContainer>
      </Menu>
    </>
  );
};

/* Logic */
const style = {
  container: `relative top-1/4 w-full text-center mt-8`,
  item: `text-3xl text-white cursor-pointer hover:text-white`,
  menu: {
    open: `h-full w-full `,
    close: `w-full h-0`,
    default: `overflow-x-hidden md:overflow-hidden transition-all duration-700 fixed z-10 top-0 left-0 bg-[#1D1D03]`,
  },
};

function Menu({ children, open }) {
  return (
    <div className={`${style.menu.default} ${open ? style.menu.open : style.menu.close}`}>
      {children}
    </div>
  );
}

function MenuContainer({ children }) {
  return <div className={style.container}>{children}</div>;
}

function MenuItem({ children, href }) {
  return (
    <div className="p-2">
      {href ? (
        <a href={href} className={style.item}>
          {children}
        </a>
      ) : (
        <div className={style.item}>{children}</div>
      )}
    </div>
  );
}

export default MenuMobile;
