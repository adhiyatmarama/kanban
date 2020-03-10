const router = require('express').Router()
const taskController = require('../controllers/taskController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', authentication, taskController.getTasks)
router.post('/', authentication, taskController.addTask)

router.get('/:id', authentication, authorization, taskController.getOne)
router.put('/:id', authentication, authorization, taskController.edit)

module.exports = router