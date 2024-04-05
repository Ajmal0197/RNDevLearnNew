// 1
import { Realm } from 'realm';

export class Person extends Realm.Object {
  // https://www.mongodb.com/docs/realm/sdk/react-native/crud/create/#crud---create---react-native-sdk
  static schema = {
    name: 'Person',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      age: 'int?',
      date: {
        type: 'date',
        default: () => new Date(),
      },

      // cars: 'Car?', // for single object/item // https://www.mongodb.com/docs/realm/sdk/react-native/crud/create/#create-an-object-with-a-to-one-relationship

      // for array of objects/item // https://www.mongodb.com/docs/realm/sdk/react-native/crud/create/#create-an-object-with-a-to-many-relationship
      cars: {
        type: 'list',
        objectType: 'Car',
        optional: false,
      },

      address: 'Address',
    },
  };
}
