import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {
    Card,
    Button,
    Container, 
    Row,
     Col
} from 'react-bootstrap';
import '../docs/css/views.css'
import SideNavbar from './SideNavbar';
import Loadingbar from './Loadingbar';
import AdminNavbar from './AdminNavbar';
class ViewOwners extends Component {
    constructor (props) {
        super (props);
        this.state = {
          users: [],
          loading:false,
          delete:false
        };
      }
    componentDidMount () {
          this.fetchAllTenants();
    }
    fetchAllTenants = () => {
       this.setState({
         loading:true
       })
        fetch (`https://house-rental-backend.herokuapp.com/tenant/getTenants`, {
          method: 'GET',
        })
          .then (response => response.json ())
          .then (data => {
            console.log ('result', data);
            this.setState ({
              users: data.data,
              loading:false,
              delete:false
            });
          })
          .catch (error => console.log ('error', error));
      };
      deleteTenant = (id) =>{
        this.setState({
          delete:true
        })
        fetch (`https://house-rental-backend.herokuapp.com/tenant/deleteTenant/${id}`, {
          method: 'DELETE',
        })
          .then (data => {
            this.fetchAllTenants()
          })
          .catch (error => {
            this.setState({
              delete:false
            })
            console.log ('error', error)
          });
      }

  

    render() {
      if(this.state.loading || this.state.delete)
      {
          if(this.state.loading)
          {
            return(
              <Loadingbar text="Loading Tenants Details"/>
            )
          }
          else
          {
            return(
              <Loadingbar text="Deleting Tenant Details"/>
            )
          }
          
      }
      else
      {
        if(this.state.users.length!==0)
        {
            return (
                <div>
                  <AdminNavbar/>
                  <Container className="main">
                    <h1 style={{paddingTop:"100px"}}>Tenants List</h1>
                    {this.state.users.map (user => {
                        var d = new Date(user.dob);
                        {/* var planEndDate = new Date (this.state.planEnd); */}
                        var d1 =
                          d.getDate()+
                            '/' +
                            (d.getMonth () + 1) +
                            '/' +
                            d.getFullYear();
                        return (
                        <div className="cards">
                            {/* <Card class="cards">
                                <Card.Body>
                                    <Card.Title>{user.name}</Card.Title>
                                    <Card.Text> */}
                                        {/* Date d=new Date({user.dob}) */}
                                      
                                        <p><b>ID:</b>{user.tenantId}</p>
                                        <p><b>Name:</b>{user.name}</p>
                                        <p><b>Mobile:</b>{user.mobile}</p>
                                        <p><b>Dob:</b>{d1}</p>
                                        <p><b>Gender:</b>{user.gender}</p>
                                        <p><b>Email:</b>{user.email}</p>
                                        <p><b>Aadhar:</b>{user.aadhar}</p>
                                        <p><b>Hno:</b>{user.hno}</p>
                                        <p><b>Village:</b>{user.village}</p>
                                        <p><b>District:</b>{user.district}</p>
                                        <p><b>Pin:</b>{user.pin}</p>
                                        <div style={{display:'flex',justifyContent:'center'}}>
                                            <button onClick={()=>{
                                                    if(window.confirm('Are you sure You want to Delete House ?'))
                                                    {
                                                        this.deleteTenant(user.tenantId);
                                                        alert("Deleted")
                                                    }
                                                    else
                                                    {
                                                      console.log("Not Deleted")   
                                                      alert("Not Deleted")
                                                    }
                                            }}>Delete</button> 
                                      </div>
                        </div> 
                    )}
                            
                    )} 
                  </Container>
                </div>
              )
           }
           else
           {
             return(
               <div>
                  <AdminNavbar />
                 {/* <div className="searchdiv">
                  <select className="drop" name="searchBy" onChange={(event)=>this.handleChange(event)}>
                    <option value="village">Village</option>
                    <option value="district">District</option>
                    <option value="type">Type</option>
                  </select>
                  <div>
                    <input className="search" name="searchText" id="searchText" 
                      placeholder="search By selected field"
                    onChange={(event)=>this.handleSearch(event)}></input>
                  </div>
                </div> */}
                 <h1 style={{marginTop:"100px"}}>No Tenants</h1>
               </div>
             )
           }
      }
    }
}

export default withRouter(ViewOwners)
