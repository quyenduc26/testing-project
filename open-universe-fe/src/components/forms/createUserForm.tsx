import { postUser } from '@/api/users.api';
import { Gender, UserRole } from '@/constants';
import { createUserPayload } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { QueryClient, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import UploadImage from '../UploadImage';
import { creatUserSchema } from './schema/userSchema';

function CreateUserForm({
  isShow,
  onClose,
  queryClient,
}: {
  isShow: boolean;
  onClose: () => void;
  queryClient: QueryClient;
}) {
  const [url, setUrl] = useState('');

  const mutation = useMutation({
    mutationFn: (body: createUserPayload) => postUser(body, queryClient, onClose),
    onSuccess: () => {
      reset();
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createUserPayload>({ resolver: yupResolver(creatUserSchema) });

  const onSubmit = handleSubmit((data) => mutation.mutate({ ...data, avatar: url }));

  const handleImageUpload = (url: string) => {
    setUrl(url);
  };

  return (
    <>
      {isShow && (
        <div className="fixed inset-0 flex items-center bg-black justify-center z-50 bg-opacity-50">
          <svg
            onClick={onClose}
            className="w-10 h-10 text-red-500 top-2 right-2 absolute cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <section className="bg-gray-50 dark:bg-gray-900 w-2/4 rounded-lg">
            <div className="flex flex-col items-center justify-center mx-auto">
              <div className="w-full bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4">
                  <h1 className="text-center text-3xl mb-5 font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                    Create a user
                  </h1>
                  <form className="space-y-4" onSubmit={onSubmit}>
                    <div className="flex">
                      <div className="w-6/12 me-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Full name
                        </label>
                        <input
                          {...register('fullName')}
                          type="text"
                          placeholder="Full name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <p className="text-red-600">{errors.fullName?.message}</p>
                      </div>
                      <div className="w-6/12">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          User name
                        </label>
                        <input
                          type="text"
                          {...register('userName')}
                          placeholder="User name"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <p className="text-red-600">{errors.userName?.message}</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-6/12 me-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Email
                        </label>
                        <input
                          type="email"
                          {...register('email')}
                          placeholder="Email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <p className="text-red-600">{errors.email?.message}</p>
                      </div>
                      <div className="w-6/12">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Phone number
                        </label>
                        <input
                          type="tel"
                          {...register('phoneNumber')}
                          placeholder="Phone number"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <p className="text-red-600">{errors.phoneNumber?.message}</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-6/12 me-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Date of birth
                        </label>
                        <input
                          type="date"
                          {...register('dateOfBirth')}
                          placeholder="Date of birth"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <p className="text-red-600">{errors.dateOfBirth?.message}</p>
                      </div>
                      <div className="w-6/12">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Password
                        </label>
                        <input
                          type="password"
                          {...register('password')}
                          placeholder="Password"
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <p className="text-red-600">{errors.password?.message}</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-6/12 me-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Gender
                        </label>
                        <select
                          {...register('gender')}
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value={Gender.MALE}>Male</option>
                          <option value={Gender.FEMALE}>Female</option>
                          <option value={Gender.OTHER}>Other</option>
                        </select>
                        <p className="text-red-600">{errors.gender?.message}</p>
                      </div>
                      <div className="w-6/12">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Role
                        </label>
                        <select
                          {...register('role')}
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value={UserRole.ADMIN}>Admin</option>
                          <option value={UserRole.USER}>User</option>
                        </select>
                        <p className="text-red-600">{errors.role?.message}</p>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="avatar"
                        className="block text-sm font-medium leading-6 text-gray-900">
                        Avatar photo
                      </label>
                      <div className="flex">
                        <div className="w-1/2 mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="mt-4 text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                              <UploadImage onImageUpload={handleImageUpload} />
                            </label>
                          </div>
                        </div>
                        <div className="w-1/2 flex justify-center" style={{ maxHeight: 200 }}>
                          <img src={url} className="w-1/2" />
                        </div>
                      </div>
                    </div>
                    <div className="flex text-center justify-center align-middle">
                      <button
                        type="submit"
                        className="w-2/5 bg-sky-600 hover:bg-sky-800 text-white rounded-lg h-9">
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default CreateUserForm;
