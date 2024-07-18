import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { ColorsTheme } from '@/constants/Colors';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 15 }}>
      <Ionicons 
        name={theme === ColorsTheme.Light ? 'moon' : 'sunny'} 
        size={24} 
        color={theme === ColorsTheme.Light ? '#000' : '#FFF'}
      />
    </TouchableOpacity>
  );
};

export default ThemeToggleButton;