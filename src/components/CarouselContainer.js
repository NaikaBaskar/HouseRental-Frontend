import React from "react";
import Carousel from 'react-bootstrap/Carousel';
// import 'bootstrap/dist/css/bootstrap.min.css';

import f1 from "./../images/k1.jpg"
import f2 from "./../images/k4.jpg"
import f3 from "./../images/k3.jpg"
import { withRouter } from "react-router";

class CarouselContainer extends React.Component{
    constructor(props){
        super(props);
    }   
    render()
    {

         return (
                <Carousel fade={true} pause={false}>
                <Carousel.Item interval={3000}>
                    <img
                    className="d-block "
                    src={f1}
                    alt="First slide"

                    style={{width:"100%",height:"600px"}}/>
                    <Carousel.Caption>
                    <h2 className="cv-btn" onClick={ ()=>{
                        console.log('button clicked');
                        this.props.history.push(`/owner/login`)
                    }}>Owner</h2>
                    <h2 className="cv-btn" onClick={ ()=>{
                        this.props.history.push(`/tenant/login`)
                    }}>Tenant</h2>
                    {/* <div className="s-b-text"> */}
                        <h3 style={{color:"#000000",background:"#f1ebeb"}}><b>Need a Home for Rent, We Got Your Back!</b></h3>
                    {/* </div> */}
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                    className="d-block "
                    src={f2}
                    alt="Second slide"
                                        style={{width:"100%",height:"600px"}}
                    // width:100px,height:200px
                    />
                    <Carousel.Caption>
                    <h2 className="cv-btn" onClick={ ()=>{
                        this.props.history.push(`/owner/login`)
                    }}>Owner</h2>
                    <h2 className="cv-btn" onClick={ ()=>{
                        this.props.history.push(`/tenant/login`)
                    }}>Tenant</h2>
                    <h3 style={{color:"#000000",background:"#f1ebeb"}}><b>Whatever you call a home,We have something for you!</b></h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item  interval={3000}>
                    <img
                    className="d-block "
                    src={f3}
                    alt="Third slide"

                    style={{width:"100%",height:"600px"}}/>
                    <Carousel.Caption>
                    <h2 className="cv-btn" onClick={ ()=>{
                        this.props.history.push(`/owner/login`)
                    }}>Owner</h2>
                    <h2 className="cv-btn" onClick={ ()=>{
                        this.props.history.push(`/tenant/login`)
                    }}>Tenant</h2>
                    <h3 style={{color:"#000000",background:"#f1ebeb"}}><b>Make Your Dream of Having a Good Home Come True!</b></h3>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
    )
   }
}

export default  withRouter(CarouselContainer);