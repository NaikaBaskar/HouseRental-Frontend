import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Logo2 from '../images/logo2.png'
import Logo from '../images/5.ico';
import one from '../images/1.png';
import two from '../images/2.png';
import three from '../images/3.png';
import fb from '../images/facebook.png';
import twit from '../images/twitter.png';
import insta from '../images/instagram.png';
import Mail from '../images/gmail.png';
import {Nav,FormControl, Form,Button } from 'react-bootstrap';
import Header from './Header';
import Feature from './Feature'
import About from './About';
import About2 from './About2';
import About3 from './About3';
import aboutimage from '../images/t1.jpg'
import aboutimage1 from '../images/a.PNG'
import aboutimage2 from '../images/0.jpg'
import Info from './Info';
import kk from '../images/kk.jpg'
import Contact from './Contact';
import '../docs/css/Home.css';
import NavBar from './NavBar'
import CarouselContainer from './CarouselContainer';




class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            name:''
        }
        
    }   
   
   
    render()
    {
        return (
            <div className="home">
            {/* <CarouselContainer />
            <NavBar/>
           */}
            <Header/>
            <Feature />
            
            <About image={aboutimage2} title='Handy Website To Get You Your Dream Home' button='Start Searching' />
      
            <About2 image={aboutimage1} title='Helps with All the tidious Documents Verification Process' button='Find a Home now' />
            
            <About3 image={aboutimage} title='Make your Dream of getting into Good Rental Home True with Us' button='Get a home now' />
      
            {/* <Presentation /> */}
            <Info image={kk}/>
            <Contact />
            2021 Copyright BlueHomes private. Limited
          </div>
    // <div className="App">
    //     <Navbar style={{background:"#060b26"}}>
    //     <a href="" className="logo"><img src={Logo}/></a>
    //         <Nav className="mr-auto" style={{paddingLeft:"40px"}}>
    //         <Nav.Link href="#" className="links">Home</Nav.Link>
    //         <Nav.Link href="#" className="links">About us</Nav.Link>
    //         {/* <Nav.Link href="#" className="links">Contact us</Nav.Link> */}
    //         <Nav.Link href="#" className="links">User Guide</Nav.Link>
    //         </Nav>
    //     </Navbar>
    // <body>
    //   <section>
    //       <div className="circle"></div>
    //       <div className="content">
    //           <div className="textbox">
    //               <h2>No more waiting..<br></br>Not <span>Anymore</span></h2>
    //                   <p>Everything at your fingertips. Wherever you want. Whenever you need! We are here for you!</p>
    //               <Link to="/owner/login" style={{margin:"10px"}}>Owner</Link>
    //               <Link to="/tenant/login">Tenant</Link>
    //               <Link to="/admin/login" style={{margin:"10px"}}>Admin</Link>
    //           </div>
  
    //           <div className="imgbox">
    //               <img src={one} className="starbucks" />
    //           </div>	
    //       </div>
    //       <ul className="thumb">
    //           <li><img src={one}  onClick={() => {
    //               this.imgSlider(one)
    //               console.log("one")
    //               this.changeCircleColor("#017143")
    //           }}/></li>
    //           <li><img src={two} onClick= { () =>{
    //               this.imgSlider(two)
    //               this.changeCircleColor("#eb7495")
    //           }} /></li>
    //           <li><img src={three} onClick={() => {
    //               this.imgSlider(three)
    //               this.changeCircleColor("#d752b1")
    //           }}/></li>
    //       </ul>
        //   {/* <ul className="sci" style={{float:"right"}}>
        //       <li><a href=""><img src={fb} /></a></li>
        //       <li><a href=""><img src={twit} /></a></li>
        //       <li><a href=""><img src={insta} /></a></li>
        //   </ul> */}
    //   </section>
    // </body>
    // </div> 
    )
  }
}
export default withRouter(Home);