import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './reduxWIthTS/hooks';
import { Note, addNote, noteSelector } from './reduxWIthTS/noteSlice';
import { fetchUsers, usersSelector } from './reduxWIthTS/userSlice';

const Notes = () => {
    const dispatch = useAppDispatch();
    const notesList = useAppSelector(noteSelector);
    const userList = useAppSelector(usersSelector)

    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])


    console.log(userList);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 100, alignItems: 'center' }}>
            <TextInput
                placeholder="Enter title"
                value={title}
                onChangeText={(txt) => setTitle(txt)}
                placeholderTextColor={'grey'}
                style={styles.ti}
            />
            <TextInput
                placeholder="Enter description"
                value={desc}
                onChangeText={(txt) => setDesc(txt)}
                placeholderTextColor={'grey'}
                style={styles.ti}
            />
            <Button
                title="Add Note"
                onPress={() => {
                    dispatch(addNote({ title, desc }));
                    setTitle('');
                    setDesc('');
                }}
            />
            <FlatList
                data={notesList}
                keyExtractor={(item, index) => index + ''}
                renderItem={({ item, index }: { item: Note, index: number }) => (
                    <View style={{ padding: 10, backgroundColor: 'red', margin: 10 }}>
                        <Text>{index} - {item.title}</Text>
                        <Text>{item.desc}</Text>
                    </View>
                )
                }
            />
        </View >
    );
};

export default Notes;

const styles = StyleSheet.create({
    ti: {
        padding: 5,
        color: '#000',
        width: '90%',
        height: 50,
        backgroundColor: 'cyan',
        borderWidth: 1,
        marginBottom: 10,
    },
});
