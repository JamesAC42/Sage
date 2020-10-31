interface IODATAInputState {
    title: string,
    url: string,
    oauth: string,
    parameters: string
}

export class ODATAInputState implements IODATAInputState {
    title: string;
    url:string;
    oauth:string;
    parameters:string;
    constructor() {
        this.title = '';
        this.url = '';
        this.oauth = '';
        this.parameters = '';
    }
}

interface IGraphQLInputState {
    title: string,
    url: string,
    username: string,
    password: string,
    parameters: string
}

export class GraphQLInputState implements IGraphQLInputState {
    title: string;
    url: string;
    username: string;
    password: string;
    parameters: string;
    constructor() {
        this.title = '';
        this.url = '';
        this.username = '';
        this.password = '';
        this.parameters = '';
    }
}

interface IRSSInputState {
    title: string,
    url: string,
    key: string
}

export class RSSInputState implements IRSSInputState {
    title: string;
    url: string;
    key: string;
    constructor() {
        this.title = '';
        this.url = '';
        this.key = '';
    }
}

interface IBasicWebInputState {
    title: string;
    url: string,
    parameters: string
}

export class BasicWebInputState implements IBasicWebInputState {
    title: string;
    url:string;
    parameters:string;
    constructor() {
        this.title = '';
        this.url = '';
        this.parameters = '';
    }
}