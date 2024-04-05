import { Realm } from 'realm';
import { useObject, useQuery, useRealm } from '@realm/react';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Person } from '../models/Person';
import { Car } from '../models/Car';

const CreateScreen = () => {
  const realm = useRealm();
  const persons = useQuery(Person); // to get all list in array
  // const myTask = useObject(Task, _id); // to get specific item.object
  const cars = useQuery(Car);

  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');

  const handleUserNameChange = (text) => {
    setUserName(text);
  };

  const handleAgeChange = (text) => {
    setAge(+text);
  };

  const addSampleCars = () => {
    realm.write(() => {
      realm.create('Car', {
        _id: new Realm.BSON.ObjectID(),
        c_name: 'Toyota Camry',
        c_color: 'Red',
      });
      realm.create('Car', {
        _id: new Realm.BSON.ObjectID(),
        c_name: 'Honda Accord',
        c_color: 'Blue',
      });
      realm.create('Car', {
        _id: new Realm.BSON.ObjectID(),
        c_name: 'Ford Mustang',
        c_color: 'Yellow',
      });
    });
  };

  const handleSubmit = () => {
    addSampleCars();
    realm.write(() => {
      realm.create('Person', {
        _id: new Realm.BSON.ObjectID(),
        name: userName,
        age,
        cars,
        address: {
          country: 'India',
        },
      });
    });
    setUserName('');
    setAge('');
  };

  const onPressDelete = (item) => {
    realm.write(() => {
      realm.delete(item);
    });
  };

  const onPressItem = (person) => {
    realm.write(() => {
      // Retrieve the person object using the primary key
      const userToUpdate = realm.objectForPrimaryKey('Person', person._id);

      // Increment the age by 1
      if (userToUpdate) {
        userToUpdate.age += 1;
      }
    });

    /* 1. FINDING EXAMPLE BASED ON QUERY
      // filter for tasks that have just-started or short-running progress
  const lowProgressTasks = useQuery(Task, tasks => {
    return tasks.filtered(
      '$0 <= progressMinutes && progressMinutes < $1',
      1,
      10,
    );
  });

    // retrieve the set of Task objects
  const tasks = useQuery(Task);

  // Sort tasks by name in ascending order
  const tasksByName = useQuery(Task, tasks => {
    return tasks.sorted('name');
  });

  // Sort tasks by name in descending order
  const tasksByNameDescending = useQuery(Task, tasks => {
    return tasks.sorted('name', true);
  });

  // Sort tasks by priority in descending order and then by name alphabetically
  const tasksByPriorityDescendingAndName = useQuery(Task, tasks => {
    return tasks.sorted([
      ['priority', true],
      ['name', false],
    ]);
  });
  
  // Sort Tasks by Assignee's name.
  const tasksByAssigneeName = useQuery(Task, tasks => {
    return tasks.sorted('assignee.name');
  });
    */

    /**
     * 2. UPDATE OR INSERT EG.
     realm.write(() => {
    // Add a new Task to the realm. Since no task with ID 1234
    // has been added yet, this adds the instance to the realm.
    myTask = realm.create(
      'Task',
      {_id: 1234, name: 'Wash the car', progressMinutes: 0},
      'modified',
    );
    // If an object exists, setting the third parameter (`updateMode`) to
    // "modified" only updates properties that have changed, resulting in
    // faster operations.
    myTask = realm.create(
      'Task',
      {_id: 1234, name: 'Wash the car', progressMinutes: 5},
      'modified',
    );
  });
     */
  };

  console.log('personspersonspersons', JSON.stringify(persons));

  return (
    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={userName}
            onChangeText={handleUserNameChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            value={age}
            onChangeText={handleAgeChange}
            keyboardType="numeric"
          />
          <Button title="Add User" onPress={handleSubmit} />
        </View>
        <FlatList
          data={persons}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onPressItem(item)} style={styles.userItem}>
              <Text>{item.name}</Text>
              <Text>{item.age}</Text>
              <Text onPress={() => onPressDelete(item)} style={{ fontWeight: 'bold' }}>
                X
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
  list: {
    alignItems: 'center',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '90%',
  },
});

export default CreateScreen;
