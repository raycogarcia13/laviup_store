import { Menu, Button, Divider, Layout } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { BookFilled, BookOutlined, DesktopOutlined, EditFilled, EditOutlined, GroupOutlined, HomeFilled, HomeTwoTone, SolutionOutlined, UngroupOutlined } from '@ant-design/icons';
import { useState } from "react";

const { Sider } = Layout;

function Sidenav({ color, collapsed, setCollapsed }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const page = pathname.replace("/", "");

  console.log(page)

  const items = [
    {
        label:"Inicio",
        key:'inicio',
        icon: <HomeTwoTone />,
        icon_sel: <HomeFilled />,
        link:'/',
    },
    {
        label:"Productos",
        key:'products',
        icon: <DesktopOutlined />,
        icon_sel: <DesktopOutlined />,
        link:'/products',
    },
    {
        label:"Tienda",
        key:'store',
        icon: <EditOutlined />,
        icon_sel: <EditFilled />,
        link:'/edit',
    }
  ]

  const onClick = (item)=>{
    const {key} = item
    // switch(key){
    //     case 'inicio':
    // }
  }

  return (
    <Sider theme="light" trigger={null} collapsible collapsed={collapsed}  breakpoint="md"
    collapsedWidth="0"
    onBreakpoint={(broken) => {
      setCollapsed(broken)
    }}
   >
        <div className="logo">
             <img style={{width:"200px"}} src={require('../../assets/images/logo.png')}/>
          </div>
          <Divider></Divider>
        <Menu
          mode="inline"
          onClick={onClick}
        >
             { items.map(it=>{

                return it.type=='divider' ? <Divider style={{fontSize:'0.9em', fontWeight:'bold'}}>{ !collapsed ? it.label:''}</Divider> :

                <Menu.Item key={it.key}>
                <NavLink to={`/store${it.link}`}>
                    <span style={{background: page === it.key ? color : "",marginInlineEnd:10}}>
                        {
                            page === "store"+it.link ?
                             it.icon_sel:
                             it.icon
                        }
                    </span>
                    <span style={{display:collapsed ? 'none' : 'inline', fontWeight:page === "store"+it.link ? 'bold' : 'initial'}}>{it.label}</span>
                </NavLink>
            </Menu.Item>

             }

                

       
             )}
        </Menu>
      </Sider>
  );
}

export default Sidenav;
