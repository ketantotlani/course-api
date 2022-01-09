const router = require('express').Router();
const courseCtrl = require('../controller/courseCtrl')

router.get(`/course`, courseCtrl.getAll)
router.post(`/course`, courseCtrl.create)
router.get(`/course/:id`, courseCtrl.getById)
router.put(`/course/:id`, courseCtrl.update)
router.delete(`/course/:id`, courseCtrl.delete)


module.exports = router;
