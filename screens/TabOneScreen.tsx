import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { View, Input, FormControl, Select, Flex, Button, Fab, Icon } from 'native-base';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';

// add workout

// - name
// - select day
// - no of sets
// - no of reps
// if no of reps ===

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
	return (
		<>
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
