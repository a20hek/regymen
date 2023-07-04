import { Workout } from './workout';
import { Set } from './set';
import { createRealmContext } from '@realm/react';

export const WorkoutRealmContext = createRealmContext({
  schema: [Workout, Set],
  schemaVersion: 2,
});
