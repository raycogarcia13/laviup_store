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
import { loginAction } from '../../store/auth/authActions'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth} from '../../auth'
import axios from "axios";
import {base_uri} from "../../config/axios"

const { Title } = Typography;
// export default class SignIn extends Component {
  export default function SignIn(){
    const navigate = useNavigate();

    const data = useAuth();
    const dispatch = useDispatch();
    const { loading, user,token,error, logged } = useSelector(state=>state.auth)
    const [loadingRegister, setLoadingRegister] = useState(false)

    useEffect( ()=>{
      if(token){
          data.onLogin({user,token});
      }
    })

    const onFinish = async (values) => {
      // dispatch(loginAction(values));
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    const onRegister = async (values) => {
      
      const uri = `${base_uri}/register`
      const data =await axios.post(uri,values)
      
      if(data.data.status=="success"){
        navigate('/auth/verify',{replace:true});
      }
      console.log(values)
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
                <Title className="mb-15">Entrar al sistema</Title>
                <Card title="Registro"  style={{ width: 500, textAlign:'left' }}>
                  <Form
                    onFinish={onRegister}
                    onFinishFailed={onRegisterFailed}
                    layout="vertical"
                    className="row-col"
                  >
                    <Form.Item
                      className="name"
                      label="Nombre"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Debe insertar el nombre!",
                        },
                      ]}
                    >
                      <Input placeholder="Paco Álcacer Rodríguez" />
                    </Form.Item>
                    <Form.Item
                      className="email"
                      label="Correo"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Debe insertar el correo!",
                        },
                      ]}
                    >
                      <Input placeholder="Correo" />
                    </Form.Item>

                    <Form.Item
                      className="username"
                      label="Contraseña"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Debe insertar la contraseña!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    {message()}
                      <Divider />

                    <Form.Item>
                      <Button
                        loading={loadingRegister}
                        htmlType="submit"
                        style={{ width: "100%" }}
                      >
                        Registrarse
                      </Button>
                    </Form.Item>
                  </Form>
              </Card>
              </Col>
              <Col>
              
              </Col>
            </Row>
      </>
    );
  }
