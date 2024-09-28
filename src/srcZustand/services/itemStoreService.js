import axios from 'axios';
import useBasicStore from '../store/useBasicStore';

const BASE_URL = 'https://jsonplaceholder.typicode.com'; // Example URL

export const fetchItemsService = async (id) => {
  try {
    // Fetching items using a sample placeholder API (fetching a post as an example)
    const response = await axios.post(`${BASE_URL}/posts`, { userId: id });

    // Mock token and items data, adapt based on your actual response structure
    const { data: items } = response;

    // Update store with fetched items
    const { addItem } = useBasicStore.getState();
    addItem({ id: items?.id, name: Date.now() }); // Assuming `items` is an array, adapt if needed.

    // Return the response data
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};
