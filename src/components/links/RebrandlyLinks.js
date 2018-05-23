import React, { Component } from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

// Material Component

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';

import Header from '../Header'
import RebrandlyApi from '../../services/RebrandlyApi'

class RebrandlyLinks extends Component{
    
    constructor(props)
    {
        super(props);
        this.state={
            showcheckbox:false,
            links:[],
        }
    }
    render(){
        return(
            <div>
            <Header/>
            <Table>
            <TableHeader displaySelectAll={false}>
            <TableRow>
            <TableHeaderColumn>Title</TableHeaderColumn>
            <TableHeaderColumn>Destination</TableHeaderColumn>
            <TableHeaderColumn>Short URL</TableHeaderColumn>
            <TableHeaderColumn>Edit</TableHeaderColumn>
            <TableHeaderColumn>Delete</TableHeaderColumn>
            
            </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={this.state.showcheckbox}>
            {
                this.state.links.map( link => {
                    return(
                        <TableRow key={link.id}>
                        <TableRowColumn>{link.title}</TableRowColumn>
                        <TableRowColumn>{link.destination}</TableRowColumn>
                        <TableRowColumn>{link.shortUrl}</TableRowColumn>
                        <TableRowColumn>
                            <IconButton onClick={() =>this.props.history.push(`/link/${link.id}/edit`) }>
                                <EditIcon/>
                            </IconButton>
                        </TableRowColumn>
                        <TableRowColumn>
                            <IconButton onClick={() =>this.deleteLink(link.id)}>
                                <DeleteIcon/>
                            </IconButton>
                        </TableRowColumn>
                        </TableRow>  
                    )
                })
            }
            </TableBody>
            </Table>
            </div>
        );
    }
    
    getLinkList(apikey) {
        return RebrandlyApi.get('/links', {headers: {apikey: apikey}})
    }
    
    componentWillMount() {
        this.listLink()
    }

    listLink(){
        const apikeySession = sessionStorage.getItem('apikey')
        console.log(apikeySession)
        if(apikeySession) {
            //response.ok rakhnu pardaina kina bhane RebrandlyApi ma garirakheko cha  
            this.getLinkList(apikeySession)
            .then(linksd => {
                console.log(linksd)
                if(linksd) {
                    this.setState({
                        links: linksd
                    })
                }
                
            })
        }
    }
    deleteLink(linkId){
        RebrandlyApi.delete(`/links/${linkId}`)
        .then(response=>{
            this.listLink()
        })
        .catch(err=>{
            alert(err.message
        )})
    }
}

export default RebrandlyLinks