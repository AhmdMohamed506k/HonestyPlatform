



const ProtectRoutes = async (req, res, next) => {
 
    if (!req.session || !req.session.loggedIn) {

        return res.redirect("/Login");
    }
    next();
};
export default ProtectRoutes;