import { LoadingOutlined } from "@ant-design/icons"
import { Form, Input } from "antd"
import { useState } from "react"


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

    return  <>
    <Form layout={layout}>
         <Form.Item
            label={label}
            name={name}
            initialValue={fvalue}
        >
            <Input size="small" disabled={!disabled?loading:disabled} value={value} onChange={(e)=>setValue(e.target.value)} onBlur={onBlur} suffix={ suffix}/>
        </Form.Item>
    </Form>
    </>
  }
  
export default Component;