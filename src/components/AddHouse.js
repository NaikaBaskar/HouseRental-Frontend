import React from 'react';
import '../docs/css/login.css';
import {withRouter} from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Alert,
  Table,
} from 'react-bootstrap';
import SideNavbar from './SideNavbar';
import Loadingbar from './Loadingbar';

class AddHouse extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
     add:false,
     update:false, 
     house:
     {
        cost: '',         
        features:'',
        description:'',
        type:'',
        ownerId:'',
        hno:'',
        village:'',
        district:'',
        pin:'',
        housePic:'',
        houseDocument:'',
    },
    userId:''
  };
    this.handleChange = this.handleChange.bind (this);
    this.handleImage=this.handleFile.bind(this);
  }
  handleChange (event) {
      this.setState ({
        house: Object.assign ({}, this.state.house, {
            [event.target.name]: event.target.value,
        }),
      });
  }
  componentDidMount = () =>{
    if(localStorage.getItem("method1")=="PATCH")
    {
      let t=JSON.parse(localStorage.getItem("house"))
      this.setState ({
        house:t
      });
    }
    else
    {
      let t=JSON.parse(localStorage.getItem("user"))
      this.setState ({
        userId:t.ownerId
      });
    }
    
  }

  handleFile= event => {
    this.setState({
      house:Object.assign ({},this.state.house,{
        [event.target.name]:event.target.files[0],
      }),
    })
  }

handleSubmit = (event) =>{
      event.preventDefault()
    if (
      this.state.house.cost=='' ||
      this.state.house.features.trim()=='' ||
      this.state.house.description.trim()==''||
      this.state.house.type.trim()=='' ||

      this.state.house.hno.trim()=='' ||
      this.state.house.village.trim()==''||
      this.state.house.district.trim()=='' ||
      this.state.house.pin==''
    ) {
      document.getElementById ('register').innerHTML =
        'Fields Cannot be Empty';
      document.getElementById ('register').style.visibility='visible';
    }
    else {
      {localStorage.getItem("method1")=="POST" ?
      this.setState({
        add:true
      }) :
      this.setState({
        update:true
      })
    }
      document.getElementById('register').style.visibility='hidden';
      console.log("Adding")
      const data=new FormData()
      data.append('cost',this.state.house.cost);
      data.append('features',this.state.house.features);
      data.append('description',this.state.house.description);
      data.append('type',this.state.house.type);
      data.append('ownerId',this.state.userId);
      data.append('housePic',this.state.house.housePic);
      data.append('houseDocument',this.state.house.houseDocument);
      data.append('hno',this.state.house.hno);
      data.append('village',this.state.house.village);
      data.append('district',this.state.house.district);
      data.append('pin',this.state.house.pin);
      {localStorage.getItem("method1")=="POST" ? 
      fetch (`https://house-rental-backend.herokuapp.com/house/add`, {
                  method: 'POST',
                  body:data
                }).then (res => {
                    this.setState({
                      add:false,
                      update:false
                    })
                    if (res.ok) {
                      console.log("Inserted")
                      document.getElementById ('register').innerHTML = 'Created';
                      alert('House added');
                      // this.props.history.push ('/owner/login');
                      this.props.history.goBack()
                    } else{
                      document.getElementById ('register').innerHTML ="All Fields are Mandatory"
                      //   'Mobile already taken';
                      console.log("Error in Adding House.....");
                    }
                  })
                  .catch (err => {
                    this.setState({
                      add:false,
                      update:false
                    })
                    console.log (err);
                  }) :

                  fetch (`https://house-rental-backend.herokuapp.com/house/updateHouse/${this.state.house.houseId}`, {
                    method: 'PUT',
                    body:data
                  }).then (res => {
                    this.setState({
                      add:false,
                      update:false
                    })
                      if (res.ok) {
                        console.log("Updated")
                        document.getElementById ('register').innerHTML = 'Updated';
                        alert('Details Updated');
                        // this.props.history.push ('/owner/login');
                        this.props.history.goBack()
                      } else{
                        document.getElementById ('register').innerHTML ="All Fields are Mandatory"
                        //   'Mobile already taken';
                        console.log("Error in Updating.....");
                      }
                    })
                    .catch (err => {
                      this.setState({
                        add:false,
                        update:false
                      })
                      console.log (err);
                    })

            }
        }
    }

  render () {
  if(this.state.add || this.state.update)
  {
       if(this.state.add)
       {
          return(
            <Loadingbar  text="Adding House please wait.."/>
          )
       }
       else
       {
        return(
          <Loadingbar  text="Updating House please wait.."/>
        )
       }
  }
  else
  {
    return (
      <div id="backdesign">
        <SideNavbar />
      <div className="form  bg-white">
        {localStorage.getItem("method1")=="POST"?<h1>Add House</h1>:<h1>Update House</h1>}
        {localStorage.getItem("method1")=="POST" ? null  :
        <FormGroup className="form-inline">
          <FormLabel>HouseId</FormLabel>
          <FormControl
            type="number"
            name="houseId"
            placeholder="HouseId"
            onChange={this.handleChange}
            value={this.state.house.houseId}
            disabled={localStorage.getItem("method1")=="PATCH" ? true  : false}
            className="input ml-3"
            required
          />
        </FormGroup> 
        }
        <FormGroup className="form-inline">
          <FormLabel>Cost</FormLabel>
          <FormControl
            type="number"
            name="cost"
            placeholder="Cost"
            onChange={this.handleChange}
            value={this.state.house.cost}
            className="input col-xl-8"
            onWheel={event => { 
              event.target.blur()}}
            required
          />
        </FormGroup>
        <FormGroup className="form-inline">
          <FormLabel>Features</FormLabel>
          <FormControl
            type="text"
            name="features"
            placeholder="Features"
            onChange={this.handleChange}
            value={this.state.house.features}
            className="input col-xl-8"
            required
          />
        </FormGroup>
        <FormGroup className="form-inline">
              <FormLabel>Description</FormLabel>
              <FormControl
                type="text"
                name="description"
                placeholder="Description"
                onChange={this.handleChange}
                value={this.state.house.description}
                className="input ml-3"
                required
              />
          </FormGroup>
          <FormGroup id="radio-btn" className="form-inline">
          <FormLabel id="label1">Type</FormLabel>
          <fieldset id="radio" >
          
            <Form.Group className="input form-inline" onChange={this.handleChange}>
            
                <Form.Check 
                  type="radio"
                  label="2-BHK"
                  name="type"
                  id="2-BHK"
                  onChange={this.handleChange}
                  value="2-BHK"
                />
                <Form.Check
                  type="radio"
                  label="4-BHK"
                  name="type"
                  id="4-BHK"
                  onChange={this.handleChange}
                  value="4-BHK"
                />
                <Form.Check 
                  type="radio"
                  label="Other"
                  name="type"
                  id="other"
                  onChange={this.handleChange}
                  value="Other"
                />
            </Form.Group>
            
          </fieldset>
          </FormGroup>
        <FormGroup className="form-inline">
          <FormLabel>Image</FormLabel>
          <FormControl
            type="file"
            name="housePic"
            placeholder="Upload House Image"
            onChange={this.handleFile}
            // value={this.state.house.housePic}
            className="input ml-3 housePic"
            required
          />
        </FormGroup>
        <FormGroup className="form-inline">
          <FormLabel>Document</FormLabel>
          <FormControl
            type="file"
            name="houseDocument"
            // value={this.state.house.houseDocument}
            onChange={this.handleFile}
            placeholder="Upload House Document"
            className="input ml-3 houseDocument"
            required
          />
        </FormGroup>
        <FormGroup className="form-inline">
          <FormLabel>Hno</FormLabel>
          <FormControl
            type="text"
            name="hno"
            value={this.state.house.hno}
            onChange={this.handleChange}
            placeholder="H.No"
            className="input ml-3"
            required
          />
        </FormGroup>
        <FormGroup className="form-inline">
          <FormLabel>Village</FormLabel>
          <FormControl
            type="text"
            name="village"
            value={this.state.house.village}
            onChange={this.handleChange}
            placeholder="Village"
            className="input ml-3"
            required
          />
        </FormGroup>
        <FormGroup className="form-inline">
          <FormLabel>District</FormLabel>
          <FormControl
            type="text"
            name="district"
            value={this.state.house.district}
            onChange={this.handleChange}
            placeholder="District"
            className="input ml-3"
            required
          />
        </FormGroup>
        <FormGroup className="form-inline">
          <FormLabel>Pin</FormLabel>
          <FormControl
            type="number"
            name="pin"
            value={this.state.house.pin}
            onChange={this.handleChange}
            placeholder="Pin"
            onWheel={event => { 
              event.target.blur()}}
            className="input ml-3"
            required
          />
        </FormGroup>
        <p id="register" className="warning"/>
        <button className="mb-2 btn btn-success mr-4" onClick={()=>this.props.history.goBack()}>Back</button>
        {/* <button className="mb-2 btn btn-success ml-2">{this.state.method=="PATCH"?"Update":"Create"}</button> */}
        <button className="mb-2 btn btn-success ml-2" onClick={this.handleSubmit}>{localStorage.getItem("method1")=="PATCH" ? "Update" : "Add" }</button>
      </div>
      </div>
    );
  }
  }
}

export default withRouter(AddHouse);
