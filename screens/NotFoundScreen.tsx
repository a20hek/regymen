import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from 'native-base';
import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
	return (
		<View>
			<Text>This screen doesn't exist.</Text>
			<TouchableOpacity onPress={() => navigation.replace('Root')}>
				<Text>Go to home screen!</Text>
			</TouchableOpacity>
		</View>
	);
}
