import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Row, Col, Card, Avatar } from 'antd';
import {OverPack} from 'rc-scroll-anim';
import { UserOutlined, ProjectOutlined, ExperimentOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default  (data) =>{
  const { dataSource, isMobile } = data;
  const { wrapper, page, overPackData, childWrapper} = dataSource;

  return (
         <>
            <Row justify="space-around" align="middle" gutter={24} style={{marginTop:'10vh', paddingInline:'15vw'}}>
                <Col>
                  <Card
                    hoverable
                    style={{ width: 270, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:10}}
                    cover={<Avatar style={{ backgroundColor: '#f56a00' }} size={200} icon={<ProjectOutlined />} />}
                  >
                    <Meta style={{textAlign:'center'}}	 title="100" description="Proyectos Investigativos" />
                  </Card>
                </Col>
                <Col>
                  <Card
                    hoverable
                    style={{ width: 270, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:10}}
                    cover={<Avatar style={{ backgroundColor: '#87d068' }} size={200} icon={<UserOutlined />} />}
                  >
                    <Meta style={{textAlign:'center'}}	 title="500" description="Investigadores" />
                  </Card>
                </Col>
                <Col>
                  <Card
                    hoverable
                    style={{ width: 270, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:10}}
                    cover={<Avatar style={{ backgroundColor: '#1890ff' }} size={200} icon={<ExperimentOutlined />} />}
                  >
                    <Meta style={{textAlign:'center'}}	 title="+ de 150" description="Investigaciones, tesis de grado y postgrados como resultados..." />
                  </Card>
                </Col>
            </Row>
         </>
  )
}