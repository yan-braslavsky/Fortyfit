import React from 'react';
import { StyleSheet, Pressable, Image, Text, View } from 'react-native';
import { WorkoutDataModel } from '@/constants/DataModels';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

interface WorkoutListItemProps {
  item: WorkoutDataModel;
  onPress: () => void;
}

const WorkoutListItem: React.FC<WorkoutListItemProps> = ({ item, onPress }) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const equipmentIconMapping = {
    'Rings': { icon: <FontAwesome5 name="ring" size={14} color={colors.text} />, color: colors.primary },
    'Gymnastic Ball': { icon: <FontAwesome5 name="volleyball-ball" size={14} color={colors.text} />, color: colors.secondary },
    'Dumbbell': { icon: <FontAwesome name="dumbbell" size={14} color={colors.text} />, color: colors.ternary },
    'Barbell': { icon: <FontAwesome5 name="weight-hanging" size={14} color={colors.text} />, color: colors.quaternary },
    'Resistance Band': { icon: <Ionicons name="ios-fitness" size={14} color={colors.text} />, color: colors.textSecondary },
  };

  const uniqueEquipment = new Set(item.exercises.flatMap(exercise => exercise[0].equipment.map(eq => eq.name)));
  const duration = Math.floor(Math.random() * 60);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.listItemContainer,
        { backgroundColor: colors.card },
        pressed && styles.listItemContainerPressed
      ]}
    >
      <View style={styles.containerView}>
        <Image source={{ uri: item.imageUrl }} style={styles.workoutImage} />
        <View style={styles.workoutInfo}>
          <Text style={[styles.title, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>{item.exercises[0][0].description}</Text>
          <View style={styles.detailsContainer}>
            <View style={styles.detail}>
              <Ionicons name="time-outline" size={14} color={colors.text} />
              <Text style={[styles.detailText, { color: colors.text }]}>{duration} mins</Text>
            </View>
            <View style={styles.detail}>
              <MaterialIcons name="fitness-center" size={14} color={colors.text} />
              <Text style={[styles.detailText, { color: colors.text }]}>{item.exercises.length} exercises</Text>
            </View>
          </View>
          <View style={styles.equipmentContainer}>
            {Array.from(uniqueEquipment).map((equipment, index) => {
              const { icon, color } = equipmentIconMapping[equipment] || { icon: <MaterialIcons name="fitness-center" size={14} color={colors.text} />, color: colors.secondary };
              return (
                <View key={index} style={[styles.equipmentBadge, { backgroundColor: color }]}>
                  {icon}
                  <Text style={[styles.equipmentText, { color: colors.text }]}>{equipment}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 5,
    borderWidth: 1,
    padding: 10,
    minHeight: 200
  },
  listItemContainerPressed: {
    opacity: 0.75,
  },
  containerView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  description: {
    fontSize: 14,
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
    fontSize: 12,
  },
});

export default WorkoutListItem;