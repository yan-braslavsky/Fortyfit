import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import Colors from '@/constants/Colors'

export default function DoneBtn({ pressHandler }: { pressHandler?: () => void }) {

    function localPressHandler(): void {
        if (pressHandler) {
            pressHandler();
        }
    }

    return (
        <Pressable onPress={localPressHandler}
            style={(state) =>
                state.pressed
                    ? [styles.suggestionItemHighlight, styles.doneBtnPressed]
                    : styles.suggestionItemHighlight
            }
        >
            <Text style={styles.doneBtn}>DONE</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    suggestionItemHighlight: {
        backgroundColor: Colors.light.secondary,
        padding: 20,
        borderRadius: 10,
    },
    doneBtn: {
        color: Colors.dark.quaternary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    doneBtnPressed: {
        opacity: 0.5,
    }
})