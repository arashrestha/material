import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';



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
                    title="ReBrandly" titleColor="blue"
                    />
                    <CardTitle title="Login" titleColor="red" />
                    <CardText>
                        <TextField type="text" errorText="This field is required"
                        hintText="Email Address" value={this.state.email}
                        onChange={(e)=>this.OnEmailChange(e)}
                        fullWidth={true}
                        floatingLabelText="Email Address"
                        /><br />
                        <br />
                        <TextField
                        hintText="API key" type="password" errorText="This field is required"
                        value={this.state.apikey}
                        onChange={(e)=>this.OnApiChange(e)}
                        floatingLabelText="API key"
                        fullWidth={true}
                        /><br />
                    </CardText>
                    <CardActions style={this.floatActionButtonCenter} >
                        <RaisedButton label="Login" backgroundColor="blue" onClick={() => this.onsubmit()} />
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
        fetch("https://api.rebrandly.com/v1/account",
            {
                headers: {
                    apikey:this.state.apikey
                }
            })
            .then(response => {
                if(response.ok){
                    response.json()
                    .then(data=>{
                        console.log(data)
                        if(data.email === this.state.email){
                            console.log("Right USER")
                        }
                        else{
                            alert("Not Authorized User")
                        }
                    })
                }
                else{
                    alert(response.statusText)
                }
            })
    }
}

export default Login;