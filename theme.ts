import React from 'react';
import { extendTheme } from 'native-base';

export const theme = extendTheme({
	config: {
		initialColorMode: 'dark',
	},
	fontConfig: {
		300: {
			normal: 'Inter_300Light',
		},
		400: {
			normal: 'Inter_400Regular',
		},
		500: {
			normal: 'Inter_500Medium',
		},
		600: {
			normal: 'Inter_600SemiBold',
		},
		700: {
			normal: 'Inter_700Bold',
		},
	},
	fonts: {
		heading: 'Inter_500Bold',
		body: 'Inter_400Regular',
		mono: 'Inter',
	},
});
