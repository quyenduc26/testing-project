import { FaWpexplorer } from 'react-icons/fa';
import { GiGalaxy } from 'react-icons/gi';
// import { IoIosHome } from 'react-icons/io';
import { logout } from '@/api/auth.api';
import {
  EXPLORE_PATH,
  HOME_PATH,
  INTRO_PATH,
  MESSAGE_PATH,
  PROFILE_PATH,
} from '@/constants/routes';
import { AiOutlineHome } from 'react-icons/ai';
import { TbBrandHipchat, TbLogout2, TbUniverse } from 'react-icons/tb';
import { NavLink, useNavigate } from 'react-router-dom';
interface ClientSidebarProps {
  userId: string;
}
function ClientSidebar({ userId }: ClientSidebarProps) {
  const handleLogout = () => {
    logout(navigate);
  };
  const navigate = useNavigate();

  return (
    <>
      <aside className=" pb-3 px-6 sm:px-1 justify-between p-3  z-20  sticky top-[96px] w-full sm:bg-slate-600 h-auto sm:h-screen">
        <div>
          <ul className="space-y-4 tracking-wide">
            <li>
              <NavLink
                to={HOME_PATH}
                aria-label="dashboard"
                className="relative px-4 py-2 flex items-center space-x-4 text-white rounded-full hover:main-gradient-color flex-shrink-0 ">
                <AiOutlineHome className="size-7 flex-shrink-0 " />
                <span className="-mr-1 font-medium text-nowrap">Home page</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${PROFILE_PATH}/${userId}`}
                className="px-4 py-2 flex items-center space-x-4 rounded-full text-white hover:main-gradient-color ">
                <TbUniverse className="size-7 flex-shrink-0 " />
                <span className="text-nowrap">Your Page</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={MESSAGE_PATH}
                className="px-4 py-2 flex items-center space-x-4 rounded-full text-white hover:main-gradient-color ">
                <TbBrandHipchat className="size-7 flex-shrink-0 " />
                <span className="text-nowrap">Messenger</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={EXPLORE_PATH}
                className="px-4 py-2 flex items-center space-x-4 rounded-full text-white hover:main-gradient-color ">
                <FaWpexplorer className="size-7 flex-shrink-0 " />
                <span className="text-nowrap">Explore</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={INTRO_PATH}
                className="px-4 py-2 flex items-center space-x-4 rounded-full text-white hover:main-gradient-color ">
                <GiGalaxy className="size-7 flex-shrink-0 " />
                <span className="text-nowrap">About OpenU</span>
              </NavLink>
            </li>
            <hr />
            <li>
              <NavLink
                onClick={() => handleLogout()}
                to="/home"
                className="px-4 py-2 flex items-center space-x-4 rounded-full text-white hover:main-gradient-color hover:text-black hover:font-bold">
                <TbLogout2 className="size-7 flex-shrink-0 " />
                <span className="text-nowrap">Log out</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
      <img
        alt="Astronaut flying in space"
        className="max-w-[16rem] animate-[bounce_5s_ease-in-out_infinite] md:max-w-[17rem] z-10"
        height="708"
        loading="eager"
        src="https://typescript.tv/_astro/spaceman.CXPyFvBI_2vD2t8.webp"
        width="557"
        decoding="async"
        data-astro-cid-czq56ff4=""></img>
    </>
  );
}

export default ClientSidebar;
