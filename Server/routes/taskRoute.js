const router = require('express').Router()
const taskController = require('../controllers/taskController')
const authentication = require('../middlewares/authentication')

router.get('/', authentication, taskController.getTasks)

module.exports = router