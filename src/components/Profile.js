import React, { Component } from 'react'
import { Card,Button,Image } from 'react-bootstrap';
import { withRouter } from 'react-router';
import profilepic from '../images/profile.png'
import SideNavbar from './SideNavbar';
import TenantNavbar from './TenantNavbar';

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
            <div>
                {localStorage.getItem("role")=="owner" ? 
                <SideNavbar/> : <TenantNavbar/> }
            <div className="center" style={{marginLeft:"20%",marginRight:"20%", alignItems:"center",justifyContent:"center", border:"3px solid black"}}>
                 
                {/* <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                </Card> */}
                <Image src={profilepic} style={{width:"350px",height:"250px"}} alt="Loading"></Image>
                <p><b>ID:</b>{this.state.role=="owner" ? this.state.user.ownerId : this.state.user.tenantId}</p>
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
                    <button onClick={() =>{
                        localStorage.setItem("method","PATCH")
                        {localStorage.getItem("role")=="owner" ? 
                        this.props.history.push('/owner/signup') :
                        this.props.history.push('/tenant/signup')
                    }}}>Edit</button> 
                </div>
            </div>
            </div>
        )
    }
}

export default withRouter(Profile)
