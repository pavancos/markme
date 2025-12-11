import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity,ActionSheetIOS } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextBox from './TextBox';
import AppHeaderLogo from './svgs/AppHeaderLogo';

const AppHeader = () => {

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <View>
          <AppHeaderLogo></AppHeaderLogo>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "black",
    paddingBottom:12
  },
  header: {
    backgroundColor: "rgba(0,0,0,0.8)",
    padding: 16,
    paddingBottom: 0,
    borderBottomWidth: 1,
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppHeader;