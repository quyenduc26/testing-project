import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';

function SignIn_SignUpForm({ page }: { page: string }) {
  return (
    <>
      <div className="lg:flex lg:h-full lg:items-center lg:justify-center flex-none">
        <LeftColumn page={page} />
        <RightColumn page={page} />
      </div>
    </>
  );
}

export default SignIn_SignUpForm;
