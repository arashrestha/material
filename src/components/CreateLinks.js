import React ,{Component} from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Header from './Header'
import RebrandlyApi from '../services/RebrandlyApi'

class CreateLinks extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            title:'',
            destination:'',

        }
    }
    
    render(){
        return(
            <div>
            <Header/>
            <Card>
            <CardHeader
            title="Create Link Form" 
            />
            <CardText>
            Title:<TextField type="text" 
                value={this.state.title}
                onChange={(e) => this.ontitlechange(e)}
            /><br />
            Destination:<TextField type="text" 
                value={this.state.destination}
                onChange={(e) => this.ondestinationchange(e)}
            /><br />
            </CardText>
            <CardActions>
            <RaisedButton label="Submit" primary={true} onClick={() => this.onsubmit()}/>
            </CardActions>
            </Card>
            </div>
        )
    }
    ontitlechange(e){
        this.setState({title:e.target.value})
    }

    ondestinationchange(e){
        this.setState({destination:e.target.value})
    }
    onsubmit(){
         const apikey=sessionStorage.getItem('apikey')
         const data={
             title:this.state.title,
             destination:this.state.destination,
         }
        fetch('https://api.rebrandly.com/v1/links', {
            method:'POST',
            headers:{
                apikey:apikey,
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(response=>{
            if(response.ok){
                response.json()
                .then(links => {
                    this.props.history.push("/link")
        
                })
            }
         })

        // RebrandlyApi.post('/links',{body:data})
        // .then(() => {
        //     this.props.history.push("/link")
        //   })
        //   .catch(err => {
        //     alert(err.message)
        // })
       

    }
}


export default CreateLinks;