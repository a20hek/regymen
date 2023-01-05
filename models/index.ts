import { Workout } from './Workout';
import { createRealmContext } from '@realm/react';

export const WorkoutRealmContext = createRealmContext({
	schema: [Workout],
});
