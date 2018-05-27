import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/image/edit';
import IconButton from 'material-ui/IconButton';
// Material Component
import Header from '../Header'
//services
import RebrandlyApi from '../../services/RebrandlyApi'
//actions
import {selectLink} from '../../actions/LinkActions'

class RebrandlyLinks extends Component{
    
    constructor(props)
    {
        super(props);
        this.state={
            showcheckbox:false,
            //links:[],
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
                this.props.lists.map( link => {
                    return(
                        <TableRow key={link.id}>
                        <TableRowColumn>{link.title}</TableRowColumn>
                        <TableRowColumn>{link.destination}</TableRowColumn>
                        <TableRowColumn>{link.shortUrl}</TableRowColumn>
                        <TableRowColumn>
                            <IconButton onClick={() => 
                                this.props.handleEditButtonClick(link)
                                //this.props.history.push(`/link/${link.id}/edit`) }
                             }>
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
        //this.listLink()
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

function mapStateToProps(state){
    return({
        lists:state.linkReducer
    })
}

function mapDispatchToProps(dispatch){
    return(
        bindActionCreators({
            handleEditButtonClick: selectLink

        },dispatch)
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(RebrandlyLinks);