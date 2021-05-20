import React from 'react';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import {withRouter} from 'react-router-dom'
import '../docs/css/views.css'
import SideNavbar from './SideNavbar';
import Loadingbar from './Loadingbar';
class ViewHouses extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      houses: [],
      loading:false,
      vacate:false
    };
  }
  componentDidMount () {
    this.setState({
      loading:true
    })
      this.fetchAllHouses ();
  }

  fetchAllHouses = () => {
    let res=JSON.parse(localStorage.getItem("user"))
    console.log(res.ownerId)
    fetch (`https://house-rental-backend.herokuapp.com/housesOwned/filledHouses/${res.ownerId}`, {
      method: 'GET',
      responseType:"blob"
    })
      .then (response => response.json ())
      .then (data => {
        console.log ('result', data);
        this.setState ({
          houses: data.data,
          loading:false,
          vacate:false
        });
      })
      .catch (error => console.log ('error', error));
  };
  cancel = (hid) => {
    this.setState({
      vacate:true
    })
    fetch (`https://house-rental-backend.herokuapp.com/housesOwned/deleteHouseOwned/${hid}`, {
      method: 'DELETE',
    })
      .then (data => {
        console.log("Vacated")
        this.fetchAllHouses()
      })
      .catch (error => {
        this.setState({
          vacate:false
        })
        console.log ('error', error)
      });

  }
  render () {
    if(this.state.loading || this.state.vacate)
    {
      if(this.state.loading)
      {
        return(
          <Loadingbar text="Loading Filled Houses"/>
        )
      }
      else
      {
        return(
          <Loadingbar text="Vacating Tenant"/>
        )
      }
      
    }
    else
    {
        if(this.state.houses.length!==0)
        {
            return (
            <div >
            <SideNavbar/>
            <Container className="main">
                <h1 style={{paddingTop:"100px"}}>Filled Houses</h1>
                        { this.state.houses.map ((house,index) => { 
                        
                        // document.body.appendChild(link)
                            return (
                                <div className="housecards" id="doc">
                                <Image className="houseImage" src={"data:image/png;base64,"+ house.housePic} width="350px" height="250px"/>
                                <p><b>HouseId:</b>{house.houseId}</p>
                                <p><b>TenantId:</b>{house.tenantId}</p>
                                <p><b>Cost:</b>{house.cost}</p>
                                <p><b>Features:</b>{house.features}</p>
                                <p><b>Description:</b>{house.description}</p>
                                <p><b>Type:</b>{house.type}</p>
                                <p><b>OwnerId:</b>{house.ownerId}</p>
                                <p><b>Hno:</b>{house.hno}</p>
                                <p><b>Village:</b>{house.village}</p>
                                <p><b>District:</b>{house.district}</p>
                                <p><b>Pin:</b>{house.pin}</p>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                <button onClick = {() => {
                                  if(window.confirm('Are you sure You want to Vacate Tenant?'))
                                  {
                                      this.cancel(house.houseId);
                                      alert("Vacated")
                                  }
                                  else
                                  {
                                    console.log("Not Deleted")   
                                    alert("Not Vacated")
                                  }
                                }}>Vacate</button>
                                <button onClick = {() =>{
                                      localStorage.setItem("userId",house.tenantId)
                                      this.props.history.push('/viewUser')
                                    }}>View Tenant</button> 
                                </div>
                                
                            </div> 
                            )}
                                
                        )} 
                </Container>
            </div>
            );
        }
        else
        {
            return (
                <div>
                      <SideNavbar/>
                    <h1 style={{marginTop:"100px"}}>No Filled Houses</h1>
                </div>
            )
        }
    }
  }
}
export default  withRouter(ViewHouses);

