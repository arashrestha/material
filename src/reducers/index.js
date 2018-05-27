import { combineReducers } from 'redux';

export default combineReducers({
    linkReducer:() => {
        return[
            {title:'title one', destination:'https://title1.com',shortUrl:'https://st.ss'},
            {title:'title two', destination:'https://tittle2.com',shortUrl:'https://pt.ss'}
        ]
    },
    selectReducer: (state={},action)=>{
        if(action.type === 'SET_SELECTED_LINK'){
            return action.payload
        }
        else{
            return{}
        }
    }
})