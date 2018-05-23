import React ,{Component} from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Header from '../Header'

import RebrandlyApi from '../../services/RebrandlyApi'

class EditLinks extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            id: this.props.match.params.id,
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
            title="Edit Link" 
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
            <FlatButton label="Submit" primary={true} onClick={() => this.onsubmit()}/>
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
    onsubmit() {
            const data = {
              title: this.state.title,
              destination: this.state.destination
            }
        
            RebrandlyApi.post(`/links/${this.state.id}`, {body: data})
            .then(() => {
              this.props.history.push("/link")
            })
            .catch(err => {
              alert(err.message)
            })
          }
       

    componentWillMount() {
        RebrandlyApi.get(`/links/${this.state.id}`)
            .then(link => {
              this.setState({
                title: link.title,
                destination: link.destination
              })
            })
            .catch(err => alert(err.message))
    }
    
}


export default EditLinks;