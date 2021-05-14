import React from 'react';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import {withRouter} from 'react-router-dom'
import FileSaver from 'file-saver'
// import fs from 'fs'
// import  PDFDocument from 'pdfkit';
import '../docs/css/views.css'
import SideNavbar from './SideNavbar';
import TenantNavbar from './TenantNavbar';
import Loadingbar from './Loadingbar';
// import { link } from 'pdfkit/js/mixins/annotations';
class VacantHousesOfOwner extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      houses: [],
      loading:false
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
    fetch (`https://house-rental-backend.herokuapp.com/house/getVacantHousesOfOwner/${res.ownerId}`, {
      method: 'GET',
      responseType:"blob"
    })
      .then (response => response.json ())
      .then (data => {
        console.log ('result', data);
        this.setState ({
          houses: data.data,
          loading:false
        });
      })
      .catch (error => console.log ('error', error));
  };
  deleteHouse = (id) =>{
    fetch (`https://house-rental-backend.herokuapp.com/house/deleteHouse/${id}`, {
      method: 'DELETE',
    })
      .then (data => {
        console.log("Deleted")
        this.fetchAllHouses()
      })
      .catch (error => console.log ('error', error));
  }
  render () {
    if(this.state.loading)
    {
        return (
            <Loadingbar />
        )
    }
    else
    {
            if(this.state.houses.length!==0)
            {
                return (
                <div >
                <SideNavbar/>
                <Container className="main">
                    <h1>Vacant Houses List</h1>
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
                                    <div style={{display:'flex',justifyContent:'center'}}>
                                    <button onClick={() => {
                                  localStorage.setItem("method1","PATCH")
                                  localStorage.setItem("house",JSON.stringify(house))
                                  // let h=JSON.parse(localStorage.getItem("house"))
                                  // console.log(h.houseId)
                                  // console.log(localStorage.getItem("house"))
                                  this.props.history.push('/house/add')
                                }}>Edit</button>
                                    <button onClick={()=>{
                                        if(window.confirm('Are you sure You want to Delete House ?'))
                                        {
                                            this.deleteHouse(house.houseId);
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
                );
            }
            else
            {
                return (
                    <div>
                        <SideNavbar/>
                        <h1>No Vacant Houses</h1>
                    </div>
                )
            }
    }    
  }
}

export default  withRouter(VacantHousesOfOwner);

