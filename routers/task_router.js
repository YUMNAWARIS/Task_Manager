const exp= require ("express")

const controller = require("../controllers/task_controller")

const router = exp.Router();

// "/tasks/---"

router.get("/:id",controller.getOne)

router.get("/",controller.getAll)

router.post("/add",controller.create_task)

router.put("/:id",controller.update_task)

router.delete("/:id",controller.delete_task)

router.patch("/:id",controller.markAsCompleted)

module.exports = router