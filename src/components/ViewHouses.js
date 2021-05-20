import React from 'react';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import {withRouter} from 'react-router-dom'
import SearchField from "react-search-field";
import FileSaver from 'file-saver'
import SideNavbar from './SideNavbar';
import TenantNavbar from './TenantNavbar';
import Loadingbar from './Loadingbar';
import AdminNavbar from './AdminNavbar';
import '../docs/css/views.css'
class ViewHouses extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      houses: [],
      loading:false,
      searchBy:'village',
      searchText:'',
      temphouses:[],
      request:false
    };
  }
  componentDidMount () {
      this.setState({
        loading:true
      })
      this.fetchAllHouses ();

  }

  fetchAllHouses = () => {
    fetch (localStorage.getItem("role")=="admin" ? `https://house-rental-backend.herokuapp.com/house/getHouses` : `https://house-rental-backend.herokuapp.com/house/getVacantHouses`, {
      method: 'GET',
      responseType:"blob"
    })
      .then (response => response.json ())
      .then (data => {
        console.log ('result', data);
        this.setState ({
          houses: data.data,
          temphouses:data.data,
          loading:false,
          request:false
        });
      })
      .catch (error => {
        this.setState ({
          loading:false,
          request:false
        });
        console.log ('error', error)});
  };
  sendRequest =  (hid,oid) =>{
    this.setState({
      request:true
    })
    let t=JSON.parse(localStorage.getItem("user"))
    let tid=t.tenantId
    fetch (`https://house-rental-backend.herokuapp.com/housesOwned/add`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        houseId:hid,
        ownerId:oid,
        tenantId:tid,
        status:0
      }),
    }).then(res =>res.json())
      .then (res => {
        if (res.code === 200) {
          console.log("Request Sent..")
          // document.getElementById ('register').innerHTML = 'Created';
          alert('Request Sent');
          this.fetchAllHouses()
          // this.props.history.push("#")
        } else if (res.code === 400) {
          this.setState({
            request:true
          })
          document.getElementById ('register').innerHTML ="All Fields are Mandatory"
          //   'Mobile already taken';
          console.log("Error in Sending Request");
        }
      })
      .catch (err => {
        this.setState({
          request:true
        })
        console.log (err);
      })
  }
  handleChange = evt => {
    this.setState ({
      [evt.target.name]: evt.target.value,
    },()=>{
      var text=document.getElementById('searchText').value;
      this.setState({
        ...this.state,
        temphouses:this.filterSearch(text)
      })
    })
  };
filterSearch = (text)=>
{
  return this.state.houses.filter((house,index)=>{
    return house[this.state.searchBy].toLowerCase().includes(text);
  })
}
handleSearch = (event)=>
{
  // console.log(event.target.value);
  var text=event.target.value.toLowerCase().trim();
  this.setState({
    ...this.state,
    temphouses:this.filterSearch(text)
  })
}
  render () {
    if(this.state.loading || this.state.request)
    {
      if(this.state.loading)
      {
        return(
          <Loadingbar text="Loading Houses"/>
        )
      }
      else
      {
        return(
          <Loadingbar text="Sending Request"/>
        )
      }
    }
    else
    {
      if(this.state.temphouses.length!==0)
      {
        return (
          <div>
           {localStorage.getItem("role")=="admin" ? <AdminNavbar /> : <TenantNavbar/>} 
          <div className="searchdiv">
          
            <select className="drop" name="searchBy" onChange={(event)=>this.handleChange(event)}>
              <option value="village">Village</option>
              <option value="district">District</option>
              <option value="type">Type</option>
            </select>
            <div>
              <input className="search" name="searchText" id="searchText" 
                placeholder="search By selected field"
              onChange={(event)=>this.handleSearch(event)}></input>
              {/* <button style={{backgroundColor:"white",height:"30px",borderStyle:"none",padding:"0px",width:"150px"}}>Search</button> */}
            </div>
        </div>

          {/* <div className="searchdiv">
            <div className="search" name="searchBy" onChange={(event)=>this.handleDropdown(event)}>
            <select value="none" className="dropdown" name>
            <option value="village">Village</option>
            <option value="district">District</option>
            <option value="ownerId">OwnerId</option>
            <option value="type">Type</option>
          </select>
            <SearchField
                name="searchText" 
                id="searchText" 
                placeholder="search By selected col"
                onChange={(event)=>this.handleSearch(event)}
            />
            </div>
          </div> */}
          <Container className="main text-center" style={{marginTop:"70px"}}>
              <h1 >Houses List</h1>
                    { this.state.temphouses.map ((house,index) => { 
                      
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
                              {/* <p >
                                onClick={() => {
                                FileOutputStream f = new FileOutputStream("Downloads/hello.pdf");
                                f.write(Base64.decode(file, Base64.NO_WRAP));
                                f.close();
                              }}>
                              <b>Document:</b> Download</p> */}
                              <p><b>Document:</b><a href={"data:application/pdf;base64,"+house.houseDocument} download="file.pdf">Download</a></p>
                              <div style={{display:'flex',justifyContent:'center'}}>
                                {localStorage.getItem("role")=="admin" ? null :
                                    <button onClick={() => {
                                      this.sendRequest(house.houseId,house.ownerId,)}}>Request</button> }
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
             {localStorage.getItem("role")=="admin" ? <AdminNavbar /> : <TenantNavbar/>} 
             <div className="searchdiv">
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
            </div>
             <h1 style={{marginTop:"100px"}}>No Houses</h1>
           </div>
         )
       }
     }  
  }
}

export default  withRouter(ViewHouses);

