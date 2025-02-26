import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import TextBox from './TextBox';

const AppHeader = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TextBox style={styles.title}>Markme</TextBox>

        <TouchableOpacity>
          <TextBox style={styles.title}>XenDev</TextBox>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#000",
  },
  header: {
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 16,
    borderBottomWidth: 1,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AppHeader;