import { EXPLORE_PATH, HOME_PATH, INTRO_PATH, MESSAGE_PATH, PROFILE_PATH } from '@/constants';
import { NavLink } from 'react-router-dom';

function HeaderClient() {
  return (
    <>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to={INTRO_PATH}>Intro</NavLink>
            </li>
            <li>
              <NavLink to={HOME_PATH}>Home</NavLink>
            </li>
            <li>
              <NavLink to={PROFILE_PATH}>Profile</NavLink>
            </li>
            <li>
              <NavLink to={MESSAGE_PATH}>Message</NavLink>
            </li>
            <li>
              <NavLink to={EXPLORE_PATH}>Explore</NavLink>
            </li>
          </ul>
        </nav>
        <hr />
      </div>
    </>
  );
}

export default HeaderClient;
