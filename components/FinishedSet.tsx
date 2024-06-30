import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Separator, { SeparatorType } from '@/components/Separator'
import { Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

const FinishedSet = ({ pressHandler, repsCompleted }: { pressHandler?: () => void, repsCompleted: number }) => {
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
                <Text style={styles.statusText}>Completed</Text>
                <Separator type={SeparatorType.Vertical} />
                <Text style={styles.repsText}>{repsCompleted} reps</Text>
                <Separator type={SeparatorType.Vertical} />
                <Text style={styles.redoText}>REDO</Text>
                <FontAwesome name="rotate-right" size={16} color={Colors.light.text} style={{
                    margin: 5
                }} />
            </View>
        </Pressable>
    )
}

export default FinishedSet

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.light.ternary,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        opacity: 0.7
    },
    statusText: {
        color: Colors.light.text,
        fontSize: 16,
        textAlign: 'left',
    },
    repsText: {
        color: Colors.light.text,
        fontSize: 16,
        textAlign: 'left',
    },
    redoText: {
        color: Colors.light.text,
        fontSize: 16,
        textAlign: 'left',
    },
})