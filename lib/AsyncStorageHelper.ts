import AsyncStorage from "@react-native-async-storage/async-storage";
//import Toast from "react-native-root-toast";

const cur_date =  () => new Date().toISOString().split("T")[0];

// export const readTodays =  async (key) => {
//   const cd = cur_date()
//   console.log(cur_date)
//   const score = await getData(cd + "_" + "score");

// }

// export const writeTodays = async (key, val) =>{
//   let value = await getData(cur_date());
//   value = JSON.parse(value)
//   value[key] =  val
//   await storeData(cd , value);
// }


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