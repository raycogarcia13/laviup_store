import * as React from 'react';

import Router from '../router/home'

import { useAuth } from '../auth';
import '../App.css'

import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../store/auth/authActions'

import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';

import { Button, Layout, Tooltip } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
const { Content } = Layout;

function DashboardContent({ token, logout}) {
  const [collapsed, setCollapsed] = React.useState(false);
  
  const toggle = () => {
    setCollapsed(!collapsed)
  };

  const dispatch = useDispatch();
  // const myuser = user.user

  const { user } = useSelector(state=>state.auth)

  const onLogout = async () =>{
    await dispatch(logoutAction());
    logout();
  }

  return (
    <Layout style={{height:'100vh', maxWidth:'100vw'}}>
        <Header />
        <Content
          // style={{overflowX:'hidden'}}
        >
            <Router />
          <Footer />
        </Content>
    </Layout>
  );
}

export default function Dashboard() {
  const data = useAuth();
  return <DashboardContent user={data.user} token={data.token} logout={data.onLogout} />;
}