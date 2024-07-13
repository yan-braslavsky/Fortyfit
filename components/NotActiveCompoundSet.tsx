import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View, ViewStyle, PressableStateCallbackType } from 'react-native';
import Separator, { SeparatorType } from '@/components/Separator';
import Colors from '@/constants/Colors';
import { Image } from 'react-native';

interface NotActiveCompoundSetProps {
    numberOfExercises?: number;
    pressHandler?: () => void;
    suggestedRepsRange?: { min: number, max: number };
    equipmentImagesUrls?: string[];
    style?: ViewStyle
}

const NotActiveCompoundSet: React.FC<NotActiveCompoundSetProps> = ({ numberOfExercises = 1, pressHandler, suggestedRepsRange, equipmentImagesUrls, style }) => {
    const handlePress = (): void => {
        pressHandler?.();
    };

    const getPressableStyle = (state: PressableStateCallbackType): ViewStyle => (
        {
            opacity: state.pressed ? 0.5 : 1,
        });

    const exercisesText = numberOfExercises === 1 ? 'Exercise' : 'Exercises';
    const rangeText = suggestedRepsRange ? `${suggestedRepsRange.min}-${suggestedRepsRange.max}` : 'Max';

    const equipmentSection = equipmentImagesUrls?.map((url, index) => (
        <Image key={index} source={{ uri: url }} style={styles.equipmentImage} />
    ));

    return (
        <Pressable  style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1 }
            ,style
        ]} onPress={handlePress}>
            <View style={[styles.container]}>
                <Text style={styles.genericText}>{numberOfExercises + " " + exercisesText} </Text>
                <Separator type={SeparatorType.Vertical} style={{ marginHorizontal: 0 }} />
                <Text style={styles.genericText}>{rangeText} Reps</Text>
                <Separator type={SeparatorType.Vertical} style={{ marginHorizontal: 0 }} />
                {!equipmentImagesUrls && <Text style={styles.genericText}>No Equipment</Text>}
                {equipmentImagesUrls && equipmentSection}
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
        padding: 20,
        minHeight: 60,
        borderRadius: 10,
    },
    equipmentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    genericText: {
        color: Colors.dark.quaternary,
        fontSize: 16,
        textAlign: 'left',
    },
    equipmentImage: {
        width: 24, // Adjust the width as needed
        height: 24, // Adjust the height as needed
    },
});

export default NotActiveCompoundSet;