import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export const DimensionValue = {
    screenWidth,
    cardWidth: screenWidth * 0.85,
    chartSize: screenWidth * 0.45,
    scale: screenWidth / 375,
};
