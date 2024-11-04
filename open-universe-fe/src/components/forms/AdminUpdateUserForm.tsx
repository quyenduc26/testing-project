import { updateUser } from '@/api/users.api';
import { UserAdminUpdatePayload } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

function AdminUpdateUserForm({
  user,
  onClose,
}: {
  user: UserAdminUpdatePayload | null;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (body: UserAdminUpdatePayload) => updateUser(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['USERS'] });
    },
  });
  const { register, handleSubmit } = useForm<UserAdminUpdatePayload>();
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    onClose(false);
  });
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="hidden" {...register('id')} defaultValue={user?.id} className="hidden" />
      </div>
      <div className="flex items-center mb-5">
        <label
          htmlFor="status"
          className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
          Status
        </label>
        <select
          {...register('status')}
          defaultValue={user?.status}
          className="flex-1 py-2 border-b-2 border-gray-400 focus:border-purple-400 text-gray-600 placeholder-gray-400 outline-none">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="flex items-center mb-5">
        <label htmlFor="role" className="inline-block w-20 mr-6 text-right font-bold text-gray-600">
          Role
        </label>
        <select
          {...register('role')}
          defaultValue={user?.role}
          className="flex-1 py-2 border-b-2 border-gray-400 focus:border-purple-400 text-gray-600 placeholder-gray-400 outline-none">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      <div className="flex sm:flex-col justify-around">
        <button
          type="submit"
          className="bg-blue-500 text-white px-10 py-2 rounded-lg hover:bg-blue-700">
          Accept
        </button>
        <button
          className="text-white gap-2 bg-red-500 px-10 py-2 rounded-lg hover:bg-red-700"
          onClick={() => onClose(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AdminUpdateUserForm;
