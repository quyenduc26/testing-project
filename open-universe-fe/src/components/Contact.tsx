import { getFriends } from '@/api/users.api';
import blankAvt from '@/assets/images/blank-avt.jpg';
import { CONTACT } from '@/constants';
import { ContactResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router-dom';

function Contact() {
  const { data, isLoading } = useQuery({
    queryKey: [CONTACT],
    queryFn: getFriends,
  });

  const contacts = data?.data?.data;

  const renderProfiles = () => {
    if (!contacts || contacts.length === 0) {
      return (
        <p className="text-white text-center py-16">
          You don't have any friends yet, look for more interesting friends
        </p>
      );
    }

    return contacts.map((user: ContactResponse) => (
      <Link to={`/message?f=${user.id}`} key={user.id}>
        <li className="py-1 px-1 rounded-lg hover:bg-slate-100 hover:bg-opacity-10">
          <div className="flex items-center space-x-3 p-1">
            <div className="flex-shrink-0">
              <img
                className="w-10 h-10 rounded-full border border-slate-400"
                src={user.avatar || blankAvt}
                alt={`${user.avatar} image`}></img>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate dark:text-white">
                {user.fullName}
              </p>
            </div>
          </div>
        </li>
      </Link>
    ));
  };

  return (
    <div className="contact items-center p-3 py-2 sticky top-[96px] ">
      <div className="flex justify-between items-center mx-auto mb-3 px-1">
        <h3 className="text-xl font-bold leading-none text-white dark:text-white">Contact</h3>
        <a
          href="#"
          className="text-sm font-medium text-violet-500 hover:font-bold dark:text-blue-500">
          Message
        </a>
      </div>
      <div className="contactList h-[600px] overflow-y-auto">
        <ul role="list" className="">
          {!isLoading && renderProfiles()}
        </ul>
      </div>
    </div>
  );
}

export default Contact;
