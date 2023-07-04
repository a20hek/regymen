import { Realm } from '@realm/react';

export class Set extends Realm.Object {
  static schema = {
    name: 'Set',
    properties: {
      name: 'string',
      reps: 'int',
    },
  };

  static generate(name: string, reps: number) {
    return { name, reps };
  }
}
