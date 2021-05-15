import React from 'react';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import {withRouter} from 'react-router-dom'
import FileSaver from 'file-saver'
import '../docs/css/views.css'
import SideNavbar from './SideNavbar';
import Loadingbar from './Loadingbar';
import TenantNavbar from './TenantNavbar';
class PendingHouses extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      houses: [],
      loading:false,
      cncl:false
    };
  }
  componentDidMount () {
      this.setState({
        loading:true
      })
      this.fetchAllHouses ();
  }

  fetchAllHouses = () => {
    const t=JSON.parse(localStorage.getItem("user"))
    const id=t.tenantId
    fetch (`https://house-rental-backend.herokuapp.com/housesOwned/pendingHouses/${id}`, {
      method: 'GET',
      responseType:"blob"
    })
      .then (response => response.json ())
      .then (data => {
        console.log ('result', data);
        this.setState ({
          houses: data.data,
          loading:false,
          cncl:false
        });
      })
      .catch (error => console.log ('error', error));
  };
  cancel = (hid) => {
    this.setState({
      cncl:true
    })
    fetch (`https://house-rental-backend.herokuapp.com/housesOwned/deleteHouseOwned/${hid}`, {
      method: 'DELETE',
    })
      .then (data => {
        console.log("Deleted")
        this.fetchAllHouses()
      })
      .catch (error => {
        this.setState({
          cncl:false
        })
        console.log ('error', error)});

  }
  render () {
    if(this.state.loading || this.state.cncl)
    {
      if(this.state.loading)
      {
        return(
          <div>
            <Loadingbar text="Loading Pending Houses..."/>
          </div>
        )
      }
      else
      {
        return(
          <div>
            <Loadingbar text="Cancelling Request..."/>
          </div>
        )
      }
     
    }
    else
    {
      if(this.state.houses.length!=0)
      {
          return (
            <div >
            <TenantNavbar/>
            <Container className="main">
                <h1>Pending Houses</h1>
                      { this.state.houses.map ((house,index) => { 
                        
                        // document.body.appendChild(link)
                          return (
                              <div className="housecards" id="doc">
                                <Image className="houseImage" src={"data:image/png;base64,"+ house.housePic} width="350px" height="250px"/>
                                <p><b>Id:</b>{house.houseId}</p>
                                <p><b>Cost:</b>{house.cost}</p>
                                <p><b>Features:</b>{house.features}</p>
                                <p><b>Description:</b>{house.description}</p>
                                <p><b>Type:</b>{house.type}</p>
                                <p><b>OwnerId:</b>{house.ownerId}</p>
                                <p><b>Hno:</b>{house.hno}</p>
                                <p><b>Village:</b>{house.village}</p>
                                <p><b>District:</b>{house.district}</p>
                                <p><b>Pin:</b>{house.pin}</p>
                                <p><b>Document:</b><a href={"data:application/pdf;base64,"+house.houseDocument} download="file.pdf">Download</a></p>
                                <div style={{display:'flex',justifyContent:'center'}}>
                                    <button onClick={() =>{
                                    if(window.confirm('Are you sure You want to cancel Request ?'))
                                    {
                                        this.cancel(house.houseId);
                                        alert("Deleted")
                                    }
                                    else
                                    {
                                      console.log("Not Deleted")   
                                      alert("Not Deleted")
                                    }
                                }}>Cancel</button>
                                    <button onClick = {() =>{
                                      localStorage.setItem("userId",house.ownerId)
                                      this.props.history.push('/viewUser')
                                    }}>View Owner</button> 
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
        return(
          <div>
            <TenantNavbar />
            <h1>No Houses</h1>
          </div>
        )
      }

    }
  }
}

export default  withRouter(PendingHouses);

