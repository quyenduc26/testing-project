import { ADMIN_PATH, HOME_PATH, SIGNIN_PATH } from '@/constants';
import { SignInPayload, SignUpPayload } from '@/types';
import request from '@/utils/request';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { NavigateFunction } from 'react-router-dom';

export const postSignIn = async (data: SignInPayload, navigate: NavigateFunction) => {
  await request({
    method: 'post',
    url: '/signin',
    data,
    onSuccess: () => {
      const accessToken = Cookies.get('access_token');
      if (accessToken) {
        const decodedToken = jwtDecode<any>(accessToken);
        if (decodedToken && decodedToken.role === 'user') {
          navigate(HOME_PATH, { state: { userId: decodedToken.sub } });
        } else {
          navigate(ADMIN_PATH);
        }
      } else {
        alert('The server does not return the token!!!');
      }
    },
    onError: (error) => {
      alert('Error in sign in');
      console.log('error in sign in', error);
    },
  });
};

export const postSignUp = async (data: SignUpPayload, navigate: NavigateFunction) => {
  await request({
    method: 'post',
    url: '/signup',
    data,
    onSuccess: () => {
      navigate(SIGNIN_PATH);
    },
    onError: (error) => {
      console.log('error in sign up', error);
    },
  });
};

export const logout = async (navigate: NavigateFunction) => {
  await request({
    method: 'get',
    url: '/logout',
    onSuccess: () => {
      navigate(SIGNIN_PATH);
    },
    onError: (error) => {
      console.log('error in log out', error);
    },
  });
};

export const refreshToken = async () => {
  await request({
    method: 'get',
    url: '/refreshtoken',
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
