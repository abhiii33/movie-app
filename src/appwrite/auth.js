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
        const response = await account.create(ID.unique(), email, password,name);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

const login = async (email, password) => {
    try {
        const response = await account.createSession(email, password);   
        console.log(response);
        return response;        
    }          catch (error) {
        console.error(error);
    }
}
 export  {createAccount,login}