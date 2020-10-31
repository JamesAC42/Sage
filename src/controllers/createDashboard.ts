const { v4: uuid } = require('uuid');

import dashboardQueries from '../queries/dashboardQueries';
import userQueries from '../queries/userQueries';

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
                        JSON.stringify([data])
                    ]
                };
        
                db.query(createDashboard)
                    .then((r: any) => {
                        cache.set(dashboard_id, JSON.stringify(
                            [{
                                endpoint: data.url, 
                                parameters: data.parameters, 
                                data: {
                                    apples: 10,
                                    oranges: 20,
                                    grapefruits: 2,
                                    grapes: 110,
                                    prices: {
                                        apples: 4.50,
                                        bananas: 1.99,
                                        watermelon: 3.25
                                    }
                                }
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