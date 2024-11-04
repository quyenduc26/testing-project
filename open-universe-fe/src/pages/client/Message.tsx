import background from '@/assets/images/ClientBackground.png';
import blankImg from '@/assets/images/blank-avt.jpg';
import Contact from '@/components/Contact';
import MessageItem from '@/components/MessageItem';
import Search from '@/components/Search';
import UploadImage from '@/components/UploadImage';
import { CONTACT, USER } from '@/constants';
import { socket } from '@/services';
import { ContactResponse, MessageType } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { SyntheticEvent, useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoCloseCircleOutline, IoSend } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';

function Message() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [room, setRoom] = useState('');
  const [isContactVisible, setIsContactVisible] = useState(true);
  const [friendProfile, setFriendProfile] = useState<ContactResponse | null>(null);
  const queryClient = useQueryClient();
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const friendId = params.get('f');
    const cachedData: any = queryClient.getQueryData([USER]);
    const userId = cachedData.data.data.id;

    const intervalId = setInterval(() => {
      const friendList: any = queryClient.getQueryData([CONTACT]);
      if (friendList && friendList.data && friendList.data.data) {
        const friend = friendList.data.data.find(
          (contact: ContactResponse) => contact.id === Number(friendId),
        );
        if (friend) {
          setFriendProfile(friend);
          clearInterval(intervalId);
        }
      }
    }, 0);

    if (friendId && userId) {
      socket.emit(
        'joinRoom',
        { friendId, userId },
        (res: { roomId: string; messages: MessageType[] }) => {
          if (res.roomId) {
            setRoom(res.roomId);
            setMessages(res.messages);
          }
        },
      );

      const receiveMessageHandler = (newMessage: MessageType) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };

      socket.on('receiveMessage', receiveMessageHandler);

      return () => {
        if (room) {
          socket.emit('leaveRoom', room);
        }
        socket.off('receiveMessage', receiveMessageHandler);
      };
    }
  }, [location.search]);

  function handleRenderMessage(messages: MessageType[]) {
    return messages.map((message, index) => <MessageItem key={index} message={message} />);
  }

  const toggleContact = () => {
    setIsContactVisible((prevState) => !prevState);
  };

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message) {
      socket.emit('sendMessage', {
        senderId: window.localStorage.getItem('userId'),
        message,
        imageUrl,
        chatboxId: room,
      });
      setMessage('');
      setImageUrl('');
    }
  }

  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = (url: string) => {
    setImageUrl(url);
  };

  return (
    <div
      className="grid grid-cols-8 gap-5 bg-cover bg-no-repeat divide-x w-full h-screen fixed"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}>
      <div
        className={`col-span-2 sm:col-span-8 sm:${isContactVisible ? 'hidden' : ''} ms-1 space-y-2 mt-1 h-full`}>
        <div className="sticky top-[92px]">
          <Search />
          <Contact />
        </div>
      </div>
      <div className="col-span-6 sm:col-span-8 w-full h-full">
        {!friendProfile && (
          <div className="relative h-screen overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-25"></div>
            <div className="container relative z-10 flex items-center px-6 mx-auto md:px-12 xl:py-20">
              <div className="relative z-10 flex flex-col items-center w-full font-mono">
                <p className="text-6xl my-36 animate-bounce text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Pick a friend to chat
                </p>
              </div>
            </div>
          </div>
        )}
        {friendProfile && (
          <div className="h-screen pb-2">
            <div className="messageHeader space-x-32 p-0 m-0 sm:flex sticky top-[92px] sm:top-[62px] h-[14%] sm:h-[13%] overflow-hidden">
              <div className="backButton hidden sm:block px-3 py-4 sm:pb-0">
                <button onClick={toggleContact}>
                  <IoMdArrowRoundBack className="text-white" />
                </button>
              </div>
              <div className="avatar flex flex-col items-center sm:items-top gap-2 pb-2 sm:pb-0  ">
                <img
                  className="w-12 h-12 sm:w-10 sm:h-10  self-center rounded-full object-cover"
                  src={friendProfile.avatar || blankImg}
                  alt=""
                />
                <p className="text-white text-sm sm:text-xs">{friendProfile.fullName}</p>
              </div>
            </div>
            <hr />
            <div className="chatArea overflow-y-auto m-2 space-y-1 h-[65%] sm:h-[61%] ">
              {handleRenderMessage(messages)}
            </div>
            <div className="chatForm flex gap-2 w-full items-center py-2 ms-1.5 h-auto">
              <div className="relative size-8 w-[3%] sm:w-[5%] sm:ml-4 text-blue-500">
                <UploadImage onImageUpload={handleImageUpload} />
              </div>
              <div className="messageInput w-full sm:w-[90%] bg-slate-100 rounded-full me-4">
                <div className="ml-5">
                  {!imageUrl ? (
                    ''
                  ) : (
                    <div>
                      {imageUrl}{' '}
                      <button onClick={() => setImageUrl('')}>
                        <IoCloseCircleOutline className="text-red-600" />
                      </button>
                    </div>
                  )}
                </div>
                <form
                  className="flex w-full items-center p-1 justify-between"
                  onSubmit={handleSubmit}>
                  <input
                    className="bg-transparent w-full outline-none text-sm sm:text-xs p-2 px-4 "
                    placeholder="Text message..."
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button className="w-[5%] text-blue-600 flex justify-center">
                    <IoSend className="size-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
