

import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Table,
  Typography,
} from "antd";


import { useAuth} from '../../auth'
import { useEffect, useState } from "react";
import { api} from "../../config/axios"
import GeoLocationStore from "../../components/store/GeoLocationStore" 

function Home() {

  const data = useAuth();
  const [stores, setStores] = useState([]);

  useEffect( ()=>{
    getStores()
  },[])

  const getStores = async () =>{
    const uri = '/store'
    const {data} = await api.get(uri);
    if(data.data){
      setStores(data.data)
      if(stores.length == 0){
        // alert('no stores')
    }
    }
  }

  
  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}  >
            <Card bordered={false} className="criclebox h-full">
             
            </Card>
          </Col>
        </Row>

      </div>
    </>
  );
}

export default Home;
