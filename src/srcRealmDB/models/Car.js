// 2

import { Realm } from 'realm';

export class Car extends Realm.Object {
  static schema = {
    name: 'Car',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      c_name: 'string',
      c_color: 'string',
      date: {
        type: 'date',
        default: () => new Date(),
      },
    },
  };
}
