import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Colors from '@/constants/Colors';
import ExerciseHeaderModel from '@/models/ExerciseHeaderModel';


interface ExerciseHeaderCompoundProps {
    exerciseHeaderModels: ExerciseHeaderModel[];
}

const ExerciseHeaderCompound: React.FC<ExerciseHeaderCompoundProps> = ({ exerciseHeaderModels }) => {
    return (


        <View style={{
            borderWidth: 1,
            borderColor: Colors.light.text,
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
                />
            ))}
        </View>
    )
};


const ExerciseHeader: React.FC<ExerciseHeaderModel> = ({ imageUrl, title, subtitle, equipmentImagesUrls }) => {
    return (
        <View style={styles.container}>

            <View style={styles.exerciseTitleContainer}>
                <Text style={styles.exerciseTitle}>{title}</Text>
                <Text style={styles.exerciseSubtitle}>{subtitle}</Text>
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

const styles = StyleSheet.create({
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
        backgroundColor: Colors.light.background,
    },
    exerciseTitleContainer: {
        flexDirection: 'column',
        width: 100,
    },
    exerciseTitle: {
        color: Colors.light.primary,
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    noEquipmentText: {
        color: Colors.light.text,
        fontSize: 16,
        textAlign: 'left',
    },
    exerciseSubtitle: {
        marginTop: 10,
        color: Colors.light.text,
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