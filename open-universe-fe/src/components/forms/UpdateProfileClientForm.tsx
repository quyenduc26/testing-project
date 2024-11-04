import { updateProfile } from '@/api/users.api';
import { PROFILE } from '@/constants';
import { UserClientUpdatePayload } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { updateProfileSchema } from '../forms/schema/updateProfileSchema';

const UpdateProfileClientForm = ({ onClose }: { onClose: () => void }) => {
  const mutation = useMutation({
    mutationFn: (body: UserClientUpdatePayload) => updateProfile(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROFILE] });
      onClose();
    },
  });

  interface CachedData {
    data: {
      user: UserClientUpdatePayload;
    };
  }
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData<CachedData>([PROFILE]);
  const user = profile?.data?.user;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserClientUpdatePayload>({
    resolver: yupResolver(updateProfileSchema),
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}>
      <div className="bg-white p-6 rounded-md shadow-md w-[800px]">
        <h2 className="text-2xl mb-4">Update Profile</h2>
        <form onSubmit={onSubmit}>
          <input type="hidden" {...register('id')} defaultValue={user ? user.id : ''} className='border' />
          <div className="flex justify-center">
            <img
              src={user?.avatar || 'default-avatar-url'}
              alt="Avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
            <input type="hidden" />
          </div>
          <div className="mb-4">
            <label className="text-start ps-2 block text-sm font-medium text-gray-700 capitalize">
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              placeholder="Enter fullname"
              className="mt-1 block w-full p-3 rounded-md border-gray-500 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register('fullName')}
              defaultValue={user ? user.fullName : ''}
            />
            {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="text-start ps-2 block text-sm font-medium text-gray-700 capitalize">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              className="mt-1 block w-full p-3 rounded-md border-gray-300  border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register('userName')}
              defaultValue={user ? user.userName : ''}
            />
            {errors.userName && <p className="text-red-500">{errors.userName.message}</p>}
          </div>

          <div className="mb-4">
            <label className="text-start ps-2 block text-sm font-medium text-gray-700 capitalize">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              className="mt-1 block w-full p-3 rounded-md border-gray-300  border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register('email')}
              defaultValue={user ? user.email : ''}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="text-start ps-2 block text-sm font-medium text-gray-700 capitalize">
              Phone number
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter phone number"
              className="mt-1 block w-full p-3 rounded-md border-gray-300  border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register('phoneNumber')}
              defaultValue={user ? user.phoneNumber : ''}
            />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-indigo-600 text-white rounded-md ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileClientForm;
