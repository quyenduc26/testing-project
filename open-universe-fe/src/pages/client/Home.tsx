import { getLikes } from '@/api/like.api.ts';
import { getPosts } from '@/api/posts.api.ts';
import ClientSidebar from '@/components/ClientSidebar.tsx';
import Contact from '@/components/Contact.tsx';
import Post from '@/components/Post.tsx';
import StatusBar from '@/components/StatusBar.tsx';
import { LIKES, POSTS, USER } from '@/constants/queryKeys.ts';
import { LikeResponse } from '@/types/Like.ts';
import { PostClientResponse } from '@/types/index.ts';
import { useQuery, useQueryClient } from '@tanstack/react-query';

function Home() {
  const { data: listLike, isLoading: likeLoading } = useQuery({
    queryKey: [LIKES],
    queryFn: getLikes,
  });

  const queryClient = useQueryClient();
  const cachedData: any = queryClient.getQueryData([USER]);
  const userId = cachedData.data.data.id;
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [POSTS],
    queryFn: getPosts,
  });

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const posts = data?.data?.posts;
  console.log(posts);
  const likes = listLike?.data?.listLike;

  const postRender = () => {
    return posts.map((post: PostClientResponse, index: number) => {
      let isLike = false;
      let sumLike = 0;

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
    <div className="grid grid-cols-8 gap-5">
      <div className="col-span-2 sm:hidden me-5">
        <ClientSidebar userId={userId} />
      </div>
      <div className={`col-span-4 sm:col-span-8 ${isLoading ? 'animate-pulse' : ''} z-10`}>
        <StatusBar />
        {postRender()}
      </div>
      <div className="col-span-2 sm:hidden ms-5 z-0">
        <Contact />
      </div>
    </div>
  );
}

export { Home };
