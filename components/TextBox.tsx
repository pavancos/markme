import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useFonts } from "@expo-google-fonts/basic";
import { AlbertSans_400Regular} from "@expo-google-fonts/dev";
const TextBox: React.FC<TextProps> = ({ style, ...props }) => {
    const [fontsLoaded] = useFonts({
        AlbertSans_400Regular,
    });
    return <Text style={[styles.defaultFont, style]} {...props} />;
};

const styles = StyleSheet.create({
    defaultFont: {
        fontFamily: 'AlbertSans_400Regular',
    },
});

export default TextBox;
