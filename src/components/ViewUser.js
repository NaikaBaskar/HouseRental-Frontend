import React, { Component } from 'react'
import { Card,Button,Image } from 'react-bootstrap';
import { withRouter } from 'react-router';
import profilepic from '../images/profile.png'
import Loadingbar from './Loadingbar';
import SideNavbar from './SideNavbar';
import TenantNavbar from './TenantNavbar';

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

        if(localStorage.getItem("role")=="tenant")
        {
            fetch (`https://house-rental-backend.herokuapp.com/owner/getOwner/${localStorage.getItem("userId")}`, {
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
          .catch (error => console.log ('error', error));
        }
        else
        {
            fetch (`https://house-rental-backend.herokuapp.com/tenant/getTenant/${localStorage.getItem("userId")}`, {
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
                .catch (error => console.log ('error', error));
        }
    }
    render() {
        var d = new Date(this.state.user.dob);
        var d1 =d.getDate()+'/' +(d.getMonth () + 1) +'/'+d.getFullYear();
        if(this.state.loading)
        {
            return(
                <div>
                    <Loadingbar text="Loading Details"/>
                </div>
            )
        }
        else
        {
            return (
                <div>
                    {localStorage.getItem("role")=="owner" ? 
                    <SideNavbar/> : <TenantNavbar/> }
                <div className="center" style={{marginLeft:"20%",marginRight:"20%", alignItems:"center",justifyContent:"center", border:"3px solid black"}}>
                    <Image src={profilepic} style={{width:"350px",height:"250px"}} alt="Loading"></Image>
                    <p><b>ID:</b> {localStorage.getItem("userId")}</p>
                    <p><b>Name:</b>{this.state.user.name}</p>
                    <p><b>Mobile:</b>{this.state.user.mobile}</p>
                    <p><b>Dob:</b>{d1}</p>
                    <p><b>Gender:</b>{this.state.user.gender}</p>
                    <p><b>Email:</b>{this.state.user.email}</p>
                    <p><b>Aadhar:</b>{this.state.user.aadhar}</p>
                    <p><b>Hno:</b>{this.state.user.hno}</p>
                    <p><b>Village:</b>{this.state.user.village}</p>
                    <p><b>District:</b>{this.state.user.district}</p>
                    <p><b>Pin:</b>{this.state.user.pin}</p>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <button onClick={()=>this.props.history.goBack()}>Back</button>
                    </div>
                </div>
                </div>
            )
        }   
    }
}

export default withRouter(ViewUser)
