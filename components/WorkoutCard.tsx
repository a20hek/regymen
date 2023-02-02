import { Button, Flex, FormControl, Icon, IconButton, Input, Text, View } from 'native-base';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { WorkoutRealmContext } from '../models';
import { Workout } from '../models/Workout';

export default function WorkoutCard({
	item,
	expanded,
	toggleExpanded,
}: {
	item: any;
	expanded: boolean;
	toggleExpanded: (item: any) => void;
}) {
	const [setsData, setSetsData] = useState<any[]>(item.setsData);
	const [weight, setWeight] = useState<number>(item.weight);
	const { useRealm } = WorkoutRealmContext;
	const realm = useRealm();

	const handleInputChange = (index: number, value: string) => {
		const reps = parseInt(value, 10);
		setSetsData((prevSetsData) =>
			prevSetsData.map((set, i) => {
				if (i === index) {
					return {
						name: `set ${i + 1}`,
						reps: reps,
					};
				}
				return set;
			})
		);
		console.log(setsData);
	};

	const handleSubmit = (weight: number, setsData: any) => {
		const workout: Workout | null = realm.objectForPrimaryKey('Workout', item._id);
		if (workout) {
			realm.write(() => {
				workout.weight = weight;
				workout.setsData = setsData;
			});
		}
	};

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
							<Icon color='gray.300' as={Entypo} name='chevron-small-up' size='md' />
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
					<FormControl>
						<Flex flexDir='row' justifyContent='space-between' alignItems='center'>
							<View>
								<Input
									textAlign='center'
									value={isNaN(weight) ? '' : weight.toString()}
									fontSize='24px'
									size='2xl'
									color='#d1d1d1'
									w='70px'
									h='58px'
									onChangeText={(val) => {
										setWeight(parseInt(val, 10));
									}}
									borderRadius='lg'
								/>
							</View>
							<View>
								{item.setsData.map((set: any, index: any) => {
									return (
										<Flex key={index} flexDir='row' alignItems='center'>
											<View
												borderColor='#474747'
												borderWidth='1px'
												borderRadius='full'
												w='40px'
												h='40px'
												p='8px'
												my='8px'
												mr='12px'>
												<Text mx='auto' my='auto' color='#848484'>
													{index + 1}
												</Text>
											</View>
											{set.reps && (
												<Input
													fontSize='18px'
													textAlign='center'
													color='#d1d1d1'
													my='8px'
													w='60px'
													borderRadius='lg'
													value={
														isNaN(setsData[index].reps)
															? ''
															: setsData[index].reps.toString()
													}
													onChangeText={(val) => {
														handleInputChange(index, val);
													}}
												/>
											)}
										</Flex>
									);
								})}
							</View>
						</Flex>
					</FormControl>
					<Button
						variant='outline'
						borderColor='#fff'
						_text={{ color: '#fff', fontSize: '18px' }}
						mx='auto'
						mt='24px'
						colorScheme='gray'
						borderRadius='10px'
						w='30%'
						onPress={() => handleSubmit(weight, setsData)}>
						update
					</Button>
				</View>
			) : null}
		</View>
	);
}
