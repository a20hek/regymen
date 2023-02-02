import { StatusBar } from 'expo-status-bar';
import {
	View,
	Input,
	FormControl,
	Select,
	Flex,
	Button,
	Text,
	Heading,
	KeyboardAvoidingView,
} from 'native-base';
import { useState, useCallback } from 'react';

import { Workout } from '../models/Workout';
import { Set } from '../models/Set';
import { WorkoutRealmContext } from '../models';

import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddWorkoutScreen({ navigation }: { navigation: any }) {
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
		<SafeAreaView>
			<KeyboardAvoidingView p='6' minH='full' bg='#0d0d0d'>
				<Heading
					mb='32px'
					fontSize='3xl'
					fontWeight={600}
					color='gray.400'
					mt='32px'
					// textAlign='center'
				>
					Add Workout
				</Heading>
				<FormControl>
					<FormControl.Label mt={6}>Workout</FormControl.Label>
					<Controller
						control={control}
						rules={{ required: true }}
						name='name'
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								color='#fff'
								value={value}
								mb='2'
								size='lg'
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

					<FormControl.Label mt={6}>Day</FormControl.Label>

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
								color='#fff'
								size='lg'>
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
					<Flex direction='row' w='100%' justifyContent='space-between' mt={6}>
						<Flex w='30%'>
							<FormControl.Label>Weight</FormControl.Label>
							<Controller
								control={control}
								rules={{ required: true }}
								name='weight'
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										placeholder='12'
										mb='2'
										// mr='8'
										color='#fff'
										w='full'
										size='lg'
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
						<Flex w='30%'>
							<FormControl.Label>Sets</FormControl.Label>
							<Controller
								control={control}
								rules={{ required: true }}
								name='sets'
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										placeholder='3'
										mb='2'
										// w='30%'
										// mr='8'
										size='lg'
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
						<Flex w='30%'>
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
										// w='48px'
										size='lg'
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
					// color='#fff'
					_text={{
						color: 'gray.900',
						fontSize: '16px',
						fontFamily: 'Inter_500Medium',
					}}
					colorScheme='gray'
					bg='gray.300'
					borderRadius='lg'
					borderColor='gray.300'
					my='8'
					mx='auto'
					ml={6}
					mb={16}
					w='full'
					position='absolute'
					bottom='0'
					onPress={handleSubmit(handleAddWorkout)}>
					Create
				</Button>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
