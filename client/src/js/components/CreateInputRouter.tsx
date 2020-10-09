import React, { Component } from 'react';

class ODATAInput extends Component {
    render() {
        return(
            <div className="create-input-inner">
                <div className="input-header">ODATA</div>

                <div className="input-label">URL</div>
                <input className="input-item-input" type="text" />

                <div className="input-label">OAuth Key</div>
                <input className="input-item-input" type="text" />

                <div className="input-label">Parameter String</div>
                <input className="input-item-input" type="text" />
            </div>
        )
    }
}

class GraphQLInput extends Component {
    render() {
        return(
            <div className="create-input-inner">
                <div className="input-header">GraphQL</div>

                <div className="input-label">URL</div>
                <input className="input-item-input" type="text" />

                <div className="input-label">Username</div>
                <input className="input-item-input" type="text" />

                <div className="input-label">Password</div>
                <input className="input-item-input" type="password" />

                <div className="input-label">Parameter 1</div>
                <input className="input-item-input" type="text" />

                <div className="input-label">Parameter 2</div>
                <input className="input-item-input" type="text" />
            </div>
        )
    }
}

class RSSInput extends Component {
    render() {
        return(
            <div className="create-input-inner">
                <div className="input-header">RSS</div>

                <div className="input-label">URL</div>
                <input className="input-item-input" type="text" />

                <div className="input-label">Key</div>
                <input className="input-item-input" type="text" />
            </div>
        )
    }
}

class BasicWebInput extends Component {
    render() {
        return(
            <div className="create-input-inner">
                <div className="input-header">Basic</div>

                <div className="input-label">URL</div>
                <input className="input-item-input" type="text" />
                
                <div className="input-label">Parameters</div>
                <input className="input-item-input" type="text" />
            </div>
        )
    }
}

interface CreateInputRouterProps {
    active:number
}

class CreateInputRouter extends Component<CreateInputRouterProps> {
    render() {
        switch(this.props.active) {
            case 0:
                return <BasicWebInput />;
            case 1:
                return <GraphQLInput />;
            case 2:
                return <ODATAInput />;
            case 3:
                return <RSSInput />;
            default:
                return null;
        }
    }
}

export default CreateInputRouter;