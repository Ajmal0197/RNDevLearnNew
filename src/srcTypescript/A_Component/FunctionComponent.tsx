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

// Interfaces
interface User {
    name: string;
    age: number;
}

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
