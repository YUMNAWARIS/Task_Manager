const { Router }= require("express")
const controller =  require("../controllers/user_controller")

const router = Router()

router.post("/signup", controller.signup);
router.post("/login" ,controller.login);
router.get("/logout" ,controller.logout);
router.delete("/user/:id" ,controller.deleteUser);
router.put("/user/:id" ,controller.updateUser)


module.exports = router