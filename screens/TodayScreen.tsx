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
	Box,
	Divider,
	IconButton,
	PresenceTransition,
} from 'native-base';
import { Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Entypo } from '@expo/vector-icons';
import { WorkoutRealmContext } from '../models';
import { Workout } from '../models/Workout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Realm } from '@realm/react';
import { useValue, timing, Transition } from 'react-native-reanimated';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TodayScreen({ navigation }: RootTabScreenProps<'Today'>) {
	const [isModalVisible, setModalVisible] = useState<boolean>(false);
	const [workoutSplit, setWorkoutSplit] = useState<string | null>(null);

	const [expandedItems, setExpandedItems] = useState<any[]>([]);

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

	const toggleExpanded = (item: any) => {
		if (expandedItems.includes(item)) {
			setExpandedItems(expandedItems.filter((i) => i !== item));
		}
	};

	interface ExpandableFlatListProps {
		data: Realm.Results<Workout & Realm.Object>;
		renderItem: (props: {
			item: any;
			expanded: boolean;
			toggleExpanded: (item: any) => void;
		}) => JSX.Element;
		keyExtractor: (item: any) => string;
	}

	const ExpandableFlatList: React.FC<ExpandableFlatListProps> = ({
		data,
		renderItem,
		keyExtractor,
	}) => {
		const [expandedItems, setExpandedItems] = useState<any[]>([]);

		const toggleExpanded = (item: any) => {
			if (expandedItems.includes(item)) {
				LayoutAnimation.configureNext({
					duration: 250,
					update: {
						type: 'easeInEaseOut',
					},
				});
				setExpandedItems(expandedItems.filter((i) => i !== item));
			} else {
				LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
				setExpandedItems([...expandedItems, item]);
			}
		};

		return (
			<FlatList
				data={data}
				keyExtractor={keyExtractor}
				renderItem={({ item }) => {
					const expanded = expandedItems.includes(item);
					return renderItem({ item, expanded, toggleExpanded });
				}}
			/>
		);
	};

	const renderItem = ({
		item,
		expanded,
		toggleExpanded,
	}: {
		item: any;
		expanded: boolean;
		toggleExpanded: (item: any) => void;
	}) => {
		return (
			<View
				borderWidth='1px'
				borderRadius='xl'
				borderColor='#383838'
				px='16px'
				py='24px'
				my='12px'>
				<Flex flexDir='row' justifyContent='space-between'>
					<Text fontSize='24px' color='#fff'>
						{item.name}
					</Text>
					<IconButton
						borderWidth='1px'
						borderRadius='full'
						h='40px'
						w='40px'
						borderColor='gray.500'
						icon={
							expanded ? (
								<Icon
									color='gray.300'
									as={Entypo}
									name='chevron-small-up'
									size='md'
								/>
							) : (
								<Icon
									color='gray.300'
									as={Entypo}
									name='chevron-small-down'
									size='md'
								/>
							)
						}
						onPress={() => toggleExpanded(item)}
					/>
				</Flex>
				{expanded ? (
					<View
						mx='6px'
						mt='16px'
						mb='8px'
						bg='#1a1a1a'
						borderRadius='xl'
						py='24px'
						px='16px'>
						<Text fontSize='18px' color='#fff'>
							{item.weight}
						</Text>
					</View>
				) : null}
			</View>
		);
	};

	const keyExtractor = (day: any) => day._id.toString();

	const data = day;

	return (
		<SafeAreaView>
			<View h='full' py={4} px='12px' bg='#0d0d0d'>
				<SplashModal />
				<Text fontSize='42px' fontFamily='Inter_300Light' mt='60px'>
					Today
				</Text>
				<ExpandableFlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={keyExtractor}
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
