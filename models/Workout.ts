import { Realm } from '@realm/react';

export class Workout extends Realm.Object {
	_id!: Realm.BSON.ObjectId;
	name!: string;
	day!: string;
	sets!: number;
	reps!: number;
	createdAt!: Date;

	static primaryKey = '_id';

	static generate(name: string, day: string, sets: number, reps: number) {
		return {
			_id: new Realm.BSON.ObjectId(),
			name,
			day,
			sets,
			reps,
			createdAt: new Date(),
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
			createdAt: 'date',
		},
	};
}
