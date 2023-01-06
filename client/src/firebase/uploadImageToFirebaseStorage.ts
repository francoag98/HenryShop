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

export const uploadImageToFirebaseStorage = async (files: File[] | null): Promise<string[] | null> => {
	if (!files) {
		return null;
	}
	console.log("files", files)
    const promises = files.map((f) => {
		const imageName = `${Date.parse(new Date().toISOString())}.${f.type.split('/')[1]}`;
		const storageRef = ref(storage, `productos/${imageName}`);
		return new Promise<string>(async (resolve, reject) => {
			await uploadBytes(storageRef, f);
			  resolve( await getDownloadURL(storageRef))
		})
	});
console.log("promises", promises);
	const result = await Promise.all(promises);
	console.log("result", result);
	return result;
};
