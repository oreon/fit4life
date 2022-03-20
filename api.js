import Config from 'react-native-config';

export const fetchApiData = async route => {
  try {
    const response = await fetch(Config.API_URL + route);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return null;
  }
};


const auth = base64.encode(`${Config.WP_USERNAME}:${Config.WP_PASSWORD}`);

export const updateData = async (route, data) => {
  try {
    fetch(Config.API_URL + route, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
};