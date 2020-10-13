interface IODATAInputState {
    url: string,
    oauth: string,
    parameters: string
}

export class ODATAInputState implements IODATAInputState {
    url:string;
    oauth:string;
    parameters:string;
    constructor() {
        this.url = '';
        this.oauth = '';
        this.parameters = '';
    }
}

interface IGraphQLInputState {
    url: string,
    username: string,
    password: string,
    parameter1: string,
    parameter2: string
}

export class GraphQLInputState implements IGraphQLInputState {
    url: string;
    username: string;
    password: string;
    parameter1: string;
    parameter2: string;
    constructor() {
        this.url = '';
        this.username = '';
        this.password = '';
        this.parameter1 = '';
        this.parameter2 = '';
    }
}

interface IRSSInputState {
    url: string,
    key: string
}

export class RSSInputState implements IRSSInputState {
    url: string;
    key: string;
    constructor() {
        this.url = '';
        this.key = '';
    }
}

interface IBasicWebInputState {
    url: string,
    parameters: string
}

export class BasicWebInputState implements IBasicWebInputState {
    url:string;
    parameters:string;
    constructor() {
        this.url = '';
        this.parameters = '';
    }
}