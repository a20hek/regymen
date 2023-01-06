import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { NativeBaseProvider } from 'native-base';
import { Realm, createRealmContext } from '@realm/react';
import { WorkoutRealmContext } from './models';
import { StyleSheet } from 'react-native';

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	const { RealmProvider } = WorkoutRealmContext;

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<RealmProvider>
					<StatusBar style='light' />
					<NativeBaseProvider>
						<Navigation colorScheme={colorScheme} />
					</NativeBaseProvider>
				</RealmProvider>
			</SafeAreaProvider>
		);
	}
}
