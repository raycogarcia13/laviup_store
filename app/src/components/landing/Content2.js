import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Row, Col } from 'antd';
import {OverPack} from 'rc-scroll-anim';

import fondo from "../../assets/images/fondo2.png"

function Content1(props) {
  const { ...tagProps } = props;
  const { dataSource, isMobile } = tagProps;
  delete tagProps.dataSource;
  delete tagProps.isMobile;
  const animType = {
    queue: isMobile ? 'bottom' : 'right',
    one: isMobile
      ? {
          scaleY: '+=0.3',
          opacity: 0,
          type: 'from',
          ease: 'easeOutQuad',
        }
      : {
          x: '-=30',
          opacity: 0,
          type: 'from',
          ease: 'easeOutQuad',
        },
  };
  return (
    <div {...tagProps} {...dataSource.wrapper} style={{marginTop:'35vh'}}>
      <OverPack {...dataSource.OverPack} component={Row}>
        <QueueAnim
          key="text"
          type={animType.queue}
          leaveReverse
          ease={['easeOutQuad', 'easeInQuad']}
          component={Col}
          style={{display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'center'}}
          componentProps={{
            md: 14,
            xs: 24,
          }}
        >
          <h2 key="h1" >
            Todo empieza con una idea !!!
          </h2>
          <div key="p" style={{width:'40vw'}}>
              Convierte la idea en ciencia y contribuye al desarrollo de tu comunidad. No esperes más, tu también puedes.
          </div>
        </QueueAnim>
        <TweenOne
          key="img"
          resetStyle
          component={Col}
          componentProps={{
            md: dataSource.imgWrapper.md,
            xs: dataSource.imgWrapper.xs,
          }}
          style={{display:'flex', alignItems:'center', justifyContent:'center'}}
        >
          <span>
            <img src={fondo} width="100%" alt="img" />
          </span>
        </TweenOne>
      </OverPack>
    </div>
  );
}

export default Content1;
