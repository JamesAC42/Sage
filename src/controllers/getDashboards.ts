import dashboardQueries from '../queries/dashboardQueries';

const getDashboards = (req: any, res: any, db:any) => {

    let query;
    console.log(req.query.user);
    if(req.query.user) {
        console.log("user");
        let user = req.session.key;
        console.log(user);
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
            console.log(e);
            res.send({
                success:false
            })
        })

}

export default getDashboards;