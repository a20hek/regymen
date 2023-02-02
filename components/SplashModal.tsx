import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Heading, Modal } from 'native-base';
import { useEffect, useState } from 'react';

export const SplashModal = ({ setWorkoutSplit }: { setWorkoutSplit: any }) => {
	const [isModalVisible, setModalVisible] = useState<boolean>(false);

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

	return (
		<Modal
			isOpen={isModalVisible}
			onClose={() => setModalVisible(false)}
			size='full'
			h='100%'
			// flex={1}
			bgColor='#0d0d0d'>
			<Modal.Content bgColor='#0d0d0d'>
				<Heading color='#fff' textAlign='center' fontSize='3xl' mb='24px' fontWeight={300}>
					Select Workout Day
				</Heading>
				<Button
					colorScheme='gray'
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
					colorScheme='gray'
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
					colorScheme='gray'
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
