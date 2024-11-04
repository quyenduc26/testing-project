import { sendFriendRequest } from '@/api/users.api';
import { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { TiUserAdd } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const profileImageClass = 'w-full h-32 sm:h-22 object-cover';
const buttonClass =
  'absolute top-2 right-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full p-1 hover:bg-gray-300 dark:hover:bg-gray-600';
const textClass = 'text-sm sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100';
const buttonPrimaryClass = `
text-sm
  mt-2
  w-full 
  bg-blue-500 
  dark:bg-blue-700 
  text-white 
  font-semibold 
  py-2 
  rounded-md 
  shadow-md 
  hover:bg-blue-600 
  dark:hover:bg-blue-800 
  transition 
  duration-300 
  ease-in-out 
  flex 
  items-center 
  justify-center
`;

function FriendRequestCard({ name, image, id }: { name: string; image: string; id: number }) {
  return (
    <CardLayout
      image={image}
      name={name}
      buttonComponents={[
        <button key="confirm" className="bg-blue-500 text-white py-2 rounded-lg text-sm sm:text-xs">
          <Link to={`/message?f=${id}`} key={id}>
            Chat now
          </Link>
        </button>,
      ]}
    />
  );
}

function MayKnowFriendCard({
  name,
  image,
  id,
  removeCard,
}: {
  name: string;
  image: string;
  id: number;
  removeCard: () => void;
}) {
  const handleAddFriend = async () => {
    try {
      await sendFriendRequest(id);
      toast.success('Friend request sent successfully!');
      removeCard();
    } catch (error) {
      toast.error('Failed to send friend request.');
    }
  };

  return (
    <CardLayout
      image={image}
      name={name}
      buttonComponents={[
        <button key="add" className={buttonPrimaryClass} onClick={handleAddFriend}>
          <TiUserAdd className="mr-2 text-xl" />
          Add Friend
        </button>,
      ]}
      extraButton={
        <button className={buttonClass} onClick={removeCard}>
          <CgClose className="text-xl" />
        </button>
      }
    />
  );
}

function CardLayout({ image, name, buttonComponents, extraButton }: any) {
  return (
    <div className="w-[200px] sm:w-[180px] rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800 mx-2 h-full flex flex-col">
      <div className="relative">
        <img src={image} alt="Profile Image" className={profileImageClass} />
        {extraButton}
      </div>
      <div className="flex-grow"></div>
      <div className="p-2">
        <h3 className={textClass}>{name}</h3>
        <div className="mt-2 flex flex-col space-y-1">{buttonComponents}</div>
      </div>
    </div>
  );
}

interface Card {
  id: number;
  avatar: string;
  fullName: string;
}

function Slider({ cardData, isRequest }: { cardData: Card[]; isRequest: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cards, setCards] = useState(cardData);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
  };

  const removeCard = (id: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const title = isRequest ? 'Your friend' : 'May you know';
  const CardComponent = isRequest ? FriendRequestCard : MayKnowFriendCard;

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden mb-5 pe-3">
      <ToastContainer />
      <p className="text-2xl ps-2 mt-5 pb-2 text-white">{title}</p>
      <div
        className="flex transition-transform duration-500 ease-in-out w-full"
        style={{ transform: `translateX(-${currentIndex * 215}px)` }}>
        {cards.map((card) => (
          <div className="min-w-object" key={card.id}>
            <CardComponent
              name={card.fullName}
              image={card.avatar}
              id={card.id}
              removeCard={() => removeCard(card.id)}
            />
          </div>
        ))}
      </div>
      {cards.length > 3 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 hover:absolute transform -translate-y-1/2 left-4 text-white bg-gray-700 bg-opacity-5 hover:bg-opacity-75 rounded-full p-2">
            <IoIosArrowBack className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 transform -translate-y-1/2 right-4 text-white bg-gray-700 bg-opacity-5 hover:bg-opacity-75 rounded-full p-2">
            <IoIosArrowForward className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
}

export default Slider;
