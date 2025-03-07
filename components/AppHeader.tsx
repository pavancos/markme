import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import TextBox from './TextBox';
import AppHeaderLogo from './svgs/AppHeaderLogo';

const AppHeader = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <AppHeaderLogo></AppHeaderLogo>
        </View>
        <TouchableOpacity>
          <TextBox style={styles.title}>XenDev</TextBox>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "black",
  },
  header: {
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 16,
    borderBottomWidth: 1,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppHeader;