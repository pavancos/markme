import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useFonts, Basic_400Regular } from "@expo-google-fonts/basic";
const TextBox: React.FC<TextProps> = ({ style, ...props }) => {
    const [fontsLoaded] = useFonts({
        Basic_400Regular,
    });
    return <Text style={[styles.defaultFont, style]} {...props} />;
};

const styles = StyleSheet.create({
    defaultFont: {
        fontFamily: 'Basic_400Regular',
    },
});

export default TextBox;
