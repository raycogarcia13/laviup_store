

import {
  Card,
  Col,
  Row,
  Space,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
// import Echart from "../components/chart/EChart";
import { api, public_uri} from "../../config/axios"


function Home() {

  const [stores, setStores] = useState([])

  const loadData = async () =>{
    const uri = '/store/all'
    const data = await api.get(uri)
    setStores(data.data.data)
  }

  useEffect( ()=>{
    loadData()
  },[] )

  const columns = [
    { dataIndex: 'name', key: 'name', title: 'Nombre', },
    { dataIndex: 'logo', key: 'logo', title: 'Foto', render:(item)=>{
      return (
        <Space>
          <img style={{width:80}} src={public_uri+item}/>
       </Space>
     )
    } },
    { dataIndex: 'user', key: 'user', title: 'Usuario', render:(item)=>{
      return (
        <Space>
          {item.email }
       </Space>
     )
    } },
    { dataIndex: 'user', key: 'own', title: 'Dueño', render:(item)=>{
      return (
        <Space>
          {item.name }
       </Space>
     )
    } }
  ];


  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}  >
            <Card bordered={false} className="criclebox h-full">
            <Table
                dataSource={stores}
                columns={columns}
              />
            </Card>
          </Col>
        </Row>

      </div>
    </>
  );
}

export default Home;
