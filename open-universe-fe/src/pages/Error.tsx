import landscape from '@/assets/images/file-note-found.jpeg';
function Error() {
  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <img src={landscape} className="absolute object-contain w-full h-full" />
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <div className="container relative z-10 flex items-center px-6 mx-auto md:px-12 xl:py-20">
        <div className="relative z-10 flex flex-col items-center w-full font-mono">
          <h1 className="text-5xl font-extrabold leading-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            You&#x27;re alone here
          </h1>
          <p className="font-extrabold text-8xl my-36 animate-bounce text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            404
          </p>
        </div>
      </div>
    </div>
  );
}

export default Error;
