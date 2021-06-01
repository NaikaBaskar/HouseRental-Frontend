import React from 'react'
import NavBar from './NavBar'
import {Link, withRouter} from 'react-router-dom'
import '../docs/css/Home.css';


class Header extends React.Component{
    render()
    {
        return (
            <div id="main">
                <NavBar />
                <section id='home'>
                <div className="name">
                    <h1>Need home for Rent?<br></br><span> We got your back!</span></h1>
                    <p className="details" style={{textAlign:'center'}}><b> Whatever be your budget, whatever you may call a home <br></br>(a bed, a room or an entire house)
                    <br></br> <b>WE are here for you!</b></b>
                    </p>
                    <a  className="cv-btn" onClick={ ()=>{
                        this.props.history.push(`/owner/login`)
                    }}>I'm an Owner</a>
                    <a  className="cv-btn" onClick={ ()=>{
                        this.props.history.push(`/tenant/login`)}}>I'm a Tenant</a>
                </div>
                </section>
            </div>
        )
   }
}

export default withRouter(Header)
