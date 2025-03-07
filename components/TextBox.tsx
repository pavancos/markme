import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';

const TextBox: React.FC<TextProps> = ({ style, ...props }) => {
    return <Text style={[styles.defaultFont, style]} {...props} />;
};

const styles = StyleSheet.create({
    defaultFont: {
        fontFamily: 'Basic_400Regular',
    },
});

export default TextBox;
