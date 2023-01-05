import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {
	View,
	Input,
	FormControl,
	Select,
	Flex,
	Button,
	Fab,
	Icon,
	FlatList,
	Text,
} from 'native-base';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { WorkoutRealmContext } from '../models';
import { Workout } from '../models/Workout';
// add workout

// - name
// - select day
// - no of sets
// - no of reps
// if no of reps ===

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
	const { useQuery } = WorkoutRealmContext;
	const workouts = useQuery(Workout);
	console.log(workouts);
	return (
		<>
			<FlatList
				data={workouts}
				keyExtractor={(task) => task._id.toString()}
				renderItem={({ item }) => <Text color='#fff'>{item.name}</Text>}
			/>
			<Fab
				renderInPortal={false}
				shadow={2}
				size='sm'
				icon={<Icon color='white' as={AntDesign} name='plus' size='md' />}
				onPress={() => navigation.navigate('Modal')}
			/>
		</>
	);
}
