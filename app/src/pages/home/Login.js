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

const { Title } = Typography;
// export default class SignIn extends Component {
  export default function SignIn(){
    const navigate = useNavigate();

    const data = useAuth();
    const dispatch = useDispatch();
    const { loading, user,token,error, logged } = useSelector(state=>state.auth)
    const [loadingRegister, setLoadingRegister] = useState(false)

    useEffect( ()=>{
      console.log('token: ',token, user)
      if(token){
          console.log('sii')
          data.onLogin({user,token});
      }
    })

    const onFinish = async (values) => {
      dispatch(loginAction(values));
    };

    const onFinishFailed = (errorInfo) => {
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
            <Row justify="space-around" style={{minHeight:'80vh', display:'flex', justifyContent:'center'}}>
              <Col>
                 <img src={signinbg} alt="" />
                <Title className="mb-15">Entrar al sistema</Title>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                    className="username"
                    label="Correo"
                    name="username"
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
                      loading={loading}
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      Entrar
                    </Button>
                  </Form.Item>
                  <Divider>No tienes cuenta aún?, no esperes más. <Link to="/auth">Regístrate</Link> </Divider>
                </Form>
              </Col>
              <Col>
              
              </Col>
            </Row>
      </>
    );
  }
