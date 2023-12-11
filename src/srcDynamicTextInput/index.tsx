import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BootSplash from 'react-native-bootsplash';

//default list of text input
let data = [
  {
    text: '',
    isRequired: false,
    type: 'numeric', //keyboard type
  },
  {
    text: '',
    isRequired: false,
    type: 'email-address',
  },
  {
    text: '',
    isRequired: false,
    type: 'numeric',
  },
  {
    text: '',
    isRequired: false,
    type: 'default',
  },
];

const App: FC = () => {
  useEffect(() => {
    BootSplash.hide();
  }, []);

  const [myTextInput, setMyTextInput] = useState(data);

  //add new text input
  const onAdd = () => {
    let cloneArry = [...myTextInput];
    cloneArry.push({
      text: '',
      isRequired: false,
      type: 'default',
    });
    setMyTextInput(cloneArry);
  };

  //remove text input at particular index
  const onDelete = useCallback(
    (index: number) => {
      let cloneArry = [...myTextInput];
      let filterArry = cloneArry.filter((val, i) => {
        if (i !== index) {
          return val;
        }
      });
      setMyTextInput(filterArry);
    },
    [myTextInput]
  );

  //put text inside particular object
  const onChangeText = useCallback(
    (text: string, index: number) => {
      let cloneArry = [...myTextInput];
      cloneArry[index] = { ...cloneArry[index], text: text };
      setMyTextInput(cloneArry);
    },
    [myTextInput]
  );

  //check if all text input has text inputted then return true else print text is required at those text inputs
  const onDone = useCallback(() => {
    let hitApi = true;
    let cloneArry = [...myTextInput];

    let checkEmptyValue = cloneArry.map((val, i) => {
      if (val?.text == '') {
        hitApi = false;
        return { ...val, isRequired: true };
      } else {
        return { ...val, isRequired: false };
      }
    });
    setMyTextInput(checkEmptyValue);

    if (hitApi) {
      Alert.alert('api hit');
    }
    console.log('onDone', myTextInput);
  }, [myTextInput]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Pressable onPress={onAdd} style={styles.btnStyle}>
          <Text style={{ color: 'red' }}>Add+</Text>
        </Pressable>

        <KeyboardAwareScrollView>
          {myTextInput.map((val, i) => {
            return (
              <View key={i} style={styles.boxView}>
                <View style={{ flex: 0.8 }}>
                  <TextInput
                    value={val.text}
                    key={i}
                    placeholder="Enter value"
                    style={styles.inputStyle}
                    onChangeText={(text) => onChangeText(text, i)}
                    keyboardType={val?.type ?? 'default'}
                  />
                  {!!val?.isRequired ? (
                    <Text style={{ color: 'red', marginTop: 4 }}>This filed is required*</Text>
                  ) : null}
                </View>
                {i !== 0 ? (
                  <TouchableOpacity
                    style={{ flex: 0.2, marginLeft: 16 }}
                    onPress={() => onDelete(i)}
                  >
                    <Text>Delete</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={{ flex: 0.2, marginLeft: 16 }} />
                )}
              </View>
            );
          })}
        </KeyboardAwareScrollView>

        <TouchableOpacity onPress={onDone} style={styles.doneStyle}>
          <Text>DONE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  inputStyle: {
    backgroundColor: '#DADADA',
    height: 42,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  btnStyle: {
    marginBottom: 8,
  },
  doneStyle: {
    backgroundColor: 'green',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  boxView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default App;
