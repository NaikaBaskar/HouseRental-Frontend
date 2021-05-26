import React, { Component } from 'react'
import { Card,Button,Image } from 'react-bootstrap';
import { withRouter } from 'react-router';
import one from '../images/download.png'
import SideNavbar from './SideNavbar';
import TenantNavbar from './TenantNavbar';
import '../docs/css/Profile.css'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={
            user:[],
            role:''
        }
    }
    componentDidMount = () =>{
        const t=JSON.parse(localStorage.getItem("user"))
        this.setState({
            role:localStorage.getItem("role"),
            user:t
        })
    } 
    render() {
        var d = new Date(this.state.user.dob);
        var d1 =d.getDate()+'/' +(d.getMonth () + 1) +'/'+d.getFullYear();
        return (
            // <div>
            <div align='center' className="details">
            {localStorage.getItem("role")=="owner" ? 
                <SideNavbar/> : <TenantNavbar/> }
                <div className="Promain">
                <h1 style={{marginTop:"10px"}}>My Profile</h1>  
                <img src={one} alt=''></img>
            <table  className='center' cellpadding='12px' style={{width:"50%"}}>
               <tr>
                    <th className='lefttext'>
                       Id
                   </th>
                   <td>
                       {this.state.role=="owner" ? this.state.user.ownerId : this.state.user.tenantId}
                   </td>
                   </tr>
                  <tr>
                       <th className='lefttext'>
                          Name
                     </th>
                   <td>
                       {this.state.user.name}
                   </td>
                  </tr>
              
               <tr>
                   <th className='lefttext'>
                       Mobile
                   </th>
                   <td>
                       {this.state.user.mobile}
                   </td>
               </tr>
               <tr>
                   <th className='lefttext'>
                       Email
                   </th>
                   <td>
                       {this.state.user.email}
                   </td>
               </tr>
               <tr>
                   <th className='lefttext'>
                       Aadhar
                   </th>
                   <td>
                       {this.state.user.aadhar}
                   </td>

               </tr>
                <tr>
                    <th className='lefttext'>
                        Gender
                    </th>
                    <td>
                        {this.state.user.gender}
                    </td>
                </tr>
                <tr>
                    <th className='lefttext'>
                        Hno
                    </th>
                    <td>
                    {this.state.user.hno}
                    </td>
                </tr>
                <tr>
                    <th className='lefttext'>
                        village
                    </th>
                    <td>
                    {this.state.user.village}
                    </td>
                </tr>
                <tr>
                    <th className='lefttext'>
                       District
                    </th>
                    <td>
                    {this.state.user.district}
                    </td>
                </tr>
                <tr>
                    <th className='lefttext'>
                       Pin
                    </th>
                    <td>
                    {this.state.user.pin}
                    </td>
                </tr>
                 <tr>
                    <th >
                       <button className='Probtn' onClick={()=>this.props.history.goBack()}> Back </button>
                    </th>
                    <td>
                       <button className='Probtn' onClick={() =>{
                        localStorage.setItem("method","PATCH")
                        {localStorage.getItem("role")=="owner" ? 
                        this.props.history.push('/owner/signup') :
                        this.props.history.push('/tenant/signup')
                    }}}>Edit</button>
                    </td>
                </tr>
           </table>
           </div>
        </div>
        )
    }
}

export default withRouter(Profile)
