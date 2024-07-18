import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Colors from '@/constants/Colors';
import ExerciseHeaderModel from '@/models/ExerciseHeaderModel';
import { useTheme } from '@/contexts/ThemeContext';

interface ExerciseHeaderCompoundProps {
    exerciseHeaderModels: ExerciseHeaderModel[];
}

const ExerciseHeaderCompound: React.FC<ExerciseHeaderCompoundProps> = ({ exerciseHeaderModels }) => {
    const { theme } = useTheme();
    const colors = Colors[theme];
    return (
        <View style={{
            borderWidth: 1,
            borderColor: colors.text,
            borderRadius: 10,
            padding: 5
        }}>
            {exerciseHeaderModels.map((exerciseHeaderModel, index) => (
                <ExerciseHeader
                    key={index}
                    imageUrl={exerciseHeaderModel.imageUrl}
                    title={exerciseHeaderModel.title}
                    subtitle={exerciseHeaderModel.subtitle}
                    equipmentImagesUrls={exerciseHeaderModel.equipmentImagesUrls}
                    colors={colors}
                />
            ))}
        </View>
    )
};

interface ExerciseHeaderProps extends ExerciseHeaderModel {
    colors: any;
}

const ExerciseHeader: React.FC<ExerciseHeaderProps> = ({ imageUrl, title, subtitle, equipmentImagesUrls, colors }) => {
    const styles = getStyles(colors);
    return (
        <View style={styles.container}>
            <View style={styles.exerciseTitleContainer}>
                <Text style={styles.exerciseTitle}>{title}</Text>
                <Text style={styles.exerciseSubtitle} ellipsizeMode='tail' numberOfLines={1}>{subtitle}</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
            <View style={styles.equipmentImagesContainer}>
                {!equipmentImagesUrls && <Text style={styles.noEquipmentText}>No Equipment</Text>}
                {equipmentImagesUrls && equipmentImagesUrls.map((url, index) => (
                    <Image key={index} source={{ uri: url }} style={styles.equipmentImage} />
                ))}
            </View>
        </View>
    );
};

export default ExerciseHeaderCompound;

const getStyles = (colors: any) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-evenly',
        padding: 5,
    },
    imageContainer: {
        width: 100,
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        backgroundColor: colors.background,
    },
    exerciseTitleContainer: {
        flexDirection: 'column',
        width: 150,
    },
    exerciseTitle: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    noEquipmentText: {
        color: colors.text,
        fontSize: 16,
        textAlign: 'left',
    },
    exerciseSubtitle: {
        marginTop: 10,
        color: colors.text,
        fontSize: 12,
        textAlign: 'left',
    },
    equipmentImagesContainer: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        width: 100,
    },
    equipmentImage: {
        width: 30,
        height: 30,
        marginRight: 5,
    },
});
