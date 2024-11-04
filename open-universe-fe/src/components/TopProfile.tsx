// src/components/TopProfile.js
import { PROFILE, USER } from '@/constants';
import { UserQueryResponse, UserResponse } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FaPencilAlt, FaUserPlus } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import avt_default from './../assets/images/avt-default.png';
import UploadImage from './UploadImage';
import UpdateProfileClientForm from './forms/UpdateProfileClientForm';

interface TopProfileProps {
  userId: string;
}

function TopProfile({ userId }: TopProfileProps) {
  const [isShowForm, setIsShowForm] = useState(false);
  const toggleForm = () => {
    setIsShowForm((prev) => !prev);
  };

  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.split('/');
  const [imageUrl, setImageUrl] = useState('');
  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  interface CachedData {
    data: {
      user: UserResponse;
    };
  }

  interface CachedUserData {
    data: {
      user: UserQueryResponse;
    };
  }

  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData<CachedData>([PROFILE]);
  const user = queryClient.getQueryData<CachedUserData>([USER]);

  return (
    <div className="background-item rounded-md p-3 mb-4 border-opacity-30 overflow-x-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative col-span-4 h-16 w-24 sm:h-15 sm:w-15">
            <img
              src={profile?.data.user.avatar ? profile?.data.user.avatar : avt_default}
              alt="Avatar User"
              className="relative rounded-full w-20 h-20 object-cover"
            />
            {userId == user?.data?.data.id && <UploadImage onImageUpload={handleImageUpload} />}
          </div>
          <div className="col-span-4 flex flex-col ml-4">
            <h1 className="name text-2xl sm:text-sm text-white" id="name">
              {profile?.data.user.fullName}
            </h1>
          </div>
        </div>
        {userId == user?.data?.data.id ? (
          <button
            className="main-gradient-color rounded-md px-4 sm:px-3 py-2 flex items-center"
            onClick={toggleForm}>
            <FaPencilAlt className="mr-2 text-white" />
            <p className="m-0 text-white sm:text-sm">Edit Profile</p>
            {isShowForm && <UpdateProfileClientForm onClose={toggleForm} />}
          </button>
        ) : (
          <button className="main-gradient-color rounded-md px-4 sm:px-3 py-2 flex items-center">
            <FaUserPlus className="mr-2 text-white" />
            <p className="m-0 text-white sm:text-sm">Add Friend</p>
          </button>
        )}
      </div>
      <center>
        <hr className="h-0.5 w-full bg-white/75 mt-5 mb-4 border-none" />
      </center>
      <div className="flex items-center content-center gap-6 pb-1 sm:text-sm">
        <Link
          to={`/profile/${userId}`}
          className={`h-10 w-20 text-white rounded-md ${pageName[3] == '' ? 'border-b border-white' : ''} hover:main-gradient-color flex items-center justify-center`}>
          Profile
        </Link>
        <Link
          to={`/profile/${userId}/friends`}
          className={`h-10 w-20 text-white rounded-md ${pageName[3] ? 'border-b border-white' : ''} hover:main-gradient-color flex items-center justify-center`}>
          Friends
        </Link>
      </div>
    </div>
  );
}

export default TopProfile;
