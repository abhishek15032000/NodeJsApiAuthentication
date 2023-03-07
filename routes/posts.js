import express from 'express';
import {auth} from './verifyToken.js';
const app=express();
const router=express.Router();
app.use(auth);
router.get('/',(req,res)=>{
    res.json({posts:{title:'My first post',description:"randome data which shouldn't be accessed"}});
})

export default router;