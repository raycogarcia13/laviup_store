

import {
  Card,
  Col,
  Row,
  Table,
  Typography,
} from "antd";
// import Echart from "../components/chart/EChart";


function Home() {

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}  >
            <Card bordered={false} className="criclebox h-full">
              <Table>
                
              </Table>
            </Card>
          </Col>
        </Row>

      </div>
    </>
  );
}

export default Home;
