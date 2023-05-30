const express = require('express');
const router = express.Router()
const path = require('path');
const { getAllStudents, createNewStudent, updateStudent, deleteStudent } = require('../../controllers/studentController');

const roles_list = require('../../config/roles_list');
const verifyRole = require('../../middleware/verifyRole')


router.route('/')



.get( getAllStudents)


.post(verifyRole(roles_list.Admin,  roles_list.Editor), createNewStudent)


.put(verifyRole(roles_list.Admin,  roles_list.Editor),  updateStudent)



.delete( verifyRole(roles_list.Admin,  roles_list.Editor), deleteStudent)

router.route('/:id')
.get()

module.exports = router;