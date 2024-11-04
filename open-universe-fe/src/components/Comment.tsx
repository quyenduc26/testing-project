import blankAvt from '@/assets/images/blank-avt.jpg';
import { PROFILE_PATH } from '@/constants';
import { CommentClientResponse } from '@/types';
import { calculateTimeDifference } from '@/utils/transformTime';
import { Link } from 'react-router-dom';

function Comment({ content, mediaUrl, user, createAt }: CommentClientResponse) {
  const sharedClasses = {
    textSm: 'text-sm',
    textZinc900: 'text-zinc-900',
    textZinc100: 'text-zinc-200',
    textZinc500: 'text-zinc-500',
    textZinc400: 'text-zinc-400',
  };
  return (
    <div className="flex items-start space-x-2">
      <Link to={PROFILE_PATH}>
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={user.avatar || blankAvt}
          alt="Commenter avatar"
        />
      </Link>
      <div className="space-y-1">
        <p className={`${sharedClasses.textSm} ${sharedClasses.textZinc100} font-extrabold`}>
          {user.userName}
        </p>
        <p className={`${sharedClasses.textSm} ${sharedClasses.textZinc100} font-thin`}>
          {content}
        </p>
        {mediaUrl && (
          <div className="mt-2 w-[170px] h-[150px]">
            <img className=" h-full rounded-lg object-cover" src={mediaUrl} alt="Attached media" />
          </div>
        )}
        <div className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
          <span>{calculateTimeDifference(createAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default Comment;
