import React, { useEffect, useState } from 'react';
import { enquireScreen } from 'enquire-js';
import { Badge, Button, Card, Col, Descriptions, Divider, Input, Layout, Modal, Row, Space, Tooltip, Typography } from 'antd';

import { setCart } from '../../store/auth/authActions'
import { Link, useNavigate } from 'react-router-dom';
import * as ReactDOMServer from 'react-dom/server';

import { useDispatch, useSelector } from 'react-redux';
import { useAuth} from '../../auth'

import { base_uri, public_uri } from '../../config/axios';
import axios from 'axios';
import { HeatMapOutlined, HomeFilled, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';

import localStorageUtil from '../../utils/storage';
import Meta from 'antd/es/card/Meta';
import {  MapContainer, Marker, TileLayer,useMap, useMapEvents } from 'react-leaflet'
import L,{ latLng } from "leaflet";
import 'leaflet/dist/leaflet.css'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';

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

  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState([])
  const [userLocation, setUserLocation] = useState([0,0])

  const countItem = (item)=>{
    const count = cart.filter(it=>it._id==item._id)

    return count.length
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
    });
}, []);


  const openModal = (store) =>{

    setCoords(store.location||[0,0])
    setOpen(true)

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

    return all
  }

  const Markers = () => {
        
    const map = useMap()

    return (
        <>
        {userLocation ? 
            <Marker           
                key={1902}
                position={userLocation}
                interactive={false} 
                icon= {
                    L.divIcon({
                        className:'iconStore',
                        html: ReactDOMServer.renderToString(<UserOutlined style={{ fontSize: '24px', color: '#ff007f' }}/>),
                    })
                }
            />
        : null}
        {grouped().map(it=>{
          return <Marker 
              key={it.store._id} 
              position={it.store.location} 
              interactive={false}
              icon= {
                L.divIcon({
                    className:'iconStore',
                    html: ReactDOMServer.renderToString(<HomeFilled style={{ fontSize: '24px', color: '#42CEA1' }}/>),
                })
            }
              />
        })}
        </>
    )   
}

  const options = {
    position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
    title: 'Entrar en pantalla completa !', // change the title of the button, default Full Screen
    titleCancel: 'Salir de pantalla completa', // change the title of the button when fullscreen is on, default Exit Full Screen
    content: null, // change the content of the button, can be HTML, default null
    forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
    forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
    fullscreenElement: false, // Dom element to render in full screen, false by default, fallback to map._container
  };


  return <>
    <Content style={{margin:10}}>


    <Modal
          title={`Eliminar producto`}
          open={open}
          okText="Cerrar"
          footer={
            <>
              <Button key="btnclose" onClick={()=>setOpen(false)}>
                  Cancelar
              </Button>
            </>
            }
          >
            <MapContainer 
                fullscreenControl={true}
                style={{height: '50vh', zIndex:'1', cursor:'pointer'}}
                bounds={[ [21.8932641596, -82.8244219401], [21.9016376414, -82.8096053901] ]} 
                center={latLng(userLocation[0], userLocation[1])} 
                attribution='<a href="mailto:rayco.garcia13@nauta.cu>r@ancode</a>'
                zoom={3} 
                scrollWheelZoom={true}>
                    
                    <TileLayer
                        attribution='<a href="mailto:rayco.garcia13@nauta.cu>r@ancode</a>'
                        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        />
                    <Markers /> 
                </MapContainer>
        </Modal>


        <Card style={{display:'flex', justifyContent:'center'}}>
        { grouped().map(item => {
          return <>
            <Card  key={item.store._id} title={item.store.name} style={{marginBottom:20}}>
              <Space>
                <p>{item.store.address} <Tooltip title="Abrir geolocalización"> <Button onClick={()=>openModal(item.store)} type='link' ghost>Ver en Mapa <HomeFilled /> </Button> </Tooltip> </p>
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

                  <Descriptions.Item span={3} label="TOTAL">{item.items.reduce( (sum,it)=>{return parseFloat(sum)+parseFloat(parseFloat(it.price)*parseInt(it.cant))},0 )} €</Descriptions.Item>
                  
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