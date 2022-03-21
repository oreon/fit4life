import AsyncStorage from "@react-native-async-storage/async-storage";
//import Toast from "react-native-root-toast";

const cur_date =  () => new Date().toISOString().split("T")[0];

export const isNumeric = (value) =>  /^-?\d+$/.test(value)
  

export const readTodays =  async (key, defval?) => {
  const cd = cur_date()
  console.log(cur_date)
  const val = await getData(cd + "_" + key);
  if(val){
    const sval = val.split("_")[1];
    if (isNumeric(val) )
      return parseInt(val);
    return val
  }
  return defval;
}

export const writeTodays = async (key, value) =>{
  //let value = await getData(cur_date());

  await storeData(cur_date() + "_" + key, value + "");
 // await storeData(cd , value);
}


export const storeData = async (key:string, val:string) => {
  
  try {
    console.log("sving ", key, val);
    await AsyncStorage.setItem(key, val)
    console.log("sving ", key, val);
    // let toast = Toast.show("Saved !", {
    //   duration: Toast.durations.SHORT,
    // });
  } catch (e) {
    console.error("couldnt save for ", key, val);
    // let toast = Toast.show("Error saving  " + key  + " -> " + e, {
    //   duration: Toast.durations.SHORT,
    // });
  }
}

export const getData = async (key:string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      // value previously stored
    }
    return value
  } catch(e) {
    // error reading value
    return null
  }
}