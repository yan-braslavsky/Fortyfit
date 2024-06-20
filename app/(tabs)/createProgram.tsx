import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import React from 'react';
import Separator, { SeparatorType } from '@/components/Separator';

export default function CreateProgramTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Program Tab</Text>
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
