import SignIn_SignUpForm from '../../components/forms/SignIn_SignUp/SignIn_SignUpForm.tsx';

function SignUp() {
  return (
    <>
      <section className="lg:h-screen">
        <div className="h-full">
          <SignIn_SignUpForm page="Sign up" />
        </div>
      </section>
    </>
  );
}

export default SignUp;
