import { logout } from '@/api/auth.api';
import { ADMIN_COMMENTS_PATH, ADMIN_POSTS_PATH, ADMIN_USERS_PATH } from '@/constants/index';
import { TitleContext } from '@/context/AdminTitleContext';
import { useContext } from 'react';
import { BsFillPostcardHeartFill } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import { MdInsertComment } from 'react-icons/md';
import { TbLogout2 } from 'react-icons/tb';
import { NavLink, useNavigate } from 'react-router-dom';

function AdminSidebar() {
  const { title } = useContext(TitleContext);
  const navigate = useNavigate();
  return (
    <div className="h-screen ml-4 border-r-4 border-slate-300">
      <div className="h-full">
        <nav className="mt-6">
          <NavLink
            to={ADMIN_USERS_PATH}
            className={`flex items-center justify-start p-4 my-2 text-gray-500 uppercase hover:sidebar-item-hover ${title === 'users' ? 'sidebar-item-hover' : ''}`}>
            <FaUsers className="size-7" />
            <span className="mx-4 text-sm font-normal">Users</span>
          </NavLink>
          <NavLink
            className={`flex items-center justify-start p-4 my-2 text-gray-500 uppercase hover:sidebar-item-hover ${title === 'posts' ? 'sidebar-item-hover' : ''}`}
            to={ADMIN_POSTS_PATH}>
            <BsFillPostcardHeartFill className="size-7" />
            <span className="mx-4 text-sm font-normal">Posts</span>
          </NavLink>
          <NavLink
            className={`flex items-center justify-start p-4 my-2 text-gray-500 uppercase hover:sidebar-item-hover ${title === 'comments' ? 'sidebar-item-hover' : ''}`}
            to={ADMIN_COMMENTS_PATH}>
            <MdInsertComment className="size-7" />
            <span className="mx-4 text-sm font-normal">Comments</span>
          </NavLink>
          <NavLink
            className="flex items-center justify-start p-4 my-2 text-gray-500 uppercase hover:text-red-500 hover:border-r-4 hover:border-red-500 hover:bg-gradient-to-r from-purple-100 to-red-300"
            to="#"
            onClick={() => logout(navigate)}>
            <TbLogout2 className="size-7" />
            <span className="mx-4 text-sm font-normal">Logout</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default AdminSidebar;
