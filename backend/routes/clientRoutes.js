const express = require("express")
const router = express.Router()
const Controller = require("../Controller/clientController")

router.post("/create-client", Controller.createClient)
router.get("/get-client", Controller.getAllClient)
router.put("/update-client/:id", Controller.updateClient)
router.delete("/delete-client/:id", Controller.deleteClient)

module.exports = router