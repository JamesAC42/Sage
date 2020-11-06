import dashboardQueries from '../queries/dashboardQueries';

const getDashboards = (req: any, res: any, db:any) => {

    const query = {
        name: 'get-dashboards',
        text: dashboardQueries.getDashboards
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