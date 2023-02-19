import React from 'react';
import { UserOutlined, BookOutlined, LoginOutlined, HomeOutlined, ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { Menu, Layout, Badge, Tag, Button } from 'antd';
import { useState, useEffect } from "react"
 import { useNavigate } from 'react-router-dom';

import image from "../../assets/images/logo.png"

import { setCart, removeCart } from '../../store/auth/authActions'
import { useDispatch, useSelector } from 'react-redux';
import { public_uri } from '../../config/axios';

const { Header } = Layout


const styles = {
  header:{
    backgroundColor:'white', 
    position: 'sticky', 
    top: 0, 
    zIndex: 1, 
    display:'flex', 
    overflow:'hidden',
    height:150,
    justifyContent:'space-around', 
    alignItems:'center', 
    paddingInline:100
  },
  menu:{
    width:'30vw'
  }
}


const App = () => {
  const [current, setCurrent] = useState('home');
  const { cart } = useSelector(state=>state.auth)
  const dispatch = useDispatch();

  const cartInMenu = () =>{
    let resum = cart
  
    resum = resum.filter((item,index) => resum.findIndex((it)=>it._id == item._id) === index)

    let all = []
    resum.forEach(item=>{
      let menu = <>
        {item.name}
        &nbsp;
        <Tag color='green'>{ cart.filter(it=>it._id == item._id).length }</Tag>
        <DeleteOutlined  onClick={()=>{dispatch(removeCart(item));}}/> 
      </>
      
      
      all.push({
        label:menu,
        key:item._id,
        icon:<><img style={{width:'20px', height:'20px'}} src={public_uri+item.photo}/> </>
      })
    })

    return all
  }

  const items = [
      {
        label: 'Inicio',
        key: 'home',
        icon: <HomeOutlined />,
        uri:'/'
      },
      {
        label: 'Carrito',
        key: 'cart',
        icon: <Badge count={cart?cart.length:''}><ShoppingCartOutlined /></Badge>,
        children:cartInMenu()
      },
      {
        label: 'Conviertete en tienda',
        key: 'login',
        icon: <LoginOutlined />,
        uri:'/login'
      }
    ];

    const navigate = useNavigate();
    
    const gotoPage = (key)=>{
      switch(key){
        case 'login':
          navigate('/login',{replace:true});
          break;
        case 'home':
          navigate('/',{replace:true});
          break;
      }
    }

    const onClick = (e) => {
      gotoPage(e.key);
      setCurrent(e.key);
    };
  
    return <Header style={styles.header}>
          <div className="logo" >
            <img src={image} style={{width:100}}/>
          </div>
          <Menu
            mode="horizontal"
            style={styles.menu}
            onClick={onClick} selectedKeys={[current]} items={items} />
    </Header>;
  };

  
  export default App;