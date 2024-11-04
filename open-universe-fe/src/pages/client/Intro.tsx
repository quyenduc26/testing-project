import { HOME_PATH, SIGNIN_PATH } from '@/constants/routes';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import InstagramPost from '../../assets/images/InstagramPost.png';
import U from '../../assets/images/U.png';
import bg1 from '../../assets/images/bg1.jpg';
import bg2 from '../../assets/images/bg2.jpg';
import bg3 from '../../assets/images/bg3.jpg';
import dog from '../../assets/images/dog.jpg';
import hackathonOPU from '../../assets/images/hackathonOPU.png';
import haha from '../../assets/images/haha.png';
import plane from '../../assets/images/plane.png';
import Rocket from '../../components/Rocket';

function Intro() {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${bg1})` }}
        className="
          sm:bg-cover sm:bg-left-top sm:w-full sm:h-svh sm:relative
          bg-cover bg-center bg-no-repeat object-contain w-full h-full
          ">
        <div className="space-y-7 pt-80 pb-96 pr-10 sm:pt-5 sm:flex sm:flex-col sm:items-center sm:justify-items-center sm:pr-0 ">
          <h1 className="text-white subpixel-antialiased text-right text-8xl font-bold text-shadow-colors sm:text-6xl sm:text-center">
            OPEN <br /> UNIVERSE
          </h1>
          <div className="flex justify-end sm:absolute sm:bottom-16">
            <p className="text-white subpixel-antialiased font-medium text-4xl text-left sm:font-thin sm:text-2xl sm:pl-3 sm:text-pretty">
              Where All Boundaries Vanish <br />
              And Doors To Endless Possibilities Open
            </p>
          </div>
        </div>
        <div className="layout-placeholder w-full" style={{ display: 'none' }}></div>
      </div>

      <Rocket />

      <div
        style={{ backgroundImage: `url(${bg2})` }}
        className="bg-cover bg-center bg-no-repeat object-contain w-full h-full sm:bg-bottom sm:w-full sm:h-svh">
        <div className="space-y-20 flex flex-col pr-10 items-end pb-96 pt-32 sm:pt-5 sm:items-center sm:pr-0">
          <h1 className="text-white subpixel-antialiased text-8xl font-bold text-shadow-colors text-end sm:text-center sm:text-6xl">
            Our Purposes
          </h1>

          <p className="text-white subpixel-antialiased font-light text-2xl text-left text-balance w-1/4 italic sm:w-1/2 sm:text-pretty sm:-ml-40">
            At Open Universe, we believe that each individual carries within them a unique universe,
            full of untapped potential and discoveries. We've created this space for you to explore,
            learn, and share your own unique experiences.
          </p>
        </div>
      </div>

      <div className="bg-[#0C192B] flex flex-row object-contain w-full h-full ">
        <div className="relative w-[600px] h-[570px] bg-[#71CC97] rounded-full -left-60 sm:hidden">
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#0C192B] rounded-full"
            style={{ clipPath: 'inset(0% 0% 0% 30%)' }}></div>
          <img
            src={U}
            alt=""
            className="transform translate-x-96 translate-y-72 h-1/2 w-1/2 pb-0.5 pl-5 ml-2.5"
          />
        </div>
        <div className="ml-7 sm:ml-0 sm:space-y-5 sm:w-full">
          <h1 className="text-white subpixel-antialiased text-8xl font-bold text-shadow-colors pt-2 pb-5 sm:text-6xl sm:text-center sm:pt-5">
            Our Features
          </h1>
          <div className="flex items-center space-x-4 w-1/2 bg-gray-50 py-3 px-4 rounded-md -rotate-12 -translate-x-44 translate-y-10 sm:rotate-0 sm:translate-x-0 sm:w-3/4 sm:translate-y-0 sm:ml-5">
            <img className="h-12 w-12 rounded-full drop-shadow" src={hackathonOPU} alt="" />
            <p className="text-2xs font-bold">I'll stick with it. Love it</p>
          </div>
          <div className="flex items-center space-x-4 bg-gray-50 w-3/5 translate-x-80 py-3 px-4 rounded-md rotate-12 sm:rotate-0 sm:w-10/12 sm:ml-9 sm:translate-x-0">
            <img className="h-12 w-12 rounded-full drop-shadow" src={haha} alt="" />
            <p className="text-2xs font-bold text-nowrap">A new and wonderful experience</p>
          </div>
          <div className="flex items-center w-1/2 sm:mx-auto">
            <div className="bg-gray-50 rounded-s-md py-5 px-5 -mr-3">
              <p className="text-2xs font-bold text-nowrap">Attractive posting</p>
            </div>
            <img className="drop-shadow" src={InstagramPost} alt="" />
          </div>
          <div className="flex items-center space-x-4 w-1/2 bg-gray-50 py-3 px-4 rounded-md -rotate-12 translate-x-80 sm:rotate-0 sm:translate-x-0 sm:w-3/4 sm:ml-12">
            <img className="h-12 w-12 rounded-full drop-shadow" src={dog} alt="" />
            <p className="text-2xs font-bold">What a nice website!!!</p>
          </div>
          <div className="flex items-center w-1/2 mr-72 sm:w-3/4 sm:mx-auto sm:pb-5 sm:mr-12">
            <img className="drop-shadow" src={plane} alt="" />
            <div className="bg-gray-50 rounded-e-md py-5 px-5 -ml-9">
              <p className="text-2xs font-bold ml-5">Real-time message</p>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{ backgroundImage: `url(${bg3})` }}
        className="bg-cover bg-center bg-no-repeat w-full h-full relative group sm:bg-bottom sm:w-full sm:h-svh sm:relative">
        <div className="space-y-20 flex flex-col pl-10 pb-96 pt-32 sm:pt-10 sm:items-start sm:pl-5 sm:space-y-28">
          <h1 className="text-white subpixel-antialiased text-8xl font-bold text-shadow-colors sm:text-6xl">
            Stay Here <br /> with Us!
          </h1>
          <div className="flex flex-row justify-end sm:justify-start">
            <p className="italic font-light text-white subpixel-antialiased text-2xl text-left text-balance w-1/4 sm:w-60 sm:text-pretty">
              Open Universe is where you can uncover the diversity and richness of this universe.
            </p>
          </div>
          <p className="italic font-light text-white subpixel-antialiased text-2xl text-balance w-1/4 sm:w-60 sm:text-pretty sm:text-right sm:absolute sm:right-5 sm:bottom-10">
            Let's together open new doors and embark on endless discoveries at Open Universe!
          </p>
        </div>
        <div className="flex flex-row justify-end absolute bottom-80 right-0 mr-10 mb-10 pr-10 sm:bottom-40 sm:pr-0 sm:mr-5">
          <Link
            to={Cookies.get('access_token') ? HOME_PATH : SIGNIN_PATH}
            className="px-6 py-3 space-x-4 text-white rounded-full main-gradient-color w-48 text-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
            Let's Go!
          </Link>
        </div>
      </div>
    </>
  );
}

export default Intro;
