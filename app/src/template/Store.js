import * as React from 'react';

import Router from '../router/store'
import Copyright from '../components/landing/Footer'

import { useAuth } from '../auth';
import '../App.css'

import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../store/auth/authActions'

import { Button, Layout, Tooltip, Space, theme, Divider } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import Sider from "./siders/StoreSider"

const { Header, Content } = Layout;

function DashboardContent({ token, logout}) {
  const [collapsed, setCollapsed] = React.useState(false);
  
  const toggle = () => {
    setCollapsed(!collapsed)
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();
  // const myuser = user.user

  const { user } = useSelector(state=>state.auth)

  const onLogout = async () =>{
    dispatch(logoutAction());
    logout();
  }

  const [width, setWidth] = React.useState(window.innerWidth);
  const handleWindowSizeChange = () =>{
    setWidth(window.innerWidth);
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
  }, []);
  
  const isMobile =  width <= 768


  return (
    <Layout style={{height:'100vh'}}>
        {/* <Sider theme='light' trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
             <img style={{width:"100px"}} src={require('../assets/images/logo_uij.png')}/>
          </div>
          <Divider></Divider>
        </Sider> */}
        <Sider  collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Layout>
          <Header style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingInlineEnd: 20, background: colorBgContainer }}>
            {
            React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })
            }
            {
              !isMobile?
                <Space style={{fontWeight:'bold', fontSize:'1.2em'}}>Laviup | Gestión de mi tienda</Space>
              : <></>
            }
            <Space direction="horizontal">
              {(user) ?user.name:'Loading...'}
              <Tooltip title="Salir">
                <Button onClick={()=>{onLogout()}} type="link" size='large' icon={<LogoutOutlined />}></Button>
              </Tooltip>
            </Space>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
             <Router />
          </Content>
          <Copyright />
        </Layout>
      </Layout>
  );
}

export default function Dashboard() {
  const data = useAuth();
  return <DashboardContent user={data.user} token={data.token} logout={data.onLogout} />;
}