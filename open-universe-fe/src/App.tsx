import {
  ADMIN_COMMENTS_PATH,
  ADMIN_PATH,
  ADMIN_POSTS_PATH,
  ADMIN_USERS_PATH,
  EXPLORE_PATH,
  FRIEND_PATH,
  HOME_PATH,
  INTRO_PATH,
  MESSAGE_PATH,
  PROFILE_PATH,
  SIGNIN_PATH,
  SIGNUP_PATH,
} from '@/constants/index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import BottomProfile from './components/BottomProfile.tsx';
import FriendList from './components/FriendList.tsx';
import SecretClientRoute from './components/SecretClientRoute.tsx';
import { ClientProfileContextProvider } from './context/ClientProfileContext.tsx';
import ErrorPage from './pages/Error.tsx';
import CommentList from './pages/admin/CommentList.tsx';
import PostList from './pages/admin/PostList.tsx';
import UserList from './pages/admin/UserList.tsx';
import Demo from './pages/client/Demo.tsx';
import Explore from './pages/client/Explore.tsx';
import { Home } from './pages/client/Home.tsx';
import Message from './pages/client/Message.tsx';
import Profile from './pages/client/Profile.tsx';
import SignIn from './pages/client/SignIn.tsx';
import SignUp from './pages/client/SignUp.tsx';
import AdminLayout from './pages/layouts/AdminLayout.tsx';
import ClientLayout from './pages/layouts/ClientLayout.tsx';
import IntroLayout from './pages/layouts/IntroLayout.tsx';
import SignIn_SignUpLayout from './pages/layouts/SignIn_SignUpLayout.tsx';
import './styles/main.css';

const router = createBrowserRouter([
  {
    path: INTRO_PATH,
    element: <IntroLayout />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <SignIn_SignUpLayout />,
    children: [
      {
        path: SIGNIN_PATH,
        element: <SignIn />,
      },
      {
        path: SIGNUP_PATH,
        element: <SignUp />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <SecretClientRoute>
        <ClientLayout />
      </SecretClientRoute>
    ),
    children: [
      {
        path: HOME_PATH,
        element: <Home />,
      },
      {
        path: `${PROFILE_PATH}/:userId`,
        element: (
          <ClientProfileContextProvider>
            <Profile />{' '}
          </ClientProfileContextProvider>
        ),
        children: [
          {
            path: '',
            element: <BottomProfile />,
          },
          {
            path: FRIEND_PATH,
            element: <FriendList />,
          },
        ],
      },
      {
        path: EXPLORE_PATH,
        element: <Explore />,
      },
      {
        path: MESSAGE_PATH,
        element: <Message />,
      },
    ],
  },
  {
    path: ADMIN_PATH,
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <UserList />,
      },
      {
        path: ADMIN_USERS_PATH,
        element: <UserList />,
      },
      {
        path: ADMIN_POSTS_PATH,
        element: <PostList />,
      },
      {
        path: ADMIN_COMMENTS_PATH,
        element: <CommentList />,
      },
    ],
  },
  {
    path: 'demo',
    element: <Demo />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
