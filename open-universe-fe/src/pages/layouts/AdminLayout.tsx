import AdminHeader from '@/components/AdminHeader';
import AdminSidebar from '@/components/AdminSidebar';
import { TitleContextProvider } from '@/context/AdminTitleContext';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <>
      <TitleContextProvider>
        <AdminHeader />
        <hr className="bg-slate-300 h-1" />
        <div className="grid grid-cols-6">
          <div className="col-span-1">
            <AdminSidebar />
          </div>
          <div className="col-span-5 ml-10">
            <Outlet />
          </div>
        </div>
      </TitleContextProvider>
    </>
  );
}

export default AdminLayout;
