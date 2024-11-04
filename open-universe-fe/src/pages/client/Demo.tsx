import background from '@/assets/images/ClientBackground.png';
import ClientSidebar from '@/components/ClientSidebar';
import CustomizationModal from '@/components/CustomizationModal';
import FriendList from '@/components/FriendList';
import { useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';

function Demo() {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
      <div className="grid grid-cols-12">
        <div className="col-span-12 m-3">
          <FriendList />
        </div>
        <div className="col-span-2">
          <div className="font-bold">Client sidebar:</div>
          <div>
            <ClientSidebar />
          </div>
        </div>
        <div className="col-span-2">
          <div className="font-bold">Client sidebar:</div>
          <div>
            <ClientSidebar />
          </div>
        </div>
      </div>
      <CustomizationModal isShow={isShow} title="create modal" onClose={() => setIsShow(false)} />
      <CustomizationModal isShow={true}>
        <div className={'bg-white rounded-lg p-6 shadow-lg'}>
          <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4">
            <h2 className="text-2xl font-semibold">heloo</h2>
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setIsShow(false)}>
              <TiDeleteOutline className="size-7" />
            </button>
          </div>
          <div className="mt-6 space-y-4">
            <p className="text-lg text-gray-600">{}</p>
            <div className="flex sm:flex-col">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={() => setIsShow(false)}>
                Accept
              </button>
              <button
                onClick={() => setIsShow(false)}
                className="text-white gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </CustomizationModal>
    </div>
  );
}

export default Demo;
