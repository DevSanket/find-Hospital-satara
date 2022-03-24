import * as SecureStore from 'expo-secure-store';

const key="UserId";

const storeData = async (user) => {
    try {
        await SecureStore.setItemAsync(key,JSON.stringify(user));
    } catch (error) {
        console.log("Error While Storing the data",error);
    }
}

const getData = async () => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.log("Error While Getting Data",error);
    }

}

const removeData = async () => {
    try{
            await SecureStore.deleteItemAsync(key);
    }catch(error){
        console.log("Error while Deleting User",error);
    }
}

export default {
    getData,
    storeData,
    removeData
}
