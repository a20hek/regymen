import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { View, Input, FormControl, Select, Flex, Button } from 'native-base';
import { useState } from 'react';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
	const [workout, setWorkout] = useState<string>('');
	const [day, setDay] = useState<string>('');
	const [sets, setSets] = useState<string>();
	const [reps, setReps] = useState<string>();

	const handleChangeWorkout = (text: string) => {
		setWorkout(text);
	};
	const handleChangeSets = (text: string) => {
		setWorkout(text);
	};
	const handleChangeReps = (text: string) => {
		setWorkout(text);
	};

	return (
		<View p='8' bg='#000' minH='full'>
			<FormControl>
				<FormControl.Label>Workout</FormControl.Label>
				<Input value={workout} mb='2' onChangeText={handleChangeWorkout} />
				<FormControl.Label>Day</FormControl.Label>
				<Select
					accessibilityLabel='Day'
					placeholder='Day'
					mb='2'
					selectedValue={day}
					onValueChange={(itemValue) => setDay(itemValue)}>
					<Select.Item label='PUSH' value='push' />
					<Select.Item label='PULL' value='pull' />
					<Select.Item label='LEGS' value='legs' />
				</Select>
				<Flex direction='row'>
					<Flex>
						<FormControl.Label>Sets</FormControl.Label>
						<Input
							mb='2'
							w='48px'
							mr='8'
							value={sets}
							onChangeText={handleChangeSets}
						/>
					</Flex>
					<Flex>
						<FormControl.Label>Reps</FormControl.Label>
						<Input mb='2' w='48px' value={reps} onChangeText={handleChangeReps} />
					</Flex>
				</Flex>
			</FormControl>
			<Button variant='outline' color='#fff' _text={{ color: '#fff' }}>
				Add Workout
			</Button>
		</View>
	);
}
