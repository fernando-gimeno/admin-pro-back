const getUsers = (req, res) => {
    res.json({
        msg: 'GET User'
    })
}

module.exports = {
    getUsers,
}