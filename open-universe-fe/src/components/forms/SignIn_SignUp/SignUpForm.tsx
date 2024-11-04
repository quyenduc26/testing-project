import { postSignUp } from '@/api/auth.api';
import { SIGNIN_PATH } from '@/constants';
import { SignUpPayload } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { signup } from '../schema/signup';
import SocialIcon from './SocialIcon';

export default function SignUpInput() {
  const navigate = useNavigate();
  const mutation = useMutation({ mutationFn: (body: SignUpPayload) => postSignUp(body, navigate) });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpPayload>({ resolver: yupResolver(signup) });
  const onSubmit = handleSubmit((data) => mutation.mutate(data));
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = () => {
    alert('Agree with our terms and connditions');
  };

  return (
    <>
      <form className="space-y-4" action="POST" onSubmit={isChecked ? onSubmit : handleChecked}>
        <div>
          <input
            type="text"
            {...register('fullName')}
            className="bg-transparent border border-slate-200 text-white sm:text-sm rounded-md w-full p-2.5 mb-3"
            placeholder="Full name"
          />
          <p className="text-red-600">{errors.fullName?.message}</p>
        </div>
        <div>
          <input
            type="text"
            {...register('userName')}
            className="bg-transparent border border-slate-200 text-white sm:text-sm rounded-md w-full p-2.5 mb-3"
            placeholder="User name"
          />
          <p className="text-red-600">{errors.userName?.message}</p>
        </div>
        <div>
          <input
            type="password"
            {...register('password')}
            className="bg-transparent border border-slate-200 text-white sm:text-sm rounded-md w-full p-2.5 mb-3"
            placeholder="Password"
          />
          <p className="text-red-600">{errors.password?.message}</p>
        </div>
        <div>
          <input
            type="email"
            {...register('email')}
            className="bg-transparent border border-slate-200 text-white sm:text-sm rounded-md w-full p-2.5 mb-3"
            placeholder="Email"
          />
          <p className="text-red-600">{errors.email?.message}</p>
        </div>
        <div className="flex items-center mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            onChange={() => setIsChecked(!isChecked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="ms-2 text-sm font-medium text-white">
            Agree with our terms and connditions
          </label>
        </div>
        <button
          type="submit"
          className="text-base font-medium text-white flex w-full justify-center items-center rounded-md h-12 border border-slate-200 bg-gradient-to-b from-violet to-light-blue hover:scale-105 ease-in-out duration-700">
          Sign up
        </button>
        <div className="flex items-center justify-between">
          <div className="w-44 border-white border"></div>
          <p className="text-white text-xl font-semibold">or</p>
          <div className="w-44 border-white border"></div>
        </div>
        <SocialIcon />
        <p className="flex items-center justify-center text-white text-lg">
          Already have an account?
          <NavLink
            to={SIGNIN_PATH}
            className="font-medium text-primary-600 hover:underline text-white text-lg">
            Sign in
          </NavLink>
        </p>
      </form>
    </>
  );
}
