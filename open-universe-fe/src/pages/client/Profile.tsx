import { getProfile } from '@/api/users.api';
import TopProfile from '@/components/TopProfile';
import { PROFILE } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
const LoadingSkeleton = () => {
  return (
    <div
      role="status"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">
      <div className="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-48 mb-4"></div>
        <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5"></div>
        <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-600 max-w-[360px]"></div>
      </div>
    </div>
  );
};
function Profile() {
  const location = useLocation();
  const pathname = location.pathname;
  const pageName = pathname.split('/')[2];

  const { isFetched, refetch, data } = useQuery({
    queryKey: [PROFILE],
    queryFn: () => getProfile(pageName),
  });

  useEffect(() => {
    refetch();
  }, [pageName]);

  if (!isFetched) {
    return () => <LoadingSkeleton />;
  }

  return (
    <div className="px-40 sm:px-4">
      <TopProfile userId={pageName} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Profile;
