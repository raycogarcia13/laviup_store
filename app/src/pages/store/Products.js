

import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Space,
  Tooltip,
  Form,
  Input,
  Row,
  Empty,
  message,
  Table,
  Modal,
  Typography,
  Upload,
  Popconfirm,
} from "antd";


import { useAuth} from '../../auth'
import { useEffect, useState } from "react";
import { api, public_uri} from "../../config/axios"
import { DeleteOutlined, EditOutlined, FilePdfFilled, ImportOutlined, LoadingOutlined, UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function Home() {

  const data = useAuth();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();

  useEffect( ()=>{
    getData()
  },[])

  const getData = async () =>{
    const uri = '/store/products'
    try{
      const {data} = await api.get(uri);
      if(data.data){
        setProducts(data.data)
      }
    }catch(error){
      setError(error.response.data.error)
    }

  }

  const MisProductos = () =>{

    const [open, setOpen] = useState(false);
    const [open_delete, setOpenDelete] = useState(false);
    const [openImport, setOpenImport] = useState(false);

    const [id,setId] = useState("")
    const [nuevo,setNuevo] = useState({})
    const [action,setAction] = useState("Nueva")
    const [status,setStatus] = useState('')

    const [fileList, setFileList] = useState([]);
    const [fileList2, setFileList2] = useState([]);
    const [uploading, setUploading] = useState(false);
    
    const loading = ()=>{
      return status == 'loading'?true:false
    }
    

    const [form] = Form.useForm();
    const [form2] = Form.useForm();

    const columns = [
      { dataIndex: 'name', key: 'name', title: 'Nombre', },
      { dataIndex: 'photo', key: 'photo', title: 'Foto', render:(item, data)=>{
        return (
          <Space>
            <img style={{width:80}} src={data.imported==true?item:public_uri+item}/>
         </Space>
       )
      } },
      { dataIndex: 'description', key: 'description', title: 'Descripción'},
      { dataIndex: 'price', key: 'price', title: 'Precio'},
      {
        key:'actions', title:'...',
        render: (item)=>{
          return (
             <Space>
              <Tooltip title="Editar">
                <Button onClick={()=>editOpen(item)} >
                  <EditOutlined />  
                </Button>
              </Tooltip>
                
              <Tooltip title="Eliminar">
                <Button danger onClick={()=>deleteOpen(item)} >
                  <DeleteOutlined />  
                </Button>
              </Tooltip>
            </Space>
          )
        }
      }
    ];

    const submitForm = async (values) =>{
      setStatus('loading');
      if(action=='Nueva'){
        const formData = new FormData();
      fileList2.forEach((file) => {
        formData.append('file', file);
      });
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('description', values.description);
      setUploading(true);
        const uri = "/store/products";
        api.post(uri,formData).then(res=>{
          getData();
          setStatus('recived');
          message.success('Producto insertada correctamente')
          handleClose();
        }).catch(err=>{
          message.error(err.message)
        })
      }else{
        // const uri = `/nomenclador/sintoma/${id}`;
        // api.put(uri,values).then(res=>{
        //   getData();
        //   setStatus('recived');
        //   message.success('Síntoma actualizada correctamente')
        //   handleClose();
        // }).catch(err=>{
        //   message.error(err.message)
        // })
      }
    }

    const submitFormImport = async (values) =>{
      setStatus('loading');
      const formData = new FormData();
      fileList2.forEach((file) => {
        formData.append('file', file);
      });
      setUploading(true);
        const uri = "/store/products_import";
        api.post(uri,formData).then(res=>{
          getData();
          setStatus('recived');
          message.success('Productos importados correctamente')
          handleCloseI();
        }).catch(err=>{
          message.error(err.message)
        })
    }

    const onFinishFailed = (errorInfo) => {
      setStatus('error')
      message.error('Error interno')
      console.log('Failed:', errorInfo);
    };

    const editOpen = async (item) => {
      setId(item._id);
      form.setFieldsValue(item);
      setAction('Editar')
      setOpen(true);
    };

    const handleClose = () => {
      setNuevo({})
      form.resetFields();
      setOpen(false);
      setStatus('');
    };

    const handleCloseI = () => {
      form2.resetFields();
      setOpenImport(false);
    };

    const nuevoOpen = () => {
      setAction('Nueva')
      setOpen(true);
    };
    const nuevoOpen2 = () => {
      setOpenImport(true);
    };

    const deleteOpen = async (item) => {
      setId(item._id);
      setOpenDelete(true);
    };

    const deleteProduct = ()=>{
      setStatus('loading')
      const uri = `/store/products/`;
      api.delete(uri).then(res=>{
        setStatus('recived')
        getData();
        handleCloseD();
      })
    }
    const handleCloseD = () => {
      setOpenDelete(false);
      setStatus('');
    };

    const props = {
      onRemove: (file) => {
        setFileList();
      },
      beforeUpload: (file) => {
        setFileList([file]);
        return false;
      },
      fileList,
    };

    const props2 = {
      onRemove: (file) => {
        setFileList2();
      },
      beforeUpload: (file) => {
        setFileList2([file]);
        return false;
      },
      fileList2,
    };

    const removeAll = async ()=>{
      const uri = '/store/products_clear/'+id
      const data = await api.delete(uri)
      getData();
    }


    return <Card title="Listado de productos" extra={<>
          <Space style={{display:'flex', justifyContent:'space-between'}}>
            <Popconfirm
                title="Limpiar todos los productos"
                onConfirm={removeAll}
                okText="Si"
                cancelText="No"
              >
                <Button type="error">Eliminar Todos</Button>
              </Popconfirm>
            <Button onClick={nuevoOpen2} type='info'><FilePdfFilled /></Button>
            <Button onClick={nuevoOpen} type='primary'>Nuevo</Button>
          </Space>
        </>
        }>
    <Table
            dataSource={products}
            columns={columns}
          />


        <Modal
          title={`Eliminar producto`}
          open={open_delete}
          confirmLoading={loading()}
          okText="Enviar"
          onCancel={handleClose}
          cancelText="Cancelar"
          footer={
            <>
              <Button key="btnclose" onClick={handleCloseD}>
                  Cancelar
              </Button>
              <Button type='primary' onClick={deleteProduct} loading={loading()} key="btnsubmit" htmlType="submit">
                  Enviar
              </Button>
            </>
            }
          >
            Está seguro de querer eliminar este producto
        </Modal>

        <Modal
          title={`${action} tipo`}
          open={open}
          confirmLoading={loading()}
          okText="Enviar"
          onCancel={handleClose}
          cancelText="Cancelar"
          footer={
            <>
              <Button key="btnclose" onClick={handleClose}>
                  Cancelar
              </Button>
              <Button type='primary' onClick={form.submit} form={form} loading={loading()} key="btnsubmit" htmlType="submit">
                  Enviar
              </Button>
            </>
            }
          >
           <Form
              form={form}
              name="basic"
              labelCol={{ span: 5 }}
              layout="horizontal"
              initialValues={nuevo}
              onFinish={submitForm}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >
              <Form.Item
                label="Nombre"
                name="name"
                rules={[{ required: true, message: 'Debe insertar el nombre!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Precio"
                name="price"
                rules={[{ required: true, message: 'Debe insertar el precio!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Foto"
                name="photo"
              >
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
              </Form.Item>


              <Form.Item 
                label="Descripción" 
                name="description" 
              >
                <TextArea autoSize={{ minRows: 3, maxRows: 5 }}/>
              </Form.Item>
             
            </Form>
        </Modal>

        <Modal
          title={`Importar productos`}
          open={openImport}
          confirmLoading={loading()}
          okText="Enviar"
          onCancel={handleCloseI}
          cancelText="Cancelar"
          footer={
            <>
              <Button key="btnclose" onClick={handleCloseI}>
                  Cancelar
              </Button>
              <Button type='primary' onClick={form2.submit} form={form2} loading={loading()} key="btnsubmit" htmlType="submit">
                  Enviar
              </Button>
            </>
            }
          >
           <Form
              form={form2}
              name="basic"
              labelCol={{ span: 5 }}
              layout="horizontal"
              initialValues={nuevo}
              onFinish={submitFormImport}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
            >

              <Form.Item
                label="Excel"
                name="file"
              >
                <Upload {...props2}>
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
              </Form.Item>
             
            </Form>
        </Modal>
    </Card>
  }

  
  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}  >
            <Card bordered={false} className="criclebox h-full">
              {
                error 
                ?
                <Alert message={error} type="error"></Alert>
                :
                <MisProductos />
              }
            </Card>
          </Col>
        </Row>

      </div>
    </>
  );
}

export default Home;
