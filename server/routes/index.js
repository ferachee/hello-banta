import express from "express";
const router = express.Router();
import userRouter from './league.js';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

router.use('/leagues',userRouter);

export default router;
