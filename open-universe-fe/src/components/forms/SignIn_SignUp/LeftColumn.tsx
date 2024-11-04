import FigureSignIn from '../../../assets/images/Sign In Figure.png';
import FigureSignUp from '../../../assets/images/Sign Up Figure.png';
import Header from './HeaderSignIn_SignUp';

export default function LeftColumn({ page }: { page: string }) {
  return (
    <div className="shrink-1 mb-8 lg:mb-12 lg:w-6/12 flex items-center justify-center">
      <div className="w-11/12 lg:w-4/5 flex flex-wrap items-center justify-center">
        <Header page={page} />

        {page == 'Sign in' ? (
          <img
            src={FigureSignIn}
            className="hidden lg:w-56 lg:mt-5 lg:hover:scale-110 lg:ease-in-out lg:duration-700 lg:block"
            alt="Sample image"
          />
        ) : (
          <img
            src={FigureSignUp}
            className="hidden lg:w-fit lg:mt-5 lg:hover:scale-110 lg:ease-in-out lg:duration-700 lg:block"
            alt="Sample image"
          />
        )}
      </div>
    </div>
  );
}
