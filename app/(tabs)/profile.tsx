import Separator from '@/components/Separator';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import React from 'react';
import { SeparatorType } from '@/components/Separator';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Separator type={SeparatorType.Horizontal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
