import React from 'react';
import { StyleSheet, Pressable, Image, Text, View } from 'react-native';
import { Link, router, useNavigation } from 'expo-router';
import Colors from '@/constants/Colors';
import { WorkoutDataModel } from '@/constants/DataModels';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const equipmentIconMapping = {
  'Rings': { icon: <FontAwesome5 name="ring" size={14} color={Colors.light.text} />, color: Colors.light.primary },
  'Gymnastic Ball': { icon: <FontAwesome5 name="volleyball-ball" size={14} color={Colors.light.text} />, color: Colors.light.secondary },
  'Dumbbell': { icon: <FontAwesome name="dumbbell" size={14} color={Colors.light.text} />, color: Colors.light.ternary },
  'Barbell': { icon: <FontAwesome5 name="weight-hanging" size={14} color={Colors.light.text} />, color: Colors.light.quaternary },
  'Resistance Band': { icon: <Ionicons name="ios-fitness" size={14} color={Colors.light.text} />, color: Colors.light.textSecondary },
  // Add more equipment and icons as needed
};

const calculateDuration = () => {
  return Math.floor(Math.random() * 60);
};

const WorkoutListItem = ({ item }: { item: WorkoutDataModel }) => {
  const uniqueEquipment = new Set(item.exercises.flatMap(exercise => exercise.equipment.map(eq => eq.name)));
  const duration = calculateDuration();
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('workout', { workoutID: item.id });

      }}
      style={({ pressed }) =>
        pressed
          ? [styles.listItemContainer, styles.listItemContainerPressed]
          : styles.listItemContainer
      }
    >
      {/* <Link
        href={{
          pathname: "/workout",
          params: { workoutID: item.id },
        }}
        asChild
      > */}

      <View style={styles.containerView}>

        <Image source={{ uri: item.imageUrl }} style={styles.workoutImage} />
        <View style={styles.workoutInfo}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.exercises[0].description}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detail}>
              <Ionicons name="time-outline" size={14} color={Colors.light.text} />
              <Text style={styles.detailText}>{duration} mins</Text>
            </View>
            <View style={styles.detail}>
              <MaterialIcons name="fitness-center" size={14} color={Colors.light.text} />
              <Text style={styles.detailText}>{item.exercises.length} exercises</Text>
            </View>
          </View>
          <View style={styles.equipmentContainer}>
            {Array.from(uniqueEquipment).map((equipment, index) => {
              const { icon, color } = equipmentIconMapping[equipment] || { icon: <MaterialIcons name="fitness-center" size={14} color={Colors.light.text} />, color: Colors.light.secondary };
              return (
                <View key={index} style={[styles.equipmentBadge, { backgroundColor: color }]}>
                  {icon}
                  <Text style={styles.equipmentText}>{equipment}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* </Link> */}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 5,
    borderWidth: 1,
    backgroundColor: Colors.light.card,
    borderColor: Colors.light.ternary,
    padding: 10,
    minHeight: 200

  },
  listItemContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: Colors.light.card,
    // borderRadius: 12,
    // marginBottom: 16,
    // padding: 16,
    // shadowColor: Colors.light.darkColorLight,
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  listItemContainerPressed: {
    opacity: 0.75,
  },
  workoutImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
  },
  workoutInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  description: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginVertical: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    marginLeft: 4,
    color: Colors.light.text,
    fontSize: 12,
  },
  equipmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  equipmentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    padding: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  equipmentText: {
    marginLeft: 4,
    color: Colors.light.text,
    fontSize: 12,
  },
});

export default WorkoutListItem;
