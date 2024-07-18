import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggleButton from '@/components/ThemeToggleButton';

export default function TabsLayout() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text,
        tabBarStyle: {
          backgroundColor: colors.background,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerRight: () => <ThemeToggleButton />,
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Workouts',
          headerTitle: 'Workout Selection',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="dumbbell" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="settings" 
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}