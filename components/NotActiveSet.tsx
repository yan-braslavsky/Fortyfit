import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Separator, { SeparatorType } from '@/components/Separator'
import Colors from '@/constants/Colors'

export default function NotActiveSet({ pressHandler }: { pressHandler?: () => void }) {

    function localPressHandler(): void {
        if (pressHandler) {
            pressHandler();
        }
    }

    return (
        <Pressable
            style={(state) =>
                state.pressed
                    ? { opacity: 0.5 }
                    : { opacity: 1 }
            }
            onPress={localPressHandler}>
            <View style={styles.container}>
                <Text style={styles.suggestedSetText}>Suggested</Text>
                <Text style={styles.setWeight}>15 reps</Text>
                <Separator type={SeparatorType.Vertical} />
                <Text style={styles.setReps}>10-12 reps</Text>
                <Text style={styles.setSmallText}>(Last 12)</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.light.backgroundColorHard,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    suggestedSetText: {
        color: '#fff',
        fontSize: 14,
    },
    setWeight: {
        color: '#fff',
        fontSize: 22,
    },
    setReps: {
        color: '#fff',
        fontSize: 14,
    },
    setSmallText: {
        color: '#a1a1a1',
        fontSize: 12,
    },

})