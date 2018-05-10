import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';


import RebrandlyApi from '../services/RebrandlyApi';

class Login extends Component{
    alignCenter={
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }

    cardWidth = {
        width: "500px"
      }

    floatActionButtonCenter={
        float: "right"
    }  
    constructor(props)
    {
        super(props)
            this.state={
                email:'',
                apikey:'' 
            }
    }
    render(){
        return(
            <div style={this.alignCenter}>
               <Card style={this.cardWidth}>
                    <CardHeader
                    title="ReBrandly" 
                    />
                    <CardTitle title="Login" titleColor="red" />
                    <CardText>
                        <TextField type="text" 
                        hintText="Email Address" value={this.state.email}
                        onChange={(e)=>this.OnEmailChange(e)}
                        fullWidth={true}
                        floatingLabelText="Email Address"
                        /><br />
                        <br />
                        <TextField
                        hintText="API key" type="password"
                        value={this.state.apikey}
                        onChange={(e)=>this.OnApiChange(e)}
                        floatingLabelText="API key"
                        fullWidth={true}
                        /><br />
                    </CardText>
                    <CardActions style={this.floatActionButtonCenter} >
                        <RaisedButton label="Login" primary={true} onClick={() => this.onsubmit()} />
                    </CardActions>
                </Card>
            </div>
        );
    }

    OnEmailChange(e){
        this.setState({email:e.target.value})
    }


    OnApiChange(e){
        this.setState({apikey:e.target.value})
    }

    onsubmit(){
    this.getAccountDetail(this.state.apikey)
    .then(account => {
      if(account.email === this.state.email) {
        sessionStorage.setItem('apikey', this.state.apikey)
        sessionStorage.setItem('email', this.state.email)
        this.props.history.push('/board')
      }
      else {
        alert('Credentail mis match')
      }
    })
    .catch(error => {
      alert(error.message)
    })
  }

  getAccountDetail(apikey) {
    return RebrandlyApi.get('/account', {headers: {apikey: apikey}})
  }

  componentWillMount() {
        const apikeySession = sessionStorage.getItem('apikey')
        if(apikeySession) {
          this.getAccountDetail(apikeySession)
          .then(account => {
            if(account) {
              this.props.history.push('/board')
            }
          })
          .catch(error => {
            sessionStorage.removeItem('apikey')
          })
    }
}

}

  export default Login;
