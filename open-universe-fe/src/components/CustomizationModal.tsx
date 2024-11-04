import { CommentAdminUpdatePayload, PostAdminUpdatePayload } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { TiDeleteOutline } from 'react-icons/ti';

type Props = {
  width?: string;
  height?: string;
  title?: string;
  content?: string;
  isShow?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  children?: React.ReactNode;
  object?: PostAdminUpdatePayload | CommentAdminUpdatePayload | null;
  queryKey?: string;
  queryFn?: (data: CommentAdminUpdatePayload) => Promise<AxiosResponse<any, any> | undefined>;
};

function CustomizationModal(props: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (body: CommentAdminUpdatePayload) => {
      if (props.queryFn) {
        return props.queryFn(body);
      } else {
        throw new Error('queryFn is not defined');
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [props.queryKey] });
      if (props.onClose) {
        props.onClose();
      }
    },
  });
  const { register, handleSubmit } = useForm<PostAdminUpdatePayload>();
  const onSubmit = handleSubmit(() => {
    mutation.mutate(props.object as CommentAdminUpdatePayload);
  });

  return (
    <>
      {props.isShow && (
        <div className="fixed inset-0 flex items-center bg-black justify-center z-50 bg-opacity-50">
          {!props.children && (
            <div className={`bg-white rounded-lg p-6 shadow-lg ${props.width} ${props.height}`}>
              <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4">
                <h2 className="text-2xl font-semibold">{props.title}</h2>
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={props.onClose}>
                  <TiDeleteOutline className="size-7" />
                </button>
              </div>
              <div className="mt-6 space-y-4">
                <p className="text-lg text-gray-600">{props.content}</p>
                <form onSubmit={onSubmit}>
                  <input
                    type="hidden"
                    {...register('id')}
                    value={props.object?.id}
                    className="hidden"
                  />
                  <input
                    type="hidden"
                    {...register('status')}
                    value="inactive"
                    className="hidden"
                  />
                  <div className="flex justify-around sm:flex-col">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-10 py-2 rounded-lg hover:bg-blue-700">
                      Accept
                    </button>
                    <button
                      onClick={props.onClose}
                      className="text-white gap-2 bg-red-500 px-10 py-2 rounded-lg hover:bg-red-700">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {props.children && props.children}
        </div>
      )}
    </>
  );
}

export default CustomizationModal;
