



const ProtectRoutes = async (req, res, next) => {
 
    if (!req.session || !req.session.loggedIn) {
        req.flash("error", "Your session has expired or you are not logged in.");
        return res.redirect("/Login");
    }
    next();
};
export default ProtectRoutes;