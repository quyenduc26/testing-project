import background from '@/assets/images/ClientBackground.png';
import Navbar from '@/components/NavbarClient';
import { SearchProvider } from '@/context/ClientSearchContext';
import { Outlet } from 'react-router-dom';

function ClientLayout() {
  return (
    <SearchProvider>
      <div
        className="flex flex-col h-full bg-fixed"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <div className="fixed w-full z-10 h-[100px] sm:h-[52px]">
          <Navbar />
        </div>
        <div className="pt-[6%] sm:pt-[56px] flex-1">
          <Outlet />
        </div>
      </div>
    </SearchProvider>
  );
}

export default ClientLayout;
