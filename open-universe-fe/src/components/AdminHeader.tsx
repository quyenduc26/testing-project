import catAvt from '@/assets/images/astronaut-cat.jpeg';
import { TitleContext } from '@/context/AdminTitleContext';
import { useContext } from 'react';
import { IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function AdminHeader() {
  const { title } = useContext(TitleContext);
  return (
    <div className="grid grid-cols-6 m-5">
      <div className="p-5 col-span-1">
        <Link to="/home" className="flex items-center">
          <img alt="profil" src={catAvt} className="avatar-img" />
          <span className="main-gradient-color text-2xl font-extrabold text-transparent bg-clip-text">
            Open Universe
          </span>
        </Link>
      </div>
      <span className="text-4xl col-span-1 m-auto capitalize">{title}</span>
      <div className="flex items-center w-full ms-24 col-span-3">
        <IoSearch className="relative left-8 z-20 w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block" />
        <input
          type="text"
          className="block pl-10 pr-4 leading-loose border border-stone-500 w-3/4 rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
          placeholder="Search"
        />
      </div>
      <div className="col-span-1">
        <div className="p-4">
          <div className="flex-row gap-4 flex justify-center items-center">
            <div className="flex-shrink-0">
              <a href="#" className="relative block">
                <img alt="profil" src={catAvt} className="avatar-img" />
              </a>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium">Admin</span>
              <span className="text-xs text-gray-400">Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
