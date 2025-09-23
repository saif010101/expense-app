const authLogin = (req,res,next) => {

    console.log(req.session);
    if (req.session.username) next();
    else res.status(401).send("login failed 123");

};

export default authLogin;