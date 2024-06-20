import { StyleSheet, FlatList, Pressable } from 'react-native';
import { WorkoutDataModel } from '@/constants/DataModels';
import { DEMO_WORKOUTS } from '@/constants/Data';
import { Image } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';
import Colors from '@/constants/Colors';
import { Text, View } from 'react-native';
import Separator, { SeparatorType } from '@/components/Separator';

export default function WorkoutListTabScreen(workouts: WorkoutDataModel[]) {
  workouts = DEMO_WORKOUTS;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Workout</Text>
      <Separator type={SeparatorType.Horizontal} />

      <FlatList
        style={styles.flatList}
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>

          <View style={styles.listItemContainer}>
            <Link href={{

              pathname: "/workout",
              params: { workoutID: item.id },
            }} asChild

              style={styles.linkItemContainer}
            >
              <Pressable
                style={({ pressed }) =>
                  pressed
                    ? [styles.listItemContainer, styles.listItemContainerPressed]
                    : styles.listItemContainer
                }

                onPress={() => { }}
              >
                <Image source={{ uri: item.imageUrl }} style={{ width: 50, height: 50 }} />
                <Text style={styles.title}>{item.name}</Text>
              </Pressable>
            </Link>
          </View>
        }
      />
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
    margin: 20,
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
  flatList: {
    flex: 1,
    width: '100%',
  },
  listItemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.border,
    borderWidth: 1,
    borderRadius: 10,
  },
  linkItemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  listItemContainerPressed: {
    opacity: 0.5
  }
});