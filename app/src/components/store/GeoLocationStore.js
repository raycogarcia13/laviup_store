import {
    Alert,
    Button,
    Card,
    Col,
    Divider,
    Form,
    Input,
    notification,
    Row,
  } from "antd";
  

import {HomeFilled} from "@ant-design/icons"
import { useEffect, useState } from "react";


import {  MapContainer, Marker, TileLayer,useMap, useMapEvents } from 'react-leaflet'
import L,{ latLng } from "leaflet";
import * as ReactDOMServer from 'react-dom/server';
import 'leaflet/dist/leaflet.css'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen.js';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import LogoComponent from "./LogoComponent"
import {CustomInput} from "../customs/customsForms"
import { api} from "../../config/axios"




function ConfigStore({store}) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const message = ()=>{
        if(error)
        return (
            <Alert message={error} type="error" showIcon />
        )
        return  (<></>)
    }
    const [initialPosition, setInitialPosition] = useState( store.location.length==0 ? [0,0] : store.location);
    const [selectedPosition, setSelectedPosition] = useState( store.location.length==0 ? [0,0] : store.location);
  
    console.log('initial ',initialPosition)
    console.log('selected ',selectedPosition)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setSelectedPosition([latitude, longitude]);
        });
    }, []);

    useEffect(() => {
    }, []);

    const sendItem = async (field, value)=>{
        let body ={};
        body[field] = value
        const uri = `/store/${store._id}`
        const data = await api.put(uri,body)
        store = data.data
        let t = `data.data.${field}`
        return eval(t)
      }
  

    const sendLocation = async ()=>{
        setLoading(true);

        await sendItem('location',selectedPosition)
        setInitialPosition(selectedPosition)

        setLoading(false);
    }

    const Markers = () => {
        
        useMapEvents({
            click(e) {                                
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);   
            }           
        })
        const map = useMap()

        useEffect(() => {
            if(selectedPosition[0]!=0 && selectedPosition[1]!=0) {
                map.flyTo(selectedPosition,15);
                if(selectedPosition!=initialPosition){
                    sendLocation();
                }
            }else{
                map.flyTo([0,0],3);
            }
        }, [selectedPosition]);
        
        return (
            selectedPosition ? 
                <Marker           
                    key={selectedPosition[0]}
                    position={selectedPosition}
                    interactive={false} 
                    icon= {
                        L.divIcon({
                            className:'iconStore',
                            html: ReactDOMServer.renderToString(<HomeFilled style={{ fontSize: '24px', color: '#42CEA1' }}/>),
                        })
                    }
                />
            : null
        )   
    }

    const openNotification = (type,title,text) => {
        notification[type]({
            message: title,
            description:text
        });
    };

    const options = {
        position: 'topleft', // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
        title: 'Entrar en pantalla completa !', // change the title of the button, default Full Screen
        titleCancel: 'Salir de pantalla completa', // change the title of the button when fullscreen is on, default Exit Full Screen
        content: null, // change the content of the button, can be HTML, default null
        forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
        forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
        fullscreenElement: false, // Dom element to render in full screen, false by default, fallback to map._container
      };

      const registerStore = ()=>{

    }
  
      return (
        <Card title="Ubicación de la tienda">
                <CustomInput 
                     layout="vertical"
                     label="Nombre de la tienda"
                     name="name" 
                     fvalue={store?store.name:''} 
                     changeAction={sendItem}
                />
                <CustomInput 
                     layout="vertical"
                     label="Dirección física de la tienda"
                     name="address" 
                     fvalue={store?store.address:''} 
                     changeAction={sendItem}
                />
                <LogoComponent store ={store}/>

                <MapContainer 
                fullscreenControl={true}
                style={{height: '50vh', zIndex:'1', cursor:'pointer'}}
                bounds={[ [21.8932641596, -82.8244219401], [21.9016376414, -82.8096053901] ]} 
                center={latLng(selectedPosition[0], selectedPosition[1])} 
                attribution='<a href="mailto:rayco.garcia13@nauta.cu>r@ancode</a>'
                zoom={3} 
                scrollWheelZoom={true}>
                    
                    <TileLayer
                        attribution='<a href="mailto:rayco.garcia13@nauta.cu>r@ancode</a>'
                        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        />
                    <Markers />
                </MapContainer>
                <Divider />
                    { (!selectedPosition || selectedPosition[0]==0 || selectedPosition[1]==0) ? 
                    <Alert type="error" message="No ha podido triangularse su Ubicación, por favor seleccióne la ubicación en el mapa de su tienda" />:
                    <><Button block onClick={()=>setSelectedPosition([0,0])}>Limpiar localización</Button></> }

                </Card>
      )
}
  
  export default ConfigStore;
  