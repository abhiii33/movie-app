import { Client, Account ,ID} from 'appwrite';
import config from '../conf';

const client = new Client()
      .setEndpoint(config.appwrriteendpoint) 
      .setProject(config.appwriteprojecturl)
      console.log('Endpoint:', import.meta.env.VITE_APPWRITE_ENDPOINT);
      console.log('Project ID:', import.meta.env.VITE_APPWRITE_PROJECT_ID);
const account = new Account(client)


const createAccount = async (email, password,name) => {
    try {
        const userId = ID.unique()
        const response = await account.create(userId, email, password,name);
     if(response) {
        console.log("Account created successfully", response);
         return login(email, password)
     }
    } catch (error) {
        console.error(error);
        throw error;
    
    }
}
const logout = async () => {
    const res = await account.deleteSession()
    console.log(res);
}
const login = async (email, password) => {
    try {
        const response = await account.createEmailPasswordSession(email, password);   
        console.log(response);
        return response;        
    }          catch (error) {
        throw error;
        console.error(error);
    }
}

const currentuser = async()=>{
    try {
        const user= await account.get()
        console.log(user);
        return user
    } catch (error) {
        console.error(error);
    }
}
 export  {createAccount,login,currentuser,logout}