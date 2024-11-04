import { BsImages } from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';

function InputBar() {
  return (
    <div className="flex bg-opacity-10 shadow rounded-b-lg py-2 sm:py-1">
      <div className=" flex items-top justify-start space-x-2 sm:ps-0 pt-1 w-full">
        <div className="w-full space-y-1 bg-gray-100 pt-1 pb-2 rounded-xl ml-0">
          <div className="bg-transparent w-full">
            <input
              className=" h-8 w-full bg-transparent text-sm sm:text-xs text-gray-950 flex-grow outline-none px-3 sm:px-2 text-wrap block"
              type="text"
              placeholder="Write a comment..."
              name="content"
            />
          </div>
          <div className="flex gap-5 justify-between px-3 sm:px-2 m-0">
            <button className="">
              <BsImages className="text-black" style={{ fontSize: '1.2rem' }} />
            </button>
            <button className="">
              <IoSend className="text-black" style={{ fontSize: '1.2rem' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputBar;
