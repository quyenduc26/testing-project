// import Logo from '@/assets/images/OU-logo-2.png';
// import Background from '@/assets/images/exam-bgr-user.jpg';
import { getLikes } from '@/api/like.api';
import { getUserPosts } from '@/api/posts.api';
import { CONTACT, LIKES, PROFILE, USERPOSTS } from '@/constants';
import { PostClientResponse, UserResponse } from '@/types';
import { LikeResponse } from '@/types/Like';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { FaLocationDot } from 'react-icons/fa6';
import { IoMdFemale } from 'react-icons/io';
import { RiHomeHeartFill } from 'react-icons/ri';
import Post from './Post';
import ProfileFriends from './ProfileFriend';
import StatusBar from './StatusBar';

const friendData = [];

function BottomProfile() {
  const [visibleFriends, setVisibleFriends] = useState(9);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      if (width < 800) {
        setVisibleFriends(6);
      } else {
        setVisibleFriends(9);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [width]);
  interface CachedData {
    data: {
      user: UserResponse;
    };
  }
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData<CachedData>([PROFILE]);
  const contact = queryClient.getQueryData([CONTACT]);
  const friend = contact?.data?.data;

  const userId = profile?.data.user.id;
  const queryPost = userId ? () => getUserPosts(userId) : () => {};

  const { data: postData } = useQuery({
    queryKey: [USERPOSTS],
    queryFn: queryPost,
  });

  const { data: listLike, isLoading: likeLoading } = useQuery({
    queryKey: [LIKES],
    queryFn: getLikes,
  });

  const posts: PostClientResponse[] = postData?.data?.post || [];
  const likes = listLike?.data?.listLike;

  const postRender = () => {
    return posts.map((post: PostClientResponse, index: number) => {
      let isLike = false;
      let sumLike = 0;
      const userId = parseInt(post.user_id);

      if (!likeLoading) {
        likes.forEach((like: LikeResponse) => {
          if (like.post_id == post.id) {
            sumLike++;
            if (like.user_id == userId) {
              isLike = true;
            }
          }
        });
      }
      return <Post key={index} post={post} like={sumLike} isLike={isLike} userId={userId} />;
    });
  };

  return (
    <div className="flex flex-row gap-4 sm:flex-col">
      <div className="w-1/3 sm:w-full">
        <div className="background-item text-white p-2 text-sm sm:text-sm sm:flex-row items-center">
          <p className="p-2">Bio</p>
          <center>
            <div className="p-6">
              {profile?.data.user.bio && profile?.data.user.bio !== '' ? (
                <p>{profile?.data.user.bio}</p>
              ) : (
                'Create your biography to let them know you more'
              )}
            </div>
            <hr className="w-11/12 p-2" />
          </center>
          <div className="p-2">
            <p className="flex items-center">
              {profile?.data.user.address &&
              profile.data.user.address.length > 0 &&
              profile.data.user.address[0].city &&
              profile.data.user.address[0].city !== '' ? (
                <>
                  <RiHomeHeartFill className="mr-2 text-lg" />
                  <span>
                    Live in <b>{profile?.data.user.address[0].city}</b>
                  </span>
                </>
              ) : (
                ''
              )}
            </p>
            <p className="flex items-center">
              {profile?.data.user.address &&
              profile.data.user.address.length > 0 &&
              profile.data.user.address[0].country &&
              profile.data.user.address[0].country !== '' ? (
                <>
                  <FaLocationDot className="mr-2" />
                  <span>
                    From <b>{profile?.data.user.address[0].country}</b>
                  </span>
                </>
              ) : (
                ''
              )}
            </p>
            <p className="flex items-center">
              <IoMdFemale className="mr-2" />
              <span>{`${profile?.data.user.gender == '0' ? 'Male' : 'Female'}`}</span>
            </p>
            <p className="flex items-center">
              {profile?.data.user.ins && profile?.data.user.ins !== '' ? (
                <>
                  <BsInstagram className="mr-2" />
                  <span>{profile.data.user.ins}</span>
                </>
              ) : (
                ''
              )}
            </p>
          </div>
        </div>
        <ProfileFriends friends={friend} visibleFriends={visibleFriends} />
      </div>
      <div className="w-2/3 sm:w-full sm:mt-0 items-center">
        <div className="background-item  p-2 text-md">
          <StatusBar />
          {postRender()}
        </div>
      </div>
    </div>
  );
}

export default BottomProfile;
