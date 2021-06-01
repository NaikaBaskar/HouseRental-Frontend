import React, { Component } from 'react'
import { Card,Button,Image } from 'react-bootstrap';
import { withRouter } from 'react-router';
import AdminNavbar from './AdminNavbar';
import Loadingbar from './Loadingbar';
import SideNavbar from './SideNavbar';
import TenantNavbar from './TenantNavbar';
import one from '../images/download.png'
import '../docs/css/Profile.css'

class ViewUser extends Component {
    constructor(props) {
        super(props);
        this.state={
            user:[],
            loading:false
        }
    }
    componentDidMount(){
        this.setState({
            loading:true
        })
        this.fetchUser()
    } 
    fetchUser = () => {
        if(localStorage.getItem("role")=="admin")
        {
            fetch (localStorage.getItem("details")=="owner" ? `https://house-rental-backend.herokuapp.com/owner/getOwner/${localStorage.getItem("userId")}` : `https://house-rental-backend.herokuapp.com/tenant/getTenant/${localStorage.getItem("userId")}`, {
                method: 'GET',
               })
                .then (response => response.json ())
                .then (data => {
                  console.log ('result', data);
                  this.setState ({
                    user: data.data,
                    loading:false
                  });
                })
                .catch (error => {
                    console.log ('error', error)
                    this.setState ({
                        loading:false
                      });
                });
        }
        else
        {
            fetch (localStorage.getItem("role")=="tenant" ? `https://house-rental-backend.herokuapp.com/owner/getOwner/${localStorage.getItem("userId")}` : `https://house-rental-backend.herokuapp.com/tenant/getTenant/${localStorage.getItem("userId")}`, {
            method: 'GET',
           })
          .then (response => response.json ())
          .then (data => {
            console.log ('result', data);
            this.setState ({
              user: data.data,
              loading:false
            });
          })
          .catch (error => {
            this.setState ({
                loading:false
              })
              console.log ('error', error)});
        }
        
    }
    render() {
        if(this.state.loading)
        {
            return(
                <div>
                    <Loadingbar text="Loading User Details"/>
                </div>
            )
        }
        else
        {
            var d = new Date(this.state.user.dob);
            var d1 =d.getDate()+'/' +(d.getMonth () + 1) +'/'+d.getFullYear();
            return (
                <div align='center' className="details">
            {localStorage.getItem("role")=="owner" ? 
                    <SideNavbar/> : localStorage.getItem("role")=="admin" ? <AdminNavbar/> : <TenantNavbar/> }
                <div className="Promain">
                <h1 style={{marginTop:"10px"}}>User Details</h1>  
                <img src={one} alt=''></img>
            <table  className='center' cellpadding='12px'>
               <tr>
                    <th className='lefttext'>
                       UserId
                   </th>
                   <td>
                       {localStorage.getItem("userId")}
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
                    <th>
                       <button className='Probtn' onClick={()=>this.props.history.goBack()}> Back </button>
                    </th>
                    {/* <td>
                       <button className='Probtn' onClick={() =>{
                        localStorage.setItem("method","PATCH")
                        {localStorage.getItem("role")=="owner" ? 
                        this.props.history.push('/owner/signup') :
                        this.props.history.push('/tenant/signup')
                    }}}>Edit</button>
                    </td> */}
                </tr>
           </table>
           </div>
        </div>
           
    )}
}

}

export default withRouter(ViewUser)
