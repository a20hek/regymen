import { StatusBar } from 'expo-status-bar';
import { View, Input, FormControl, Select, Flex, Button, Text } from 'native-base';
import { useState, useCallback } from 'react';

import { Workout } from '../models/Workout';
import { Set } from '../models/Set';
import { WorkoutRealmContext } from '../models';

import { useForm, Controller } from 'react-hook-form';

export default function ModalScreen({ navigation }: { navigation: any }) {
	const { useRealm } = WorkoutRealmContext;
	const realm = useRealm();

	const handleAddWorkout = useCallback(
		(data: { name: string; day: string; sets: number; reps: number; weight: number }) => {
			const { name, day, sets, reps, weight } = data;
			realm.write(() => {
				realm.create('Workout', Workout.generate(name, day, sets, reps, weight));
			});
			navigation.navigate('Today');
		},

		[realm]
	);

	interface FormData {
		name: string;
		day: string;
		sets: number;
		reps: number;
	}

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			day: '',
			sets: NaN,
			reps: NaN,
			weight: NaN,
		},
	});

	return (
		<View p='8' bg='#000' minH='full'>
			<FormControl>
				<FormControl.Label>Workout</FormControl.Label>
				<Controller
					control={control}
					rules={{ required: true }}
					name='name'
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							color='#fff'
							value={value}
							mb='2'
							onBlur={onBlur}
							onChangeText={(val) => onChange(val)}
							placeholder='Inclined Bench Press'
						/>
					)}
				/>
				{errors.name && (
					<Text color='red.500' fontWeight='light' fontSize='12px'>
						{errors.name.message}
					</Text>
				)}

				<FormControl.Label>Day</FormControl.Label>

				<Controller
					control={control}
					rules={{ required: true }}
					name='day'
					render={({ field: { onChange, onBlur, value } }) => (
						<Select
							accessibilityLabel='Day'
							placeholder='Day'
							mb='2'
							onValueChange={(val) => onChange(val)}
							selectedValue={value}
							color='#fff'>
							<Select.Item label='PUSH' value='push' />
							<Select.Item label='PULL' value='pull' />
							<Select.Item label='LEGS' value='legs' />
						</Select>
					)}
				/>
				{errors.day && (
					<Text color='red.500' fontWeight='light' fontSize='12px'>
						{errors.day.message}
					</Text>
				)}
				<Flex direction='row'>
					<Flex>
						<FormControl.Label>Sets</FormControl.Label>
						<Controller
							control={control}
							rules={{ required: true }}
							name='sets'
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									placeholder='3'
									mb='2'
									w='48px'
									mr='8'
									color='#fff'
									keyboardType='numeric'
									onBlur={onBlur}
									onChangeText={(val) => onChange(parseInt(val, 10))}
									value={!isNaN(value) ? String(value) : ''}
								/>
							)}
						/>
						{errors.sets && (
							<Text color='red.500' fontWeight='light' fontSize='12px'>
								{errors.sets.message}
							</Text>
						)}
					</Flex>
					<Flex>
						<FormControl.Label>Weight</FormControl.Label>
						<Controller
							control={control}
							rules={{ required: true }}
							name='weight'
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									placeholder='12'
									mb='2'
									color='#fff'
									w='48px'
									onBlur={onBlur}
									onChangeText={(val) => onChange(parseInt(val, 10))}
									value={!isNaN(value) ? String(value) : ''}
								/>
							)}
						/>
						{errors.weight && (
							<Text color='red.500' fontWeight='light' fontSize='12px'>
								{errors.weight.message}
							</Text>
						)}
					</Flex>
					<Flex>
						<FormControl.Label>Reps</FormControl.Label>
						<Controller
							control={control}
							rules={{ required: true }}
							name='reps'
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									placeholder='12'
									mb='2'
									color='#fff'
									w='48px'
									onBlur={onBlur}
									onChangeText={(val) => onChange(parseInt(val, 10))}
									value={!isNaN(value) ? String(value) : ''}
								/>
							)}
						/>
						{errors.reps && (
							<Text color='red.500' fontWeight='light' fontSize='12px'>
								{errors.reps.message}
							</Text>
						)}
					</Flex>
				</Flex>
			</FormControl>
			<Button
				variant='outline'
				color='#fff'
				_text={{ color: '#fff' }}
				my='8'
				onPress={handleSubmit(handleAddWorkout)}>
				Add Workout
			</Button>
		</View>
	);
}
