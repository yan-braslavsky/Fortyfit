import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Separator, { SeparatorType } from '@/components/Separator'
import Colors from '@/constants/Colors'

export default function NotActiveCompoundSet({ pressHandler, suggestedReps = 0 }: { pressHandler?: () => void, suggestedReps?: number }) {

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
                <Separator type={SeparatorType.Vertical} />
                <Text style={styles.setWeight}>{suggestedReps} reps</Text>
                <Separator type={SeparatorType.Vertical} />
                <Text style={styles.setReps}>10-12 reps</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.light.primary,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    suggestedSetText: {
        color: Colors.dark.quaternary,
        fontSize: 16,
        textAlign: 'left',
    },
    setWeight: {
        color: Colors.dark.quaternary,
        fontSize: 16,
        textAlign: 'left',
    },
    setReps: {
        color: Colors.dark.quaternary,
        fontSize: 16,
        textAlign: 'left',
    },
    setSmallText: {
        color: Colors.dark.quaternary,
        fontSize: 12,
    },

})