import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tabBarIcon,
        headerShown: true,
      }}>

      {/* //TODO remove this screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Test',
          tabBarIcon: ({ color }) => <TabBarIcon name="qq" color={color} />,
        }}
      />
      <Tabs.Screen
        name="workoutList"
        options={{
          title: 'Workout Selection',
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="createProgram"
        options={{
          title: 'program',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus-square-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }
        }
      />
    </Tabs>
  );
}
