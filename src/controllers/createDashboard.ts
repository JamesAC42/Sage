const { v4: uuid } = require('uuid');

import dashboardQueries from '../queries/dashboardQueries';
import userQueries from '../queries/userQueries';

import { Endpoint, EndpointData } from '../interfaces/Endpoint';
import { EndpointTypes } from '../EndpointTypes';

const createDashboard = (req:any, res:any, db: any, cache:any) => {
    const data = req.body.data;
    const user_id = req.session.key;
    if(user_id === undefined) {
        throw new Error('NOT LOGGED IN');
    } else {
        
        const dashboard_id = uuid();

        const usernameQuery = {
            name: 'get-username',
            text: userQueries.findUsername,
            values: [user_id]
        }

        const title = (data.title == '') ? 'Untitled Dashboard' : data.title;

        let endpoint: Endpoint = {
            type:data.type,
            url:data.url,
            parameters:''
        }

        if(data.type === EndpointTypes.RSS) {
            endpoint.parameters = data.key;
        } else {
            endpoint.parameters = data.parameters;
        }

        db.query(usernameQuery)
            .then((r: any) => {
                const createDashboard = {
                    name: 'create-dashboard',
                    text: dashboardQueries.createDashboard,
                    values: [
                        dashboard_id,
                        title,
                        user_id,
                        r.rows[0].username,
                        new Date(),
                        JSON.stringify([endpoint])
                    ]
                };
        
                db.query(createDashboard)
                    .then((r: any) => {
                        cache.set(dashboard_id, JSON.stringify(
                            [{
                                endpoint: data.url, 
                                parameters: data.parameters, 
                                data: {}
                            }]
                        ));
                        res.send({
                            id: dashboard_id
                        })
                    })
                    .catch((err: any) => {
                        console.log(err);
                        throw new Error('ERROR CREATING DASHBOARD');
                    })
            })
            .catch((err:any) => {
                console.log(err);
                res.send({success:false})
            })

    }
}

export default createDashboard;