import { Outlet } from 'react-router-dom';
import background from '../../assets/images/Background SignIn SignUp.jpg';

function SignIn_SignUpLayout() {
  return (
    <>
      <div
        className="bg-scroll lg:bg-cover lg:bg-center"
        style={{ backgroundImage: `url(${background})` }}>
        <Outlet />
      </div>
    </>
  );
}

export default SignIn_SignUpLayout;
