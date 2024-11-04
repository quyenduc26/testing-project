import { getComments } from '@/api/comment.api';
import { deleteLike, postLike } from '@/api/like.api';
import blankAvt from '@/assets/images/blank-avt.jpg';
import { COMMENTS, PROFILE_PATH } from '@/constants';
import { CommentClientResponse, PostClientResponse } from '@/types';
import { calculateTimeDifference } from '@/utils/transformTime';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { FaRegCommentDots } from 'react-icons/fa';
import { FaHeartPulse } from 'react-icons/fa6';
import { IoIosShareAlt } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import MediaViewModal from './MediaModal';
import CreateCommentForm from './forms/CreateCommentForm';

const commentRender = (comments: CommentClientResponse[]) =>
  comments.map((comment: CommentClientResponse) => (
    <Comment
      key={comment.id}
      id={comment.id}
      user={comment.user}
      content={comment.content}
      mediaUrl={comment.mediaUrl}
      createAt={comment.createAt}
    />
  ));

const sharedClasses = {
  textXs: 'text-xs',
  textSm: 'text-sm',
  mobileTextXs: 'sm:text-xs',
  mobileTextSm: 'sm:text-sm',
  textBase: 'text-base',
  textZinc900: 'text-zinc-900',
  textZinc100: 'text-zinc-100',
  textZinc500: 'text-zinc-500',
  textZinc400: 'text-zinc-500',
};

function Post({
  post,
  like,
  isLike,
  userId,
}: {
  post: PostClientResponse;
  like: number;
  isLike: boolean;
  userId: number;
}) {
  const { user, createAt, content, media_url, comments: initComment, id } = post;
  const [isShowInputBar, setIsShowInputBar] = useState(false);
  const [colorLike, setColorLike] = useState(isLike);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //show modal media handle
  const handlePictureClick = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const queryClient = useQueryClient();

  const postId = typeof id === 'string' ? parseInt(id) : id;

  const [comments, setComments] = useState(initComment);

  const { refetch } = useQuery({
    queryKey: [COMMENTS, id],
    queryFn: () => getComments(id),
    enabled: false,
  });

  const handleGetAllComments = async () => {
    await refetch();
    const cachedData: any = queryClient.getQueryData([COMMENTS, id]);
    setComments(cachedData.data?.data || []);
  };

  const handleLike = async () => {
    if (colorLike === true) {
      setColorLike(false);
      await deleteLike(id, userId, queryClient);
    } else {
      setColorLike(true);
      await postLike({ user_id: userId, post_id: postId }, queryClient);
    }
  };

  const toggleShowInputBar = () => {
    setIsShowInputBar((prevState) => !prevState);
  };
  return (
    <div className="max-w-full mx-3 sm:mx-2 px-2 sm:px-0 pt-2 sm:pt-1 pb-1 mt-4 bg-purple-100 bg-opacity-10 shadow rounded-lg">
      <div className="flex items-center p-4 sm:p-2 sm:pt-1">
        <Link to={`${PROFILE_PATH}/${user.id}`}>
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={user.avatar || blankAvt}
            alt="User avatar"
          />
        </Link>

        <div className="ml-3">
          <p
            className={`${sharedClasses.textBase} ${sharedClasses.textZinc100}  font-extrabold sm:font-bold`}>
            {user.userName}
          </p>
          <p
            className={`${sharedClasses.textSm} ${sharedClasses.textZinc500} ${sharedClasses.mobileTextXs} font-medium `}>
            {calculateTimeDifference(createAt)}
          </p>
        </div>
      </div>
      {media_url ? (
        <div className="px-4 sm:px-3">
          <p
            className={`${sharedClasses.textBase} ${sharedClasses.textZinc100} ${sharedClasses.mobileTextSm} font-thin`}>
            {content}
          </p>
          <button className="w-full" onClick={handlePictureClick}>
            <img
              className="w-full h-[500px] mt-2 p-1 rounded-lg object-contain bg-slate-50"
              src={media_url}
              alt="Post image"
            />
            {isModalOpen && <MediaViewModal mediaUrl={media_url} closefunc={closeModal} />}
          </button>
        </div>
      ) : (
        <div className="px-4 sm:px-3 pb-1 space-y-2">
          <p className="text-3xl sm:text:xl  font-thin text-white">{content}</p>
          <hr className="px-5" />
        </div>
      )}
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:hidden">
          <span
            className={`${sharedClasses.textBase} ${sharedClasses.textZinc500} ${sharedClasses.textZinc400}`}>
            {like} Likes
          </span>

          <span
            className={`${sharedClasses.textBase} ${sharedClasses.textZinc500} ${sharedClasses.textZinc400}`}>
            {post.commentCount} Comments
          </span>
        </div>
        <div className="flex items-center gap-7 sm:w-full sm:justify-between">
          <button
            className="flex items-center text-zinc-500 dark:text-zinc-400"
            onClick={handleLike}>
            <FaHeartPulse className="size-6" style={{ color: colorLike ? 'red' : '' }} />
            <span className="ml-1 text-base sm:text-xs">
              <span className="hidden sm:inline pe-1">{like}</span>Like
            </span>
          </button>
          <button className="flex items-center text-zinc-500 dark:text-zinc-400">
            <span className="flex gap-1 items-center" onClick={toggleShowInputBar}>
              <FaRegCommentDots className=" sm:text-[1.2rem] text-[1.4rem]" />
              <span className="ml-1 text-base sm:text-xs">
                <span className="hidden sm:inline pe-1"> {post.commentCount}</span> Comment
              </span>
            </span>
          </button>
          <button className="flex items-center text-zinc-500 dark:text-zinc-400">
            <IoIosShareAlt className="size-6" />
            <span className="ml-1 text-base sm:text-xs">Share</span>
          </button>
        </div>
      </div>
      <div className="px-4 space-y-2">
        {comments.length < post.commentCount && (
          <button className="font-bold text-zinc-400" onClick={handleGetAllComments}>
            View all
          </button>
        )}
        {commentRender(comments)}
        {isShowInputBar && (
          <CreateCommentForm userId={userId} postId={id} refetch={handleGetAllComments} />
        )}
      </div>
    </div>
  );
}

export default Post;
