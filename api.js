import Config from 'react-native-config';
import { articles } from './lib/rest_data';

export const fetchApiData = async route => {
  try {
    console.log("fetching from ",'https://easyslimandfit.com/api/' + route)
    //const response = await fetch(Config.API_URL + route);

    //TODO :need to be online 
    // let response = await fetch('https://easyslimandfit.com/api/' + route);
    // const json = await response.json();
    // return json;

    return articles
  } catch (error) {
    console.error(error);
    return null;
  }
};


// const auth = base64.encode(`${Config.WP_USERNAME}:${Config.WP_PASSWORD}`);

// export const updateData = async (route, data) => {
//   try {
//     fetch(Config.API_URL + route, {
//       method: 'POST',
//       headers: {
//         Authorization: `Basic ${auth}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };