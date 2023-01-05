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
	Modal,
	Heading,
} from 'native-base';
import { useEffect, useState } from 'react';
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
	const [isModalVisible, setModalVisible] = useState<boolean>(false);
	const [workoutSplit, setWorkoutSplit] = useState<string | null>(null);

	const checkModal = async () => {
		try {
			const lastDisplayed = await AsyncStorage.getItem('lastDisplayed');
			if (!lastDisplayed) {
				setModalVisible(true);
				// await AsyncStorage.setItem('lastDisplayed', 'true');
			} else {
				const elapsedTime = Date.now() - parseInt(lastDisplayed);
				if (elapsedTime >= 8 * 60 * 60 * 1000) {
					setModalVisible(true);
					// await AsyncStorage.setItem('lastDisplayed', 'true');
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		checkModal();
	}, []);

	const handleSelectWorkoutSplit = async (type: string) => {
		setWorkoutSplit(type);
		setModalVisible(false);
		// close the modal
		// try {
		// 	await AsyncStorage.setItem('lastDisplayed', Date.now().toString());
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	const { useQuery } = WorkoutRealmContext;
	const workouts = useQuery(Workout);
	const day = workouts.filtered(`day == '${workoutSplit}'`);
	console.log(workouts, workoutSplit);
	return (
		<>
			<Modal
				isOpen={isModalVisible}
				onClose={() => setModalVisible(false)}
				size='full'
				h='100%'
				flex={1}
				bgColor='#000'>
				<Modal.Content bgColor='#000'>
					<Heading
						color='#fff'
						textAlign='center'
						fontSize='3xl'
						mb='24px'
						fontWeight={300}>
						Select Workout Day
					</Heading>
					<Button
						w='75%'
						mx='auto'
						my='12px'
						py='20px'
						variant='outline'
						borderRadius='lg'
						_text={{ color: '#fff', fontSize: 'xl', fontWeight: 300 }}
						onPress={() => handleSelectWorkoutSplit('push')}>
						Push
					</Button>
					<Button
						w='75%'
						mx='auto'
						my='12px'
						py='20px'
						borderRadius='lg'
						variant='outline'
						_text={{ color: '#fff', fontSize: 'xl', fontWeight: 300 }}
						onPress={() => handleSelectWorkoutSplit('pull')}>
						Pull
					</Button>
					<Button
						w='75%'
						py='20px'
						mx='auto'
						my='12px'
						borderRadius='lg'
						variant='outline'
						_text={{ color: '#fff', fontSize: 'xl', fontWeight: 300 }}
						onPress={() => handleSelectWorkoutSplit('legs')}>
						Legs
					</Button>
				</Modal.Content>
			</Modal>
			<FlatList
				data={day}
				keyExtractor={(day) => day._id.toString()}
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
