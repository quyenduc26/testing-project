import { postComment } from '@/api/comment.api';
import { CommentPayload } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoCloseCircleOutline, IoSend } from 'react-icons/io5';
import UploadImage from '../UploadImage';
import { createCommentSchema } from './schema/commentSchema';

function CreateCommentForm({
  userId,
  postId,
  refetch,
}: {
  userId: number;
  postId: number;
  refetch: () => void;
}) {
  const mutation = useMutation({ mutationFn: (body: CommentPayload) => postComment(body) });
  const { register, handleSubmit, reset, setValue } = useForm<CommentPayload>({
    resolver: yupResolver(createCommentSchema),
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data, {
      onSuccess: async () => {
        setImageUrl('');
        reset();
        refetch();
      },
    });
  });

  const [imageUrl, setImageUrl] = useState('');

  const updateimgUrlField = (url: string) => {
    setImageUrl(url);
    setValue('mediaUrl', url);
  };

  const handleImageUpload = (url: string) => {
    updateimgUrlField(url);
  };

  return (
    <div>
      <div className="chatForm flex gap-2 w-full items-center py-2 ms-1.5 h-auto">
        <div className="relative size-8 w-[3%] sm:w-[5%] sm:ml-4 text-blue-500">
          <UploadImage onImageUpload={handleImageUpload} />
        </div>
        <div className="messageInput w-full sm:w-[90%] bg-slate-100 rounded-lg me-4">
          <div className="ml-5">
            {!imageUrl ? (
              ''
            ) : (
              <div className="mt-5 w-[170px] h-[95px] flex relative">
                <img
                  className="w-full h-auto rounded-lg object-cover"
                  src={imageUrl}
                  alt="Attached media"
                />
                <button onClick={() => updateimgUrlField('')} className="absolute top-1 right-1">
                  <IoCloseCircleOutline className="text-red-600" />
                </button>
              </div>
            )}
          </div>
          <form className="flex w-full items-center p-1 justify-between" onSubmit={onSubmit}>
            <input type="hidden" {...register('userId')} value={userId} />
            <input type="hidden" {...register('postId')} value={postId} />
            <input type="hidden" {...register('mediaUrl')} />
            <input
              className="bg-transparent w-full outline-none text-sm sm:text-xs p-2 px-4 "
              placeholder="Text comment..."
              type="text"
              {...register('content')}
            />
            <button className="w-[5%] text-black flex justify-center">
              <IoSend className="size-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateCommentForm;
