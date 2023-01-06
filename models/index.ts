import { Workout } from './Workout';
import { Set } from './Set';
import { createRealmContext } from '@realm/react';

export const WorkoutRealmContext = createRealmContext({
	schema: [Workout, Set],
	schemaVersion: 2,
});
