import { postSignIn } from '@/api/auth.api';
import { SIGNUP_PATH } from '@/constants/index';
import { SignInPayload } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { signin } from '../schema/signin';
import SocialIcon from './SocialIcon';

export default function SignInInput() {
  const navigate = useNavigate();
  const mutation = useMutation({ mutationFn: (body: SignInPayload) => postSignIn(body, navigate) });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInPayload>({ resolver: yupResolver(signin) });
  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return (
    <>
      <form className="space-y-4" action="POST" onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            {...register('username')}
            className="bg-transparent border border-slate-200 text-white sm:text-sm rounded-md w-full p-2.5 mb-3"
            placeholder="User name"
          />
          <p className="text-red-600">{errors.username?.message}</p>
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
        <a href="#" className="text-sm font-medium text-white flex justify-end">
          Forgot password ?
        </a>
        <button
          type="submit"
          className="text-base font-medium text-white flex w-full justify-center items-center rounded-md h-12 border border-slate-200 bg-gradient-to-b from-violet to-light-blue hover:scale-105 ease-in-out duration-700">
          Sign in
        </button>
        <div className="flex items-center justify-between">
          <div className="w-44 border-white border"></div>
          <p className="text-white text-xl font-semibold">or</p>
          <div className="w-44 border-white border"></div>
        </div>
        <SocialIcon />
        <p className="flex items-center justify-center text-white text-lg">
          Don’t have an account yet?
          <NavLink
            to={SIGNUP_PATH}
            className="font-medium text-primary-600 hover:underline text-white text-lg">
            Sign up
          </NavLink>
        </p>
      </form>
    </>
  );
}
