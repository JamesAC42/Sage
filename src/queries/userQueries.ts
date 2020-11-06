const userQueries = {
    createUser: "INSERT INTO users(id, username, password, email, created_on, verified) VALUES ($1, $2, $3, $4, $5, $6)",
    findUser: "SELECT id, password FROM users WHERE username = $1",
    findEmail: "SELECT id FROM users WHERE email = $1",
    findUsername: "SELECT username FROM users WHERE id = $1"
}

export default userQueries;