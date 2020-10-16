const { v4: uuid } = require('uuid');

import dashboardQueries from '../queries/dashboardQueries';

const createDashboard = (req:any, res:any, db: any) => {
    const data = req.body.data;
    const id = req.session.key;
    if(id === undefined) {
        throw new Error('NOT LOGGED IN');
    } else {
        
        const id = uuid();
        const createDashboard = {
            name: 'create-dashboard',
            text: dashboardQueries.createDashboard,
            values: [
                id,
                'Untitled Dashboard',
                req.session.key,
                new Date(),
                JSON.stringify([data])
            ]
        };

        db.query(createDashboard)
            .then((r: any) => {
                res.send({
                    id
                })
            })
            .catch((err: any) => {
                console.log(err);
                throw new Error('ERROR CREATING DASHBOARD');
            })

    }
}

export default createDashboard;