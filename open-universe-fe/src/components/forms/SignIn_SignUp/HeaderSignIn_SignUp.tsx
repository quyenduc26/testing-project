export default function Header({ page }: { page: string }) {
  return (
    <div className="lg:w-4/5 flex flex-wrap items-center justify-start">
      <h1 className="mt-5 text-4xl lg:text-6xl font-bold text-white hover:scale-110 ease-in-out duration-700">
        Welcome {page == 'Sign in' ? 'back' : 'you'} <br /> to <br />
        <span className="text-5xl lg:text-6xl font-bold text-white">OPEN UNIVERSE</span>
      </h1>
      <p className="text-2xl mt-5 lg:text-3xl text-white hover:scale-110 ease-in-out duration-700">
        "Connect with friends and explore the world of online shopping here!"
      </p>
    </div>
  );
}
