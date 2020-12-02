const dashboardQueries = {
    createDashboard: "INSERT INTO dashboards(id, name, creator_id, creator_username, created_on, endpoints) VALUES ($1, $2, $3, $4, $5, $6)",
    getDashboard: "SELECT name, creator_username, creator_id, created_on, endpoints FROM dashboards WHERE id = $1",
    getDashboards: "SELECT name, creator_username, created_on, endpoints, id FROM dashboards WHERE 1=1",
    getDashboardsByUser: "SELECT name, id, creator_username, created_on FROM dashboards WHERE creator_id = $1",
    getUserFromDashboard: "SELECT creator_id FROM dashboards WHERE id=$1",
    deleteDashboard: "DELETE FROM dashboards WHERE id=$1"
}

export default dashboardQueries;