import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/User';

const USERS_STORAGE_KEY = 'user';
const LOGGEDIN_USER = 'userName';

export const setLoggedInUser = async (userName: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(LOGGEDIN_USER, userName);
  } catch (error:any) {
    throw new Error('Error saving user tracking list to storage: ' + error.message);
  }
}

export const getLoggedInUser = async (): Promise<any> => {
  const loggedInUser = await AsyncStorage.getItem(LOGGEDIN_USER);
  return loggedInUser;
}

export const saveUserData = async (user: User): Promise<void> => {
  try {
    let allUsers = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    let updatedUserData:User[] = [];
    if(allUsers!=null){
      updatedUserData = JSON.parse(allUsers);
      updatedUserData = [user, ...updatedUserData];
    }else{
      updatedUserData = [user];
    }
    const jsonValue = JSON.stringify(updatedUserData);
    await AsyncStorage.setItem(USERS_STORAGE_KEY, jsonValue);
  } catch (error:any) {
    throw new Error('Error saving user tracking list to storage: ' + error.message);
  }
};

export const loadUserData = async (userName: string): Promise<User | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    if (jsonValue !== null) {
      const users: User[] = JSON.parse(jsonValue);
      const currentUser = users.filter((u)=>u.name==userName);
      return currentUser[0];
    }
    return null;
  } catch (error:any) {
    throw new Error('Error loading user tracking list from storage: ' + error.message);
  }
};
