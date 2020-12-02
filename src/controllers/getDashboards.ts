import dashboardQueries from '../queries/dashboardQueries';

const getDashboards = (req: any, res: any, db:any) => {

    let query;
    if(req.query.user) {
        let user = req.session.key;
        query = {
            name: 'get-dashboard-by-user',
            text: dashboardQueries.getDashboardsByUser,
            values: [user]
        }
    } else {
        query = {
            name: 'get-dashboards',
            text: dashboardQueries.getDashboards
        }
    }

    db.query(query)
        .then((r: any) => {
            res.send({
                success:true,
                dashboards: r.rows
            })
        })
        .catch((e:any) => {
            res.send({
                success:false
            })
        })

}

export default getDashboards;