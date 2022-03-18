const protect = (req, res, next) => {
    const { user } = req.session

    if(!user){
        return req.status(404).json({
            status: "fail",
            message: "unautorized"
        })
    }

    req.user = user

    next()
}

module.exports = protect