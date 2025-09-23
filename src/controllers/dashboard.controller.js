const showDashboard = (req,res) => {
    res.status(200).send("login passed 123");
}

const getUsername = (req,res) => {

    if (req.session.username) {
        res.status(200).json({userName: req.session.username});
    } else {
        res.status(401).send("error");
    }
}

export {showDashboard,getUsername};