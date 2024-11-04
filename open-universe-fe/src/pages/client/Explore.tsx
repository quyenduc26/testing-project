import { getLikes } from '@/api/like.api.ts';
import { getPosts } from '@/api/posts.api';
import ClientSidebar from '@/components/ClientSidebar';
import Contact from '@/components/Contact';
import Post from '@/components/Post';
import Slider from '@/components/Slider';
import { LIKES, POSTS, searchType } from '@/constants';
import { useSearch } from '@/context/ClientSearchContext';
import { PostClientResponse } from '@/types';
import { LikeResponse } from '@/types/Like.ts';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

function Explore() {
  const { state, setSearchTerm } = useSearch();
  const [activeButtons, setActiveButtons] = useState<string[]>([]);

  useEffect(() => {
    const searchParams = getSearchParams(activeButtons);
    setSearchTerm(state.key, ...searchParams);
  }, [state.key, activeButtons]);

  const handleButtonClick = (buttonName: string) => {
    const updatedButtons = activeButtons.includes(buttonName)
      ? activeButtons.filter((name) => name !== buttonName)
      : [...activeButtons, buttonName];

    setActiveButtons(updatedButtons);
  };

  const getSearchParams = (buttons: string[]): [string?, string?, string?] => {
    const searchTypeMap: Record<string, searchType> = {
      Post: searchType.POST,
      Friend: searchType.FRIENDS,
      User: searchType.USER,
    };

    const searchParams: [string?, string?, string?] = ['', '', ''];

    buttons.forEach((buttonName) => {
      const type = searchTypeMap[buttonName];
      if (type === searchType.USER) searchParams[0] = type;
      if (type === searchType.POST) searchParams[1] = type;
      if (type === searchType.FRIENDS) searchParams[2] = type;
    });

    return searchParams;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [POSTS],
    queryFn: getPosts,
  });

  const {
    data: listLike,
    isLoading: likeLoading,
    isError: likeError,
    error: errorItem,
  } = useQuery({
    queryKey: [LIKES],
    queryFn: getLikes,
  });

  const likes = listLike?.data?.listLike;
  const accessToken = Cookies.get('access_token');
  const decodedToken = accessToken ? jwtDecode<any>(accessToken) : null;
  const userID = decodedToken?.sub;

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const posts = state.result.posts?.length > 0 ? state.result.posts : data?.data?.posts || [];

  const postRender = () => {
    const requestPlaceIndex = Math.floor((posts.length * 1) / 3);
    const mayKnowPlaceIndex = Math.floor((posts.length * 2) / 3);

    return posts.map((post: PostClientResponse, index: number) => {
      const sumLike = likes.filter((like: LikeResponse) => like.post_id === post.id).length;
      const isLike = likes.some(
        (like: LikeResponse) => like.post_id === post.id && like.user_id === userID,
      );

      const postComponent = (
        <Post key={post.id} post={post} like={sumLike} isLike={isLike} userId={userID} />
      );

      if (index === requestPlaceIndex || index === mayKnowPlaceIndex) {
        return <>{postComponent}</>;
      }

      return postComponent;
    });
  };

  return (
    <div className="grid grid-cols-8 gap-5">
      <div className="col-span-2 sm:hidden me-5">
        <ClientSidebar userId={userID} />
      </div>
      <div className={`col-span-4 sm:col-span-8 ${isLoading ? 'animate-pulse' : ''} `}>
        <div className="flex items-center space-x-4 p-4">
          <span className="font-semibold text-slate-300">Filter</span>
          {['Post', 'User', 'Friend'].map((buttonName) => (
            <button
              key={buttonName}
              className={`rounded-full px-4 py-2 transition-colors hover:main-gradient-color hover:text-slate-200 ${activeButtons.includes(buttonName) ? 'bg-rose-700 text-slate-200' : 'bg-zinc-200'}`}
              onClick={() => handleButtonClick(buttonName)}>
              {buttonName}
            </button>
          ))}
        </div>
        {state.result.friends.length > 0 && (
          <Slider cardData={state.result.friends} isRequest={true} />
        )}
        {state.result.users.length > 0 && (
          <Slider cardData={state.result.users} isRequest={false} />
        )}
        {postRender()}
      </div>
      <div className="col-span-2 sm:hidden ms-5">
        <Contact />
      </div>
    </div>
  );
}

export default Explore;
