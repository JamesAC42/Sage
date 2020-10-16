const dashboardQueries = {
    createDashboard: "INSERT INTO dashboards(id, name, creator, created_on, endpoints) VALUES ($1, $2, $3, $4, $5)"
}

export default dashboardQueries;