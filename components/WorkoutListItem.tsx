// src/components/WorkoutListItem.tsx

import React from 'react';
import { StyleSheet, Pressable, Image, Text, View } from 'react-native';
import { WorkoutDataModel } from '@/constants/DataModels';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';
import { useWorkoutListItemViewModel } from '@/viewmodels/WorkoutListItemViewModel';

interface WorkoutListItemProps {
  item: WorkoutDataModel;
  onPress: () => void;
}

const WorkoutListItem: React.FC<WorkoutListItemProps> = ({ item, onPress }) => {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { duration, totalExercises, uniqueEquipment, muscleGroups, exerciseImages } = useWorkoutListItemViewModel(item);

  if (!item || !item.exerciseGroups || item.exerciseGroups.length === 0) {
    console.log('Invalid item data:', item);
    return null;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.listItemContainer,
        { backgroundColor: colors.card },
        pressed && styles.listItemContainerPressed
      ]}
    >
      <View style={styles.imageCollage}>
        <Image source={{ uri: item.imageUrl }} style={styles.collageImage} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{item.name || 'Unnamed Workout'}</Text>
        
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={16} color={colors.text} />
            <Text style={[styles.infoText, { color: colors.text }]}>{duration} mins</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="dumbbell" size={16} color={colors.text} />
            <Text style={[styles.infoText, { color: colors.text }]}>{totalExercises} exercises</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="layers-outline" size={16} color={colors.text} />
            <Text style={[styles.infoText, { color: colors.text }]}>{item.exerciseGroups.length} groups</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Equipment:</Text>
        <View style={styles.badgeContainer}>
          {uniqueEquipment.map((equipmentName, index) => (
            <View key={index} style={[styles.badge, { backgroundColor: colors.primary }]}>
              <Text style={[styles.badgeText, { color: colors.card }]}>{equipmentName || 'Unnamed Equipment'}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Muscle Groups:</Text>
        <View style={styles.badgeContainer}>
          {muscleGroups.map((group, index) => (
            <View key={index} style={[styles.badge, { backgroundColor: colors.secondary }]}>
              <Text style={[styles.badgeText, { color: colors.card }]}>{group}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listItemContainerPressed: {
    opacity: 0.9,
  },
  imageCollage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 200,
  },
  collageImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 5,
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default WorkoutListItem;