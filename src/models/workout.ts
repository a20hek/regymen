import { Realm } from '@realm/react';
import { Set } from './set';

export class Workout extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  day!: string;
  weight!: number;
  sets!: number;
  reps!: number;
  setsData!: Set[];
  createdAt!: Date;
  updatedAt!: Date;

  static primaryKey = '_id';
  static setsData: any;

  static generate(
    name: string,
    day: string,
    sets: number,
    reps: number,
    weight: number,
  ) {
    Workout.setsData = [];
    for (let i = 0; i < sets; i++) {
      const setName = 'set' + (i + 1);
      Workout.setsData.push(Set.generate(setName, reps));
    }
    return {
      _id: new Realm.BSON.ObjectId(),
      name,
      day,
      sets,
      reps,
      weight,
      setsData: Workout.setsData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static schema = {
    name: 'Workout',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      day: 'string',
      sets: 'int',
      reps: 'int',
      weight: 'int',
      setsData: { type: 'list', objectType: 'Set', default: [] },
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}
