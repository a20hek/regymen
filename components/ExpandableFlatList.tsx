import { FlatList } from 'native-base';
import { useState } from 'react';
import { LayoutAnimation } from 'react-native';
import { Workout } from '../models/Workout';
import { Set } from '../models/Set';

interface ExpandableFlatListProps {
	data: Realm.Results<Workout & Set & Realm.Object>;
	renderItem: (props: {
		item: any;
		expanded: boolean;
		toggleExpanded: (item: any) => void;
	}) => JSX.Element;
	keyExtractor: (item: any) => string;
}

export const ExpandableFlatList: React.FC<ExpandableFlatListProps> = ({
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
