import React, { useEffect, useState } from 'react';
import { enquireScreen } from 'enquire-js';
import { Badge, Button, Card, Col, Descriptions, Divider, Input, Layout, Row, Space, Tooltip, Typography } from 'antd';

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


  const countItem = (item)=>{
    const count = cart.filter(it=>it._id==item._id)

    return count.length
  }

  const grouped = ()=>{
    let all = []

    for (let item of cart){
      const index = all.findIndex(it=>it.store._id+"" == item.store._id+"")
      if(index!=-1){
        let pp = all[index].items.find(ii=>ii.id+'' == item._id+'')
        if(pp)
          pp.cant++
        else
          all[index].items.push({
            id:item._id,
            name:item.name,
            price:item.price,
            cant:1
          })
      }else{
        let store = {
          store:item.store,
          items:[]
        }
        store.items.push({
          id:item._id,
          name:item.name,
          price:item.price,
          cant:1
        })

        all.push(store)
      }
    }

    console.log(all)

    return all
  }

  return <>
    <Content style={{margin:10}}>
       
        <Card style={{display:'flex', justifyContent:'center'}}>
        { grouped().map(item => {
          return <>
            <Card  key={item.store._id} title={item.store.name} style={{marginBottom:20}}>
              <Space>
                <p>{item.store.address}</p>
                <img alt={item.store.name} style={{height:20}} src={public_uri+item.store.logo} />
              </Space>
              <Descriptions size='small' bordered>
                  {item.items.map(prod=>{
                    return <>
                      <Descriptions.Item span={1} label="Producto">{prod.name}</Descriptions.Item>
                      <Descriptions.Item span={1} label="Cantidad">{prod.cant}</Descriptions.Item>
                      <Descriptions.Item span={1} label="Precio">{prod.price*prod.cant}</Descriptions.Item>
                    </>
                  })}

                  <Descriptions.Item span={3} label="TOTAL">{item.items.reduce( (sum,it)=>{return sum+=it.price*it.cant},0 )} €</Descriptions.Item>
                  
              </Descriptions>

            </Card>
             <Divider />

          </>
        }) }
          <Space>
            <Button block type='primary'>Pagar y recoger productos en tiendas</Button>
          </Space>
      </Card>
    </Content>
  </>

}


export default Home;