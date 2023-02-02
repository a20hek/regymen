import { RootTabScreenProps } from '../types';
import { View, Fab, Icon, Text } from 'native-base';
import { Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { WorkoutRealmContext } from '../models';
import { Workout } from '../models/Workout';
import { Set } from '../models/Set';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Realm } from '@realm/react';
import { ExpandableFlatList } from '../components/ExpandableFlatList';
import { SplashModal } from '../components/SplashModal';
import WorkoutCard from '../components/WorkoutCard';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TodayScreen({ navigation }: RootTabScreenProps<'Today'>) {
	const [workoutSplit, setWorkoutSplit] = useState<string | null>(null);

	const { useQuery } = WorkoutRealmContext;
	const workouts = useQuery(Workout);
	const sets = useQuery(Set);
	const day = workouts.filtered(`day == '${workoutSplit}'`);
	console.log(workouts);

	const renderItem = ({
		item,
		expanded,
		toggleExpanded,
	}: {
		item: any;
		expanded: boolean;
		toggleExpanded: (item: any) => void;
	}) => {
		return <WorkoutCard item={item} expanded={expanded} toggleExpanded={toggleExpanded} />;
	};

	const keyExtractor = (day: any) => day._id.toString();

	const data = day;

	return (
		<SafeAreaView>
			<View h='full' py={4} px='12px' bg='#0d0d0d'>
				<SplashModal setWorkoutSplit={setWorkoutSplit} />
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
					onPress={() => navigation.navigate('Add Workout')}
				/>
			</View>
		</SafeAreaView>
	);
}
