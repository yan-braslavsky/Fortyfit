import { StyleSheet, Text, View } from 'react-native'
import Colors from '@/constants/Colors'
import { Image } from 'react-native'
import React from 'react'
import Separator, { SeparatorType } from './Separator'

const ExerciseHeader = ({ imageUrl, title, subtitle }: { imageUrl: string, title: string, subtitle: string }) => {
    return (
        <View style={styles.exerciseInfo}>
            <Image source={{ uri: imageUrl }} style={{ width: 50, height: 50 }} />
            <Separator type={SeparatorType.Vertical}/>
            <View style={styles.exerciseTitleContainer}>
                <Text style={styles.exerciseTitle}>{title}</Text>
                <Text style={styles.exerciseSubtitle}>{subtitle}</Text>
                <View />
            </View>
        </View>
    )
}

export default ExerciseHeader

const styles = StyleSheet.create({
    exerciseInfo: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
        
    },
    exerciseTitleContainer: {
        flexDirection: 'column',
        width: '70%',
    },
    exerciseTitle: {
        color: Colors.light.primary,
        fontSize: 18,
    },
    exerciseSubtitle: {
        color: Colors.light.text,
        fontSize: 12,
        textAlign: 'left',
    },
})