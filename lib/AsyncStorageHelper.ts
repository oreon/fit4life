import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";
//import Toast from "react-native-root-toast";

const cur_date =  () => new Date().toISOString().split("T")[0];

export const isNumeric = (value) =>  /^-?\d+$/.test(value)
  

export const readTodays =  async (key, defval?) => {
  const cd = cur_date()
  
  const val = await getData(cd + "_" + key);
  if(val){
    const sval = val.split("_")[1];
    if (isNumeric(val) )
      return parseInt(val);
    return JSON.parse(val)
  }
  return defval;
}

export const writeTodays = async (key, value) =>{
  await storeData(cur_date() + "_" + key, value + "");
 // await storeData(cd , value);
}


export const storeData = async (key:string, val) => {
  
  try {
    console.log("saving ", key, JSON.stringify(val));
    await AsyncStorage.setItem(key, JSON.stringify(val))
   
    // let toast = Toast.show("Saved !", {
    //   duration: Toast.durations.SHORT,
    // });
  } catch (e) {
    console.error("couldnt save for ", key, val, e);
    // let toast = Toast.show("Error saving  " + key  + " -> " + e, {
    //   duration: Toast.durations.SHORT,
    // });
  }
}

export const remove = async (key:string) => {
  
  try {
   
    await AsyncStorage.removeItem(key)
   
    // let toast = Toast.show("Saved !", {
    //   duration: Toast.durations.SHORT,
    // });
  } catch (e) {
    console.error("couldnt remove  ", key);
    // let toast = Toast.show("Error saving  " + key  + " -> " + e, {
    //   duration: Toast.durations.SHORT,
    // });
  }
}

export const getData = async (key:string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    console.log("read val ", value)
    if(value !== null) {
      // value previously stored
    }
    return JSON.parse(value)
  } catch(e) {
    // error reading value
    return null
  }
}


export const allData = async () => {
  
  
  try {
    const keys = await AsyncStorage.getAllKeys()
    const result = await AsyncStorage.multiGet(keys)
    let i = -1;
    const vals = result.map(x => {
      i++
      try{
        return JSON.parse(x)
      }catch(e){
        console.log("error parsing json", x, e)
         AsyncStorage.removeItem(keys[i])
        return x
      }
    })
    console.log("found records ->" ,  vals)

    return  vals
     
  } catch(e) {
    console.log("error happened reading all keys", e)
    // error reading value
    return null
  }
}