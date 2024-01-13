import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '..';
import { RouteProp } from '@react-navigation/native';

// Define an interface for the props expected by the Home component
interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>, // Navigation prop specific to the 'Home' screen
  route: RouteProp<RootStackParamList, 'Home'>; // Route prop specific to the 'Home' screen
}

interface User {
  name: string;
  age?: number;
  email?: string;
}
/* 
OR:
type User = {
  name: string, age?: number, email?: string
}
*/

interface List {
  title: string, price: number, id: number
}

type Ids = number[];


const Home = ({ navigation, route }: HomeScreenProps) => {

  const [counter, setCounter] = useState<number>(0)
  const [name, setName] = useState<string>('')
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [user, setUser] = useState<User>({ name: '', age: 0, email: '' })
  const [list, setList] = useState<List[]>([])
  const [ids, setIds] = useState<Ids>([])
  const [details, setDetails] = useState<null>(null)

  const useRefInput = useRef<TextInput>(null) //null must be default value 

  useEffect(() => {
    const fetchUserData = () => ({ name: 'ajmal' }); // Use parentheses to return an object
    // Simulate fetching data from an API or performing an asynchronous operation
    const fetchData = async () => {
      try {
        // Assuming you have an API call that returns user data
        const userData = await fetchUserData(); // Replace with your actual API call

        // Update the state variables with the fetched data
        setName(userData.name);
        setUser(userData);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Call the fetchData function
    fetchData();

    // Set counter to 10
    setCounter(10);

    // Initialize list with data
    setList([{ title: 'ajmal', price: 0, id: 100 }]);

    // Initialize ids with an array of numbers
    setIds([1, 2, 3, 4, 5]);

    // Set details to null
    setDetails(null);
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  return (
    <View>
      {/* fix: navigation.navigate('Details',{id:1}) */}
      <Button title='Go To Detail' onPress={() => navigation.navigate('Details')} />
      <TextInput ref={useRefInput} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
