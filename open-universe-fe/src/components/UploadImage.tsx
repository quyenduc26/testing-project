import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';
import { IoCamera } from 'react-icons/io5';

interface UploadImageProps {
  onImageUpload: (url: string) => void;
}

function UploadImage({ onImageUpload }: UploadImageProps) {
  const CLOUNAME = import.meta.env.VITE_CLOUNAME;
  const PRESET = import.meta.env.VITE_PRESET;

  const props: UploadProps = {
    action: `https://api.cloudinary.com/v1_1/${CLOUNAME}/image/upload?upload_preset=${PRESET}`,
    onChange({ file }) {
      if (file.status !== 'uploading') {
        onImageUpload(file.response.url);
      }
    },
    showUploadList: false,
  };

  return (
    <Upload {...props}>
      <Button icon={<IoCamera />}></Button>
    </Upload>
  );
}

export default UploadImage;
