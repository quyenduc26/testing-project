import { updatePost } from '@/api/posts.api';
import { POSTS } from '@/constants';
import { PostAdminUpdatePayload } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import UploadImage from '../UploadImage';

function AdminUpdateUserForm({
  post,
  onClose,
}: {
  post: PostAdminUpdatePayload | null;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [imageUrl, setImageUrl] = useState(post?.media_url || '');

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (body: PostAdminUpdatePayload) => updatePost(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS] });
    },
  });

  const { register, handleSubmit, setValue } = useForm<PostAdminUpdatePayload>();

  useEffect(() => {
    if (imageUrl) {
      setValue('media_url', imageUrl);
    }
  }, [imageUrl, setValue]);

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({ ...data, media_url: imageUrl });
    onClose(false);
  });

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div>
        <input type="hidden" {...register('id')} defaultValue={post?.id} className="hidden" />
        <input
          type="hidden"
          {...register('media_url')}
          defaultValue={imageUrl}
          className="hidden"
        />
      </div>

      <div className="mb-5 relative">
        <label htmlFor="current_media" className="block font-bold text-gray-600 mb-2">
          Current Media
        </label>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Current Media"
            className="w-full h-[300px] py-2 border-b-2 border-gray-400 object-cover"
          />
        )}
        <UploadImage onImageUpload={handleImageUpload} />
      </div>

      <div className="flex items-center mb-5 w-full">
        <label
          htmlFor="content"
          className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
          Content
        </label>
        <textarea
          {...register('content')}
          defaultValue={post?.content}
          className="flex-1 w-[300px] py-2 border-b-2 border-gray-400 focus:border-purple-400 text-gray-600 placeholder-gray-400 outline-none"
        />
      </div>

      <div className="flex items-center mb-5">
        <label
          htmlFor="status"
          className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
          Status
        </label>
        <select
          {...register('status')}
          defaultValue={post?.status}
          className="flex-1 py-2 border-b-2 border-gray-400 focus:border-purple-400 text-gray-600 placeholder-gray-400 outline-none">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="flex sm:flex-col justify-around">
        <button
          type="submit"
          className="bg-blue-500 text-white px-10 py-2 rounded-lg hover:bg-blue-700">
          Accept
        </button>
        <button
          type="button"
          className="text-white gap-2 bg-red-500 px-10 py-2 rounded-lg hover:bg-red-700"
          onClick={() => onClose(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AdminUpdateUserForm;
