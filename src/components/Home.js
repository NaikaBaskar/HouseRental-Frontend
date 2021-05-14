import {Component} from 'react'
import {withRouter} from 'react-router-dom'


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
            <div className="text-center">
                <h1>WelCome To House Rental PlatForm</h1>
                
                {/* <button onClick={()=>this.props.history.push('/student')}  className="btn btn-primary">goto Student</button> */}
                
                <button onClick={()=>this.props.history.push('/owner/login')}  className="btn btn-primary">Owner</button>
                <button onClick={()=>this.props.history.push('/tenant/login')}  className="btn btn-primary">Tenant</button>
                <button onClick={()=>this.props.history.push('/owner/getOwners')}  className="btn btn-primary">view Owners</button>
                <button onClick={()=>this.props.history.push('/tenant/getTenants')}  className="btn btn-primary">view Tenants</button>
                <button onClick={()=>this.props.history.push('/house/getHouses')}  className="btn btn-primary">view Houses</button>
                <button onClick={()=>{
                    localStorage.setItem("method1","POST")
                    this.props.history.push('/house/add')}}  className="btn btn-primary">Add House</button>
                <button onClick={()=>this.props.history.push('/housesOwned/requestedHouses')}  className="btn btn-primary">Requests</button>
            </div>
        )
    }
}
export default withRouter(Home);