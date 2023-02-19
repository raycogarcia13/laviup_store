import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import { api, public_uri, base_uri } from '../../config/axios';
import localStorage from '../../utils/storage'


const App = ({store}) => {
  const [loading, setLoading] = useState(true)

  const [fileList, setFileList] = useState([]);

  useEffect( ()=>{

    if(store && store.logo){
      setFileList([
        {
          uid: store._id,
          name: store.logo,
          status: 'done',
          url: public_uri +store.logo
        },
      ])
    }

  },[loading] )

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }


    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <ImgCrop rotate aspect={2/1} minZoom={-1}>
      <Upload
        action={`${base_uri}/store/logo/${store._id}`}
        headers={
          {authorization: localStorage.getToken()}
        }
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 1 && 'Upload'}
      </Upload>
    </ImgCrop>
  );
};
export default App;