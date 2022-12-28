import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { View, Input, FormControl, Select, Flex, Button } from 'native-base';
import { useState } from 'react';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
	const [workout, setWorkout] = useState<string>('');
	const [day, setDay] = useState<string>('');
	const [sets, setSets] = useState<number>(0);
	const [reps, setReps] = useState<number>(0);

	const handleChangeWorkout = (text: string) => {
		setWorkout(text);
	};
	const handleChangeSets = (text: string) => {
		setSets(parseInt(text, 10));
	};
	const handleChangeReps = (text: string) => {
		setReps(parseInt(text, 10));
	};

	return (
		<View p='8' bg='#000' minH='full'>
			<FormControl>
				<FormControl.Label>Workout</FormControl.Label>
				<Input
					color='#fff'
					value={workout}
					mb='2'
					onChangeText={handleChangeWorkout}
					placeholder='Inclined Bench Press'
				/>
				<FormControl.Label>Day</FormControl.Label>
				<Select
					accessibilityLabel='Day'
					placeholder='Day'
					mb='2'
					selectedValue={day}
					color='#fff'
					onValueChange={(itemValue) => setDay(itemValue)}>
					<Select.Item label='PUSH' value='push' />
					<Select.Item label='PULL' value='pull' />
					<Select.Item label='LEGS' value='legs' />
				</Select>
				<Flex direction='row'>
					<Flex>
						<FormControl.Label>Sets</FormControl.Label>
						<Input
							placeholder='3'
							mb='2'
							w='48px'
							mr='8'
							color='#fff'
							keyboardType='numeric'
							value={!isNaN(sets) ? String(sets) : ''}
							onChangeText={handleChangeSets}
						/>
					</Flex>
					<Flex>
						<FormControl.Label>Reps</FormControl.Label>
						<Input
							placeholder='12'
							mb='2'
							color='#fff'
							w='48px'
							value={!isNaN(reps) ? String(reps) : ''}
							onChangeText={handleChangeReps}
						/>
					</Flex>
				</Flex>
			</FormControl>
			<Button variant='outline' color='#fff' _text={{ color: '#fff' }} my='8'>
				Add Workout
			</Button>
		</View>
	);
}
