import { LoadingOutlined } from "@ant-design/icons"
import { Form, Input, Select } from "antd"
import { useEffect, useState } from "react"

const { Option } = Select;

const Component = ({label,layout,fvalue,name,changeAction, data}) =>{
    
    const [value, setValue] = useState(fvalue)
    const [loading, setLoad] = useState(false)

    const sendData = async (e) => {
            setLoad(true)
            let res = await changeAction(name, value)
            setValue(res)
            setLoad(false)
    }

    useEffect( ()=>{
        sendData()
    },[value] )

    const suffix = loading ? <LoadingOutlined /> : <span />;

    return  <>
    <Form layout={layout}>
         <Form.Item
            label={label}
            name={name}
            initialValue={fvalue}
        >
            <Select size="large" value={value} disabled={loading} loading={loading} onChange={(e)=>setValue(e)}>
                {data.map(it=>{
                    return <Option value={it.value}>{it.label}</Option>
                })}
            </Select>
        </Form.Item>
    </Form>
    </>
  }
  
export default Component;