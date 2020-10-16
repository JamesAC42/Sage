import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { textChangeRangeIsUnchanged } from 'typescript';

import validateUrl from '../validateUrl';

import { InputItem } from './InputItem';
import {
    ODATAInputState,
    GraphQLInputState,
    RSSInputState,
    BasicWebInputState
} from './state/CreateInputStates';

interface CreateInputProps {
    updateForm: (values:any) => void
}

class CreateInput extends Component<CreateInputProps> {
    updateFormValues = (e:React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        }, () => this.props.updateForm(this.state));
    }
}

class ODATAInput extends CreateInput {
    state: ODATAInputState;
    constructor(props:any) {
        super(props);
        this.state = new ODATAInputState();
    }
    render() {
        return(
            <div className="create-input-inner flex-col flex-stretch">
                <div className="input-header">ODATA</div>

                <div className="input-label">URL</div>
                <InputItem
                    value={this.state.url}
                    maxLength={1000}
                    name={"url"}
                    updateValue={this.updateFormValues} />

                <div className="input-label">OAuth Key</div>
                <InputItem
                    value={this.state.oauth}
                    maxLength={500}
                    name={"oauth"}
                    updateValue={this.updateFormValues} />

                <div className="input-label">Parameter String</div>
                <InputItem
                    value={this.state.parameters}
                    maxLength={250}
                    name={"parameters"}
                    updateValue={this.updateFormValues}/>
            </div>
        )
    }
}

class GraphQLInput extends CreateInput {
    state: GraphQLInputState;
    constructor(props:any) {
        super(props);
        this.state = new GraphQLInputState();
    }
    render() {
        return(
            <div className="create-input-inner flex-col flex-stretch">
                <div className="input-header">GraphQL</div>

                <div className="input-label">URL</div>
                <InputItem
                    value={this.state.url}
                    maxLength={250}
                    name={"url"}
                    updateValue={this.updateFormValues}/>

                <div className="input-label">Username</div>
                <InputItem
                    value={this.state.username}
                    maxLength={250}
                    name={"username"}
                    updateValue={this.updateFormValues}/>

                <div className="input-label">Password</div>
                <InputItem
                    value={this.state.password}
                    maxLength={250}
                    name={"password"}
                    updateValue={this.updateFormValues}/>

                <div className="input-label">Parameter 1</div>
                <InputItem
                    value={this.state.parameter1}
                    maxLength={250}
                    name={"parameter1"}
                    updateValue={this.updateFormValues}/>

                <div className="input-label">Parameter 2</div>
                <InputItem
                    value={this.state.parameter2}
                    maxLength={250}
                    name={"parameter2"}
                    updateValue={this.updateFormValues}/>
            </div>
        )
    }
}

class RSSInput extends CreateInput {
    state: RSSInputState;
    constructor(props:any) {
        super(props);
        this.state = new RSSInputState();
    }
    render() {
        return(
            <div className="create-input-inner flex-col flex-stretch">
                <div className="input-header">RSS</div>

                <div className="input-label">URL</div>
                <InputItem
                    value={this.state.url}
                    maxLength={250}
                    name={"url"}
                    updateValue={this.updateFormValues}/>

                <div className="input-label">Key</div>
                <InputItem
                    value={this.state.key}
                    maxLength={250}
                    name={"key"}
                    updateValue={this.updateFormValues}/>
            </div>
        )
    }
}

class BasicWebInput extends CreateInput {
    state: BasicWebInputState;
    constructor(props:any) {
        super(props);
        this.state = new BasicWebInputState();
    }
    render() {
        return(
            <div className="create-input-inner flex-col flex-stretch">
                <div className="text-input input-header">Basic</div>

                <div className="input-label">URL</div>
                <InputItem
                    value={this.state.url}
                    maxLength={250}
                    name={"url"}
                    updateValue={this.updateFormValues}/>
                
                <div className="input-label">Parameters</div>
                <InputItem
                    value={this.state.parameters}
                    maxLength={250}
                    name={"parameters"}
                    updateValue={this.updateFormValues}/>
            </div>
        )
    }
}

interface CreateInputRouterProps {
    active:number
}

interface formData {
    url:string,
    [key: string]: any
}

class CreateInputRouterState {
    type:number;
    formValues: formData;
    error:boolean;
    errorMessage:string;
    redirect: string
    constructor() {
        this.type = 0;
        this.formValues = {url: ''};
        this.error = false;
        this.errorMessage = '';
        this.redirect = '';
    }
}

class CreateInputRouter extends Component<CreateInputRouterProps> {

    state: CreateInputRouterState;
    constructor(props:any) {
        super(props);
        this.state = new CreateInputRouterState;
        this.updateForm = this.updateForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    updateForm(values:{}) {
        this.setState({
            type: this.props.active,
            formValues: values,
        });   
    }
    submitForm() {
        if(this.state.formValues.url === '') {
            this.setState({
                error:true,
                errorMessage: 'Cannot have blank URL'
            });
        } else {
            if(!validateUrl(this.state.formValues.url)) {
                this.setState({
                    error:true,
                    errorMessage: 'Invalid URL'
                })
            } else {
                const formData = {...this.state.formValues};
                fetch('/api/createDashboard', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: formData
                    })
                })
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        redirect:data.id
                    })
                })
            }
        }
    }
    activeInput() {
        switch(this.props.active) {
            case 0:
                return <BasicWebInput updateForm={this.updateForm}/>;
            case 1:
                return <GraphQLInput updateForm={this.updateForm}/>;
            case 2:
                return <ODATAInput updateForm={this.updateForm}/>;
            case 3:
                return <RSSInput updateForm={this.updateForm}/>;
            default:
                return null;
        }
    }
    render() {
        if(this.state.redirect !== '') {
            const url = `/edit/${this.state.redirect}`;
            return(
                <Redirect to={url} />
            )
        }
        return(
        <div className="create-input-outer flex-col flex-stretch">
            { this.activeInput() }
            <div className="submit-form-outer">
                <div className="create-error">
                    {this.state.errorMessage}
                </div>
                <div 
                    className="button button-default submit-button"
                    onClick={this.submitForm}>CREATE</div>
            </div>
        </div>
        )
    }
}

export default CreateInputRouter;