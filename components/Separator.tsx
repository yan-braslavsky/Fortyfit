// src/components/Separator.tsx

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Colors from '@/constants/Colors';

interface SeparatorProps {
  vertical?: boolean;
  style?: ViewStyle;
}

const Separator: React.FC<SeparatorProps> = ({ vertical = false, style }) => {
  return (
    <View
      style={[
        vertical ? styles.vertical : styles.horizontal,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    width: '100%',
    backgroundColor: Colors.light.darkColorLight,
  },
  vertical: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.light.darkColorLight,
  },
});

export default Separator;