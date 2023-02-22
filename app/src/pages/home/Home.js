import React, { useEffect, useState } from 'react';
import { enquireScreen } from 'enquire-js';
import { Badge, Button, Card, Col, Divider, Input, Layout, Row, Space, Tooltip, Typography } from 'antd';

import { setCart } from '../../store/auth/authActions'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth} from '../../auth'

import { base_uri, public_uri } from '../../config/axios';
import axios from 'axios';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import localStorageUtil from '../../utils/storage';
import Meta from 'antd/es/card/Meta';

const { Paragraph } = Typography;


const {Content} = Layout

let isMobile;
enquireScreen((b) => {
  isMobile = b;
});

const { location = {} } = typeof window !== 'undefined' ? window : {};

const Home = () =>{
  const data = useAuth();
  const dispatch = useDispatch();
  const { loading, user,token,error, logged , cart} = useSelector(state=>state.auth)
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")

  const [location, setLocation] = useState( [0,0] );


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setLocation([latitude, longitude]);
    });
}, []);


const deg2rad = (degrees)=> {
  var pi = Math.PI;
  return degrees * (pi/180);
}

const distance = (user,store) =>{
  const radius = 6371
  const dlat = deg2rad(store[0] - user[0]) 
  const dlon = deg2rad(store[1] - user[1]) 
  const a = Math.pow(Math.sin(dlat/2),2) + Math.cos(deg2rad(user[0])) * Math.cos(deg2rad(store[0])) * Math.pow(Math.sin(dlon/2),2);
  const c = 2* Math.asin(Math.sqrt(a))
  const distance = radius * c 

  return distance == 0 ? 0.001 : distance;
}

const orderProducts = (prods) =>{
  prods.sort( (a,b)=>{
    return distance(location,a.store.location) < distance(location,b.store.location) || distance(location,a.store.location) == distance(location,b.store.location) ? -1 :1
  })
  console.log(prods)
  return prods
}

  useEffect( ()=>{
    loadData()
  },[])

  const loadData = async () =>{
    const uri = `${base_uri}/products`
    const data = await axios.get(uri)
    setProducts(orderProducts(data.data.data))
  }

  const addToCart = (item)=>{
    dispatch(setCart(item));
  }

  const countItem = (item)=>{
    const count = cart.filter(it=>it._id==item._id)

    return count.length
  }

  const { Search } = Input;


  const onSearch = async ()=>{
    const uri = `${base_uri}/products/${search}`
    const data = await axios.get(uri)
    setProducts(data.data.data)
  }

  const CardProduct = (item)=>{
    return (
       <Card
          key={item._id}
          hoverable
          style={{ width: 240, marginInline:10, marginBottom:10 }}
          cover={<img alt={item.name} style={{height:200}} src={item.imported==true?item.photo:public_uri+item.photo} />}
        >
          <Meta title={item.name} description={item.description? item.description.slice(0,100).replace(/(<([^>]+)>)/gi, "")+" ..." : ""} />
          <Tooltip title="Agregar al carrito">
            <Badge count={countItem(item)}>
              <b>{item.price} € </b>
              <Button onClick={()=>addToCart(item)} type='link'> 
                <ShoppingCartOutlined  style={{fontSize:'16px'}}/> 
              </Button>
            </Badge>
            <p>{item.store.address}</p>
            <p>A solo: <b>{Math.round(distance(location, item.store.location))}Km</b></p>
          </Tooltip>
          <Tooltip title={item.store.name}>
            <img alt={item.store.name} style={{height:20}} src={public_uri+item.store.logo} />
          </Tooltip>
        </Card>
    )
  }

  return <>
    <Content style={{margin:10}}>
          <Input
            placeholder="input search text"
            onPressEnter={onSearch}
            onChange={(e)=>setSearch(e.target.value)}
            suffix={
              <Tooltip title="Extra information">
                <SearchOutlined
                  style={{
                    color: 'rgba(0,0,0,.45)',
                  }}
                />
              </Tooltip>
            }
            />
        <Divider />

      <Row gutter={10}>
        { products.map(item => CardProduct(item) )}
      </Row>
    </Content>
  </>

}


export default Home;