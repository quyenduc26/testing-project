import fire from '@/assets/images/fire.webp';
import rocket from '@/assets/images/rocket.png';
import { HOME_PATH, SIGNIN_PATH } from '@/constants/routes';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Rocket() {
  const [isFlying, setIsFlying] = useState(false);
  const navigate = useNavigate();

  const accessToken = Cookies.get('access_token');

  const handleRocketClick = () => {
    setIsFlying(true);
    setTimeout(() => {
      if (accessToken) navigate(HOME_PATH);
      navigate(SIGNIN_PATH);
    }, 4000);
  };

  return (
    <div className="flex h-20 items-center justify-start bg-black sm:h-14">
      <div className="inline-block cursor-pointer translate-x-14" onClick={handleRocketClick}>
        <div
          className={`relative flex h-16 w-16 items-center justify-start sm:h-12 sm:w-12 ${
            isFlying ? 'animate-takeoff' : ''
          }`}>
          <img src={rocket} className="rotate-90" alt="" />
          <div
            className={`absolute left-1/2 w-0 -translate-x-28 -translate-y-5 transform animate-fire rounded-full pt-10 ${
              isFlying ? 'animate-fires' : 'animate-fire'
            }`}>
            <img src={fire} alt="" className="-rotate-90" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rocket;
