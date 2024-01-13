import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

// Basic types
let count: number = 42;
let message: string = "Hello, React Native!";
let isActive: boolean = true;
let dynamicValue: any = "This can be anything.";

// Arrays
let numbers: number[] = [1, 2, 3, 4];
let names: Array<string> = ["John", "Jane", "Doe"];

// Objects
let user: { name: string; age: number } = { name: "John", age: 25 };

// Used in case of dynamic data
let dynamicData: any = fetchDataFromExternalSource();
function fetchDataFromExternalSource() { }

// Interfaces
interface User {
    name: string;
    age: number;
}

// Declare an array of objects with the defined interface
const people: User[] = [
    { name: "Alice", age: 25, },
    { name: "Bob", age: 30, },
    { name: "Charlie", age: 28, },
];

// Union Types (variable or property can only have one of these specific values.)
type Status = "active" | "inactive" | "pending";

// Function Types
type AddFunction = (a: number, b: number) => number;

// Generics   (The use of generics allows the Box interface to be flexible and reusable )
interface Box<T> {
    value: T; // The interface has a single property value of type T, meaning the value can be of any type.
}
// Creating a Box instance with string type
const stringBox: Box<string> = { value: "Hello, Generics!" };
// Creating a Box instance with number type
const numberBox: Box<number> = { value: 42 };


// Nullable and Optional Types
interface UserData {
    name: string;
    age?: number; // Optional property
    job: string | null; // Nullable property
}
const userWithOptional: UserData = { name: "John", job: null };
const userWithAge: UserData = { name: "Jane", age: 30, job: "Engineer" };

// Type Assertions ( In TypeScript, type assertions provide a way for you to tell the compiler that you know more about the type of a particular value than TypeScript does. This is useful when you're working with types that TypeScript can't infer accurately.)
let value: any = "Hello, TypeScript!"; // 'value' is of type 'any'
// Using a type assertion to tell TypeScript that 'value' is a string
let length: number = (value as string).length;

// Intersection Types (Intersection types are useful when you want to create a new type that encompasses properties from multiple types. The resulting type ensures that an object adhering to it must satisfy the requirements of all the intersected types.)
// Interface representing properties of a car
interface Car {
    brand: string;
    year: number;
}
// Interface representing properties of a driver
interface Driver {
    name: string;
    age: number;
}
// Intersection type combining properties of Car and Driver
type CarAndDriver = Car & Driver;
// Creating an instance of CarAndDriver
const carAndDriver: CarAndDriver = { brand: "Toyota", year: 2022, name: "Alice", age: 25 };

// fetchData takes a callback function as a parameter, and the callback is expected to have a return type of void.
function fetchData(callback: () => void): void {
    // Perform asynchronous operation and invoke the callback
    callback();
}

// Functional component using React.FC
const FunctionComponent: React.FC = () => {
    // React State
    const [status, setStatus] = useState<Status>('active');
    const [age, setAge] = useState<number>(27);


    // Function with Function Type
    const add: AddFunction = (a, b) => a + b;

    // Array of objects with defined interface
    const users: User[] = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 28 },
        { name: 'Charlie', age: 35 },
    ];

    // JSX
    return (
        <View>
            <Text>{message}</Text>
            <Text>Count: {count}</Text>
            <Text>Is Active? {isActive.toString()}</Text>
            <Text>Dynamic Value: {dynamicValue}</Text>

            <FlatList
                data={users}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>User: {item.name}, Age: {item.age}</Text>
                    </View>
                )}
            />

            {/* Union Type in action */}
            <Text>Status: {status}</Text>

            {/* Function Type in action */}
            <Text>Sum: {add(5, 7)}</Text>

            {/* Event handling with Union Type */}
            <TouchableOpacity onPress={() => setStatus('inactive')}>
                <Text>Set Inactive</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FunctionComponent;


/*
The provided code seems to cover a broad range of TypeScript concepts and React Native functionalities. It includes:

1. **Basic Types:**
   - `number`, `string`, `boolean`, `any`

2. **Arrays:**
   - `number[]`, `Array<string>`

3. **Objects:**
   - Object with properties `name` and `age`

4. **Interfaces:**
   - `User`, `UserData`, `Box<T>`, `Car`, `Driver`

5. **Union Types:**
   - `Status`, `string | null`

6. **Function Types:**
   - `AddFunction`, function parameters and return types

7. **Generics:**
   - `Box<T>`, `stringBox`, `numberBox`

8. **Nullable and Optional Types:**
   - `UserData` with optional and nullable properties

9. **Type Assertions:**
   - Type assertion with `(value as string)`

10. **Intersection Types:**
    - `CarAndDriver` combining properties of `Car` and `Driver`

11. **Callbacks and Asynchronous Operations:**
    - `fetchData` function taking a callback

12. **React State:**
    - `useState` for managing state variables (`status` and `age`)

13. **React Functional Component:**
    - `React.FC` used for defining the functional component (`FunctionComponent`)

14. **React Native Components:**
    - Usage of `View`, `Text`, `TouchableOpacity`, and `FlatList`

*/