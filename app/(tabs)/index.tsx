import { StyleSheet, FlatList, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { WorkoutDataModel } from '@/constants/DataModels';
import { DEMO_WORKOUTS } from '@/constants/Data';
import { Image } from 'react-native';
import { Link } from 'expo-router';

export default function WorkoutListTabScreen(workouts: WorkoutDataModel[]) {
  workouts = DEMO_WORKOUTS;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Workout</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <FlatList
        style={styles.flatList}
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>

          <View style={styles.listItemContainer}>
            <Link href={{
              pathname: "/workout",
              params: { workoutID: item.id },
            }} asChild style={styles.linkItemContainer} >
              <Pressable
                style={({ pressed }) =>
                  pressed
                    ? [styles.listItemContainer, styles.listItemContainerPressed]
                    : styles.listItemContainer
                }
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
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  linkItemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  listItemContainerPressed: {
    opacity: 0.5
  }
});