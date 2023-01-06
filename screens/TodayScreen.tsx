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
import { StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { WorkoutRealmContext } from '../models';
import { Workout } from '../models/Workout';
import { SafeAreaView } from 'react-native-safe-area-context';

// add workout

// - name
// - select day
// - no of sets
// - no of reps
// if no of reps ===

export default function TodayScreen({ navigation }: RootTabScreenProps<'Today'>) {
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

	const SplashModal = () => {
		return (
			<Modal
				isOpen={isModalVisible}
				onClose={() => setModalVisible(false)}
				size='full'
				h='100%'
				// flex={1}
				bgColor='#0d0d0d'>
				<Modal.Content bgColor='#0d0d0d'>
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
		);
	};

	const { useQuery } = WorkoutRealmContext;
	const workouts = useQuery(Workout);
	const day = workouts.filtered(`day == '${workoutSplit}'`);
	console.log(workouts, workoutSplit);

	return (
		<SafeAreaView>
			<View h='full' p={4} bg='#0d0d0d'>
				<SplashModal />
				<FlatList
					data={day}
					keyExtractor={(day) => day._id.toString()}
					renderItem={({ item }) => (
						<>
							<Text fontSize='18px' color='#fff'>
								{item.name}
							</Text>
						</>
					)}
				/>
				<Fab
					renderInPortal={false}
					colorScheme='dark'
					bgColor='gray.200'
					rounded='lg'
					shadow={4}
					p={3}
					icon={<Icon color='black' as={AntDesign} name='plus' size='md' />}
					onPress={() => navigation.navigate('Modal')}
				/>
			</View>
		</SafeAreaView>
	);
}
