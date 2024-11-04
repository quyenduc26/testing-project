import { MessageType } from '@/types';

function MessageItem({ message }: { message: MessageType }) {
  const userId = window.localStorage.getItem('userId');
  const isMyMessage = message.senderId.toString() == userId;
  return (
    <div className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} w-full`}>
      <div
        className={`message ${isMyMessage ? ' bg-blue-500 rounded-bl-lg' : 'bg-slate-100 rounded-br-lg'} p-2 rounded-t-lg mx-3 text-sm sm:text-xs    `}>
        <p>{message.message}</p>
        {message.imageUrl ? <img src={message.imageUrl} /> : null}
      </div>
    </div>
  );
}

export default MessageItem;
