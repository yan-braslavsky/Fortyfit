// src/app/profile.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import Colors from '@/constants/Colors';

const OptionItem = ({ icon, title, onPress }: { icon: string; title: string; onPress: () => void }) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <TouchableOpacity style={[styles.option, { backgroundColor: colors.card }]} onPress={onPress}>
      <Ionicons name={icon} size={24} color={colors.primary} style={styles.optionIcon} />
      <Text style={[styles.optionText, { color: colors.text }]}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color={colors.text} />
    </TouchableOpacity>
  );
};

const ProfileScreen = () => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const profileOptions = [
    { icon: 'person-outline', title: 'Personal Information' },
    { icon: 'settings-outline', title: 'Settings' },
    { icon: 'bar-chart-outline', title: 'Activity History' },
    { icon: 'log-out-outline', title: 'Log Out' },
  ];

  const handleImagePress = () => {
    Alert.alert(
      "Profile Picture",
      "This is where you'd normally upload a profile picture. For now, it's just a placeholder!",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleImagePress}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={[styles.avatarText, { color: colors.card }]}>JD</Text>
          </View>
        </TouchableOpacity>
        <Text style={[styles.name, { color: colors.text }]}>John Doe</Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>johndoe@example.com</Text>
      </View>
      <View style={styles.optionsContainer}>
        {profileOptions.map((option, index) => (
          <OptionItem
            key={index}
            icon={option.icon}
            title={option.title}
            onPress={() => console.log(`${option.title} pressed`)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
});

export default ProfileScreen;