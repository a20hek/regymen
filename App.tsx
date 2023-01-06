import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { NativeBaseProvider } from 'native-base';
import { Realm, createRealmContext } from '@realm/react';
import { WorkoutRealmContext } from './models';
import { StyleSheet } from 'react-native';
import {
	useFonts,
	Inter_400Regular,
	Inter_500Medium,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_300Light,
	Inter_200ExtraLight,
} from '@expo-google-fonts/inter';

import { theme } from './theme';

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	const { RealmProvider } = WorkoutRealmContext;

	let [fontsLoaded] = useFonts({
		Inter_200ExtraLight,
		Inter_300Light,
		Inter_400Regular,
		Inter_500Medium,
		Inter_600SemiBold,
		Inter_700Bold,
	});

	if (!isLoadingComplete && !fontsLoaded) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<RealmProvider>
					<StatusBar style='light' />
					<NativeBaseProvider theme={theme}>
						<Navigation colorScheme={colorScheme} />
					</NativeBaseProvider>
				</RealmProvider>
			</SafeAreaProvider>
		);
	}
}
