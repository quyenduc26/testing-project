import background from '@/assets/images/ClientBackground.png';
import logo from '@/assets/images/OU-logo-2.png';
import avt_default from '@/assets/images/blank-avt.jpg';
import { PROFILE, PROFILE_PATH, USER } from '@/constants';
import { UserResponse } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { FaCommentDots } from 'react-icons/fa6';
import { IoMdPersonAdd } from 'react-icons/io';
import { IoHome } from 'react-icons/io5';
import { TiThList } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import ClientSidebar from './ClientSidebar';
import Search from './Search';

function Navbar() {
  const iconClasses = 'px-4 pt-2 pb-2 sm:px-2 rounded-lg hover:main-gradient-color';
  const [isSideBarVisible, setIsSideBarVisible] = useState(true);

  const toggleSideBar = () => {
    setIsSideBarVisible((prevState) => !prevState);
  };

  interface CachedData {
    data: {
      user: UserResponse;
    };
  }
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData<CachedData>([PROFILE]);
  const userData = queryClient.getQueryData([USER]);
  console.log(userData);
  const userId = userData?.data.data.id;
  const userAvatar = userData?.data.data.avatar;

  return (
    <div
      className="grid grid-cols-8 sm:grid sm:grid-cols-6 p-3 sm:p-1"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <div className="col-span-2 sm:col-span-1 w-full text-center flex justify-start">
        <Link to="/home" className="flex items-center">
          <img alt="profil" src={logo} className="h-16 sm:h-12 rounded-full" />
          <span className="main-gradient-color text-2xl sm:hidden p-2 font-extrabold text-transparent bg-clip-text text-nowrap">
            Open Universe
          </span>
        </Link>
      </div>
      <div className="col-span-4 sm:col-span-3 flex justify-center w-full">
        <Search />
      </div>
      <div className="col-span-2 sm:col-span-2 relative">
        <div className="flex h-full justify-end">
          <nav className="flex items-center justify-center gap-5 sm:gap-3 p-2 text-white">
            <Link to={`${PROFILE_PATH}/${userId}`} className="sm:hidden">
              <img
                src={userAvatar ? userAvatar : avt_default}
                alt="Avatar"
                className="h-12 w-12 bg-none rounded-full"
              />
            </Link>
            <Link to="#" className={`${iconClasses} sm:hidden`}>
              <IoMdPersonAdd style={{ fontSize: '1.5rem' }} />
            </Link>
            <Link to="#" className={`${iconClasses} sm:hidden`}>
              <FaCommentDots style={{ fontSize: '1.5rem' }} />
            </Link>
            <button className={iconClasses}>
              <FaBell style={{ fontSize: '1.5rem' }} />
            </button>
            <Link to="/home" className="hidden sm:inline">
              <IoHome style={{ fontSize: '1.5rem' }} />
            </Link>
            <button className="hidden sm:inline" onClick={toggleSideBar}>
              <TiThList style={{ fontSize: '1.5rem' }} />
            </button>
          </nav>
        </div>
      </div>
      <div
        className={`col-span-8 relative  w-full h-screen hidden sm:${isSideBarVisible === true ? '' : 'block'}`}>
        <ClientSidebar userId={userId} />
      </div>
    </div>
  );
}

export default Navbar;
