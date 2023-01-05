import { Realm } from '@realm/react';

export class Workout extends Realm.Object {
	_id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
	name!: string;
	day!: 'PUSH' | 'PULL' | 'LEGS' | 'REST';
	sets!: number;
	reps!: number;
	createdAt: Date = new Date();

	// static primaryKey = '_id';

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
