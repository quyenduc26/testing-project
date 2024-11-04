import SignInInput from './SignInForm';
import SignUpInput from './SignUpForm';

export default function LeftColumn({ page }: { page: string }) {
  const isSignInPage = page === 'Sign in';

  return (
    <div className="lg:w-5/12 flex items-center justify-center">
      <div className="mb-1 w-11/12 lg:w-full max-w-md lg:border lg:border-slate-200 lg:rounded-2xl">
        <div className="lg:p-6 lg:space-y-4">
          <p className="hidden text-5xl font-bold text-white mb-5 lg:block">
            {isSignInPage ? 'SIGN IN' : 'SIGN UP'}
          </p>
          {isSignInPage ? <SignInInput /> : <SignUpInput />}
        </div>
      </div>
    </div>
  );
}
