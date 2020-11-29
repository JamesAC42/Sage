import React, { Component } from 'react';

import { IEndpoint } from './types/Endpoint'

interface DataItemProps {
    item: {
        endpoint: IEndpoint,
        data: {}
    }
}

class DataItemState {
    dataVisible: boolean;
    constructor() {
        this.dataVisible = false;
    }
}

export default class DataItem extends Component<DataItemProps> {
    state: DataItemState;
    constructor(props:DataItemProps) {
        super(props);
        this.state = new DataItemState();
    }
    toggleDataVisible() {
        let dataVisible = !this.state.dataVisible;
        this.setState({dataVisible});
    }
    render(){
        return(
            <div className="shadow card">
                <div
                    className="side-panel-p"
                    onClick={() => this.toggleDataVisible()}>
                    {this.props.item.endpoint.url}
                </div>
                {/* NOTE: add the "closed" class to fold the card */}
                <div className={
                    this.state.dataVisible ? 
                        "data-container" : "closed data-container"}>
                    <pre>
                    {JSON.stringify(this.props.item.data, null, "  ")}
                    </pre>
                </div>
            </div>
        )
    }
}