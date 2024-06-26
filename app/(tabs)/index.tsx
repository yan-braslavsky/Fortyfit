import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { WorkoutDataModel } from '@/constants/DataModels';
import { DEMO_WORKOUTS } from '@/constants/Data';
import Colors from '@/constants/Colors';
import WorkoutListItem from '@/components/WorkoutListItem';

export default function WorkoutListTabScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={DEMO_WORKOUTS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <WorkoutListItem item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listContent: {
    padding: 10,
  },
});
