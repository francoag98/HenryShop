// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';



// TODO: Add SDKs for Firebase products that you want to use
// Your web app's Firebase configuration
   
   const fireConfig: string = (process.env.REACT_APP_FIREBASE_CONFIG as string);
   const firebaseConfig = JSON.parse(fireConfig)
   

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export const uploadImageToFirebaseStorage = async (files: any): Promise<any> => {
	console.log("holaaaa", files);
	if (!files.length) {
		console.log("file null");
		return null;
	}
    
	let promises:any = [];
	let storageRef:any 
     	files.map( async (file:any)=> {
		const imageName = `${Date.parse(new Date().toISOString())}.${file.type.split('/')[1]}`;
		storageRef	= ref(storage, `workshop/${imageName}`);

		 await uploadBytes(storageRef, file);
		  
		const urlImg =  await  getDownloadURL(storageRef);
		promises.push(urlImg);
		
    })
	console.log("promises", promises);
	
	return await Promise.all([promises]);
	
};
