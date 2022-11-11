import {user} from '../../Types';
import {User} from '../../models/User'

export const addNewUser = async (user: user) => {

	if(
		!user.name||
		!user.email||
		!user.username||
		!user.password||
		!user.birthday
	){
		throw new Error("Info Missing");
	}
	const userFind = await User.findOne({ name: user.username });
	if (!userFind) {
    const newUser = new User({
      name: user.name,
      email: user.email,
      username: user.username, 
      password: user.password,
      birthday: user.birthday,
    });
    newUser
      .save()
      .then((result:any) => {
        
        return result;
      })
      .catch((error) => new Error(error));
    return newUser;
  }else {
    throw new Error("User already exist");
  }
};
const pageSize = 10;
export const getAllUser = async ()=>{
  const resultUsers:object = await User.paginate({deleted: false});
  console.log(typeof resultUsers);
  return resultUsers;
}

export const getUser = async(username: string) => {
  console.log(typeof username);
  const resultUser = await User.findOne({username: username}).exec();
  console.log(resultUser);
  return resultUser;
}