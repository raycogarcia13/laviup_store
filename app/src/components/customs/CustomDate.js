import { LoadingOutlined } from "@ant-design/icons"
import { Form, DatePicker } from "antd"
import { useEffect, useState } from "react"
import dayjs from "dayjs"

const format = "YYYY-MM-DD"
const Component = ({label,layout,fvalue,name,changeAction,secundary=null}) =>{
    

    const [value, setValue] = useState()
    const [loading, setLoad] = useState(false)
    const [form] = Form.useForm()

    const sendData = async () => {
        setLoad(true)
        let res = await changeAction(name, value)
        setLoad(false)

        if(secundary)
            secundary()
    }

    useEffect( ()=>{
        sendData()
    },[value] )

    const change = (d,s)=>{
        setValue(d)
    } 

    const suffix = loading ? <LoadingOutlined /> : <span />;

    return  <>
    <Form layout={layout} form={form}>
         <Form.Item
            label={label}
            name={name}
        >
            <DatePicker 
                defaultValue={ fvalue?dayjs(fvalue):""}
                format={format} 
                style={{ width: '100%' }} 
                onChange={change}
                />
        </Form.Item>
    </Form>
    </>
  }
  
export default Component;