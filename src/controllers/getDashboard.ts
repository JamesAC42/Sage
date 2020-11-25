import dashboardQueries from '../queries/dashboardQueries';
const getDashboard = (req:any, res:any, db:any, cache:any) => {

    const id = req.query.id;

    const query = {
        name: 'get-dashboard',
        text:dashboardQueries.getDashboard,
        values: [id]
    }

    db.query(query)
        .then((r: any) => {
            if(r.rows.length === 0) {
                res.send({
                    success:false
                });
            } else {
                const dashboard = r.rows[0];
                cache.get(id, (error:any, result:any) => { 
                    if(error) {
                        res.send({success:false});
                    } else {
                        let data = [{
                            endpoint: {
                                type: '',
                                url: '',
                                parameters: ''
                            },
                            data: {}
                        }]
                        if(result === null) {
                            cache.publish("updateData", JSON.stringify(
                                {
                                    id,
                                    endpoints: JSON.parse(dashboard.endpoints)
                                }
                            ));
                        } else {
                            data = JSON.parse(result);
                        }
                        res.send({
                            success:true,
                            dashboard,
                            data
                        })
                    }
                })
            }
        })
        .catch((e:any) => {
            console.log(e);
            res.send({
                success:false
            })
        });

}

export default getDashboard;