import { Flex, FormControl, Icon, IconButton, Input, Text, View } from 'native-base';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

export default function WorkoutCard({
	item,
	expanded,
	toggleExpanded,
}: {
	item: any;
	expanded: boolean;
	toggleExpanded: (item: any) => void;
}) {
	const [expandedItems, setExpandedItems] = useState<any[]>([]);

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
					<Flex flexDir='row'>
						<View>
							<FormControl>
								<FormControl.Label>Weight</FormControl.Label>
								<Input value={item.weight} />
							</FormControl>
						</View>
						<View>
							{item.setsData.map((set: any) => {
								return (
									<View key={set.name}>
										<Text color='#fff'>
											{set.name},{set.reps}
										</Text>
									</View>
								);
							})}
						</View>
					</Flex>
				</View>
			) : null}
		</View>
	);
}
