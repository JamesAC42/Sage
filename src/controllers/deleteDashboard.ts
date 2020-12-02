import dashboardQueries from '../queries/dashboardQueries';

const deleteDashboard = (req: any, res: any, client: any, cache: any) => {
    const { id } = req.body;
    const useridQuery = {
        name: 'get-userid',
        text: dashboardQueries.getUserFromDashboard,
        values: [id]
    }
    client.query(useridQuery)
        .then((r: any) => {
            console.log(r.rows[0].creator_id);
            console.log(req.session.key);
            if(r.rows[0].creator_id === req.session.key) {
                cache.del(id, (err: any, response: any) => {
                    console.log(response);
                });
                const deleteQuery = {
                    name: 'delete-dashboard',
                    text: dashboardQueries.deleteDashboard,
                    values: [id]
                };
                client.query(deleteQuery)
                    .then((r: any) => {
                        res.send({success:true});
                    })
                    .catch((err: any) => {
                        console.log(err);
                        throw new Error('ERROR DELETING DASHBOARD');
                    });
            } else {
                res.send({success: false});
            }
        })
        .catch((err: any) => {
            console.log(err);
            throw new Error('ERROR FINDING DASHBOARD');
        })
}

export default deleteDashboard;