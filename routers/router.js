const { body, validationResult } = require('express-validator');
const { register} = require("./tasks/auth/register");
const { login } = require("./tasks/auth/login");
const { getuser } = require('./tasks/auth/getuser');
const { fetchUser } = require('../middlewares/fetchUser');
const { notes, postNotes } = require('./tasks/notes/notes');
const { updateNotes } = require('./tasks/notes/updateNotes');
const { deleteNotes } = require('./tasks/notes/deletNotes');
const router=require("express").Router();

                // register 
router.post('/api/register',body('name',"name should be at least 3 characters").isLength({min:3}),
                 body('email','enter valid email').isEmail(),
                 body('password','password should be at least 5 characters').isLength({ min: 5 }),register);

                //  login 
router.post('/api/login',body('email','enter valid email').isEmail(),
                         body('password','wrong details').isLength({ min: 5 }),login);

                //  getuser 
router.get('/api/getuser',fetchUser,getuser);
router.get('/api/notes',fetchUser,notes);
router.post('/api/post-notes',fetchUser,postNotes);
router.patch('/update-notes/:id',fetchUser,updateNotes);
router.delete('/delete-notes/:id',fetchUser,deleteNotes);



  module.exports=router;