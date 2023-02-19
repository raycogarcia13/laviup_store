import { LoadingOutlined } from "@ant-design/icons"
import { Form, Input } from "antd"
import { useState } from "react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Component = ({label,layout,fvalue,name,changeAction, disabled=false}) =>{
    
    const [first, setFirst] = useState(fvalue,)
    const [value, setValue] = useState(fvalue,)
    const [loading, setLoad] = useState(false)

    const onBlur = async () => {
        if(first!=value){
            setLoad(true)
            let res = await changeAction(name, value)
            setFirst(res)
            setValue(res)
            setLoad(false)
        }
    }
    
    const suffix = loading ? <LoadingOutlined /> : <span />;
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'align'
      ]

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
          ['link', 'image'],
          ['clean']
        ],
      }

    return  <>
    <Form layout={layout}>
         <Form.Item
            label={label}
            name={name}
            initialValue={fvalue}
        >
            <ReactQuill theme="snow" modules={modules} formats={formats} disabled={loading} onBlur={onBlur} value={value} onChange={setValue} />
        </Form.Item>
    </Form>
    </>
  }
  
export default Component;