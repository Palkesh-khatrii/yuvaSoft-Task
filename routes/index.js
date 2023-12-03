import express from 'express'
const router = express.Router();


import user from './user';
import post from './post';

router.use('/user', user);
router.use('/post', post);


module.exports = router


