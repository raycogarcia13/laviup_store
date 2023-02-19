

import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Empty,
  Table,
  Typography,
} from "antd";


import { useAuth} from '../../auth'
import { useEffect, useState } from "react";
import { api} from "../../config/axios"
import GeoLocationStore from "../../components/store/GeoLocationStore" 

function Home() {

  const data = useAuth();
  const [store, setStores] = useState([]);

  useEffect( ()=>{
    getStores()
  },[])

  const getStores = async () =>{
    const uri = '/store'
    const {data} = await api.get(uri);
    if(data.data){
      setStores(data.data)
    }
  }

  const createStores = async () =>{
    const uri = '/store'
    const {data} = await api.post(uri);
    if(data.data){
      setStores(data.data)
    }
  }

  
  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}  >
            <Card bordered={false} className="criclebox h-full">
              { store.length == 0 
                ? <>
                  <Empty description={
                      <span>
                        No tiene una tienda configurada
                        <Button block type="info" onClick={()=>{createStores()}}>Configura tu tienda</Button>
                      </span>
                  }/>
                  
                </> 
                : <GeoLocationStore store={store} />
              }
            </Card>
          </Col>
        </Row>

      </div>
    </>
  );
}

export default Home;
