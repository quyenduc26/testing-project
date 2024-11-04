import { postPost } from '@/api/posts.api';
import { POSTS, PROFILE } from '@/constants';
import { PostPayload, UserResponse } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoClose } from 'react-icons/io5';
import UploadImage from '../UploadImage';
import { creatPostSchema } from './schema/postSchema';

function CreatePostForm({ closeFunc }: { closeFunc: () => void }) {
  const [imageUrl, setImageUrl] = useState('');
  const [isPostCreated, setIsPostCreated] = useState(false); // Thêm state để theo dõi trạng thái post mới được tạo

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (body: PostPayload) => postPost(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POSTS] });
      setIsPostCreated(true); // Cập nhật trạng thái khi post mới được tạo thành công
    },
  });

  interface CachedData {
    data: {
      user: UserResponse;
    };
  }
  const profile = queryClient.getQueryData<CachedData>([PROFILE]);
  const userId = profile?.data.user.id;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostPayload>({ resolver: yupResolver(creatPostSchema) });

  useEffect(() => {
    if (imageUrl) {
      setValue('media_url', imageUrl);
    }
  }, [imageUrl, setValue]);

  // useEffect để theo dõi isPostCreated và render lại giao diện khi có post mới
  useEffect(() => {
    if (isPostCreated) {
      setIsPostCreated(false); // Reset trạng thái sau khi render lại
      // Thực hiện các hành động cần thiết để render lại giao diện
      // Ví dụ: reset form, hiển thị thông báo, v.v.
    }
  }, [isPostCreated]);

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    closeFunc();
  });

  return (
    <div className="p-3 w-full flex justify-center sm:items-center">
      <div className="mx-0 w-[500px] sm:w-[400px] bg-white rounded-md fixed sm-block top-24 sm:top-30 z-20  ">
        <div className="closeForm flex justify-between py-4 px-9 sm:px-5 gap-3">
          <p className="font-bold text-4xl sm:text-xl">CREATE YOUR POST</p>
          <button onClick={closeFunc}>
            <IoClose className="size-7" />
          </button>
        </div>
        <hr className="mx-9 sm:mx-5" />
        <form onSubmit={onSubmit} className="py-6 px-9 sm:px-5">
          <input type="hidden" {...register('user_id')} value={userId} />
          <input
            type="hidden"
            {...register('media_url')}
            defaultValue={imageUrl}
            className="hidden"
          />
          <div className="mb-4">
            <input
              {...register('content')}
              placeholder="What are you thinking..."
              className="w-full outline-none p-3 ps-0 text-base sm-text-sm "
            />
            <p className="text-red-600">{errors.content?.message}</p>
          </div>
          <div className="mb-5 relative">
            <label htmlFor="current_media" className="block font-bold text-gray-600 mb-2">
              Add for your post
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
          <div>
            <button
              className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              type="submit">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePostForm;
