import { Menu, Button, Divider, Layout } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { BookFilled, BookOutlined, EditFilled, EditOutlined, GroupOutlined, HomeFilled, HomeTwoTone, UngroupOutlined } from '@ant-design/icons';
import { useState } from "react";

const { Sider } = Layout;

function Sidenav({ color, collapsed, setCollapsed }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const page = pathname.replace("/", "");

  console.log(page)

  const items = [
    {
        label:"Tiendas",
        key:'projects',
        icon: <HomeTwoTone />,
        icon_sel: <HomeFilled />,
        link:'/',
    }
  ]

  const onClick = (item)=>{
    const {key} = item
    switch(key){
        case 'home':
                    
    }
  }

  return (
    <Sider theme="light" trigger={null} collapsible collapsed={collapsed}  breakpoint="md"
    collapsedWidth="0"
    onBreakpoint={(broken) => {
      setCollapsed(broken)
    }}
   >
        <div className="logo">
             <img style={{width:"100px"}} src={require('../../assets/images/logo_uij.png')}/>
          </div>
          <Divider></Divider>
        <Menu
          mode="inline"
          onClick={onClick}
        >
             { items.map(it=>{

                return it.type=='divider' ? <Divider style={{fontSize:'0.9em', fontWeight:'bold'}}>{ !collapsed ? it.label:''}</Divider> :

                <Menu.Item key={it.key}>
                <NavLink to={`/admin${it.link}`}>
                    <span style={{background: page === it.key ? color : "",marginInlineEnd:10}}>
                        {
                            page === "admin"+it.link ?
                             it.icon_sel:
                             it.icon
                        }
                    </span>
                    <span style={{display:collapsed ? 'none' : 'inline', fontWeight:page === "admin"+it.link ? 'bold' : 'initial'}}>{it.label}</span>
                </NavLink>
            </Menu.Item>

             }

                

       
             )}
        </Menu>
      </Sider>
  );
}

export default Sidenav;
