import { Router, Request, Response } from "express";
import { 
	addNewUser, 
	getAllUser,
	getUser
} from '../controllers/user/index';

const router = Router();

router.post('/', async (req:Request, res:Response) => {

	try{
		const newUser = req.body;
		if (newUser){
			await addNewUser(newUser);
			res.status(200).json(newUser);
		}
	}catch(error: any){
		res.status(500).json({error_message: error.message});
	}

});

router.get('/admin', async(req:Request, res:Response) => {
	try{
		const result = await getAllUser();
		res.status(200).json(result);
	}catch(error:any){
		res.status(500).json({error_message: error.message});
	}
});

router.get('/:username', async(req:Request, res:Response) => {
	try{
		const username = req.params.username;
		const result = await getUser(username);
		res.status(200).json(result);
	}catch(error:any){
		res.status(500).json({error_message: error.message});
	}
});


export default router;
