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
class ViewOwners extends Component {
    constructor (props) {
        super (props);
        this.state = {
          users: []
        };
      }
    componentDidMount () {
          this.fetchAllOwners();
    }
    fetchAllOwners = () => {
        fetch (`https://house-rental-backend.herokuapp.com/owner/getOwners`, {
          method: 'GET',
        })
          .then (response => response.json ())
          .then (data => {
            console.log ('result', data);
            this.setState ({
              users: data.data,
            });
          })
          .catch (error => console.log ('error', error));
      };

    render() {
        return (
            <div>
              <SideNavbar/>
              <Container className="main1">
                <h1>Owners List</h1>
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
                                   
                                    <p><b>ID:</b>{user.ownerId}</p>
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
                                {/* </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                                </Card> */}
                    </div> 
                )}
                         
                )} 
              </Container>
            </div>
        )
    }
}

export default withRouter(ViewOwners)
