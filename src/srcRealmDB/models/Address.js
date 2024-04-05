// 3

import { Realm } from 'realm';

export class Address extends Realm.Object {
  static schema = {
    name: 'Address',
    embedded: true, // default: false
    properties: {
      country: 'string?', // ? means mandatory
    },
  };
}
