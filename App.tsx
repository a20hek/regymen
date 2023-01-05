import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { NativeBaseProvider } from 'native-base';
import { Realm, createRealmContext } from '@realm/react';
import { WorkoutRealmContext } from './models';

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
					<NativeBaseProvider>
						<Navigation colorScheme={colorScheme} />
						<StatusBar />
					</NativeBaseProvider>
				</RealmProvider>
			</SafeAreaProvider>
		);
	}
}
