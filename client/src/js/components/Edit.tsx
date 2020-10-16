import React, { Component } from 'react';
import {
    Redirect
} from 'react-router-dom';

interface ParamTypes {
    match: {[key:string]: {id:string}}
}

const getDashboard = (id:string) => {
    return true;
}

class Edit extends Component<ParamTypes>{
    render() {
        const id = this.props.match.params.id;
        if(!getDashboard(id)) {
            return(
                <Redirect to="/home" />
            )
        }
        return(
            <div className="container">
                {id}
            </div>
        )
    }
}

export default Edit;