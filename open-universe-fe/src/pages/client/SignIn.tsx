import SignIn_SignUpForm from '../../components/forms/SignIn_SignUp/SignIn_SignUpForm.tsx';

function SignIn() {
  return (
    <>
      <section className="lg:h-screen">
        <div className="h-full">
          <SignIn_SignUpForm page="Sign in" />
        </div>
      </section>
    </>
  );
}

export default SignIn;
