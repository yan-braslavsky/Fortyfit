// src/components/NotActiveCompoundSet.tsx

import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle, Image } from 'react-native';
import Colors from '@/constants/Colors';
import Separator from '@/components/Separator';

interface NotActiveCompoundSetProps {
    id: string,
    numberOfExercises: number;
    pressHandler?: (id: string) => void;
    suggestedRepsRange: { min: number, max: number };
    equipmentImagesUrls?: string[];
    style?: ViewStyle
}

const NotActiveCompoundSet: React.FC<NotActiveCompoundSetProps> = ({
    id,
    numberOfExercises,
    pressHandler,
    suggestedRepsRange,
    equipmentImagesUrls,
    style
}) => {
    const handlePress = (): void => {
        pressHandler?.(id);
    };

    const exercisesText = `${numberOfExercises} Exercise${numberOfExercises > 1 ? 's' : ''}`;
    const repsText = `${suggestedRepsRange.min}-${suggestedRepsRange.max} Reps`;

    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                { opacity: pressed ? 0.8 : 1 },
                style
            ]}
            onPress={handlePress}
        >
            <View style={styles.section}>
                <Text style={styles.text}>{exercisesText}</Text>
            </View>
            <Separator vertical style={styles.separator} />
            <View style={styles.section}>
                <Text style={styles.text}>{repsText}</Text>
            </View>
            <Separator vertical style={styles.separator} />
            <View style={[styles.section, styles.equipmentSection]}>
                {equipmentImagesUrls && equipmentImagesUrls.length > 0 ? (
                    equipmentImagesUrls.map((url, index) => (
                        <Image key={index} source={{ uri: url }} style={styles.equipmentImage} />
                    ))
                ) : (
                    <Text style={styles.text}>No Equipment</Text>
                )}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.light.primary,
        padding: 15,
        borderRadius: 10,
        height: 60,
    },
    section: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    equipmentSection: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    text: {
        color: Colors.dark.quaternary,
        fontSize: 16,
        textAlign: 'center',
    },
    equipmentImage: {
        width: 24,
        height: 24,
        marginLeft: 5,
    },
    separator: {
        height: '70%',
        marginHorizontal: 10,
    },
});

export default NotActiveCompoundSet;