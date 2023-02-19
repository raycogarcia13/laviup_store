import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Divider,
  Alert,
  Card
} from "antd";
import signinbg from "../../assets/images/logo.png";
import { setLogin } from '../../store/auth/authActions'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth} from '../../auth'
import axios from "axios";
import {base_uri} from "../../config/axios"
import ReactCodeInput from 'react-verification-code-input';

const { Title } = Typography;
// export default class SignIn extends Component {
  export default function SignIn(){
    const navigate = useNavigate();

    const data = useAuth();
    const dispatch = useDispatch();
    const { user,token, } = useSelector(state=>state.auth)
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    useEffect( ()=>{
      if(token){
          data.onLogin({user,token});
      }
    })

    const onVerify = async (values) => {
      setLoading(true)
      const uri = `${base_uri}/verify`
      try {
        const result = await axios.post(uri,{code:values})
        dispatch(setLogin(result.data));
        data.onLogin(result.data);
        console.log(result)
      }catch (error){
        setError(error.response.data.error)
      }
      setLoading(false)
    };

    const onRegisterFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const message = ()=>{
      if(error)
        return (
          <Alert message={error} type="error" showIcon />
        )
        return  (<></>)
    }

    
    return (
      <>
            <Row justify="center" style={{minHeight:'80vh', display:'flex', justifyContent:'center'}}>
              <Col>
                 <img src={signinbg} alt="" />
                <Title className="mb-15">Inserte el código enviado a su correo</Title>
                <Card title="Verificación del usuario"  style={{ width: 500, textAlign:'left' }}>
                  <div style={{display:"flex", justifyContent:'center'}}>
                    <ReactCodeInput onComplete={onVerify} loading={loading} onChange={()=>setError('')}/>
                  </div>
                  <Divider />
                  {message()}
                </Card>
              </Col>
              <Col>
              
              </Col>
            </Row>
      </>
    );
  }
