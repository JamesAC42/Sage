import { EndpointTypes } from '../EndpointTypes';

export interface Endpoint {
    type: EndpointTypes,
    url: string,
    parameters: string
}

export interface EndpointData extends Endpoint {
    data: {}
}