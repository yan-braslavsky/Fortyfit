// src/components/DoneBtn.tsx

import { StyleSheet, Text, ViewStyle } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import Colors from '@/constants/Colors'

interface DoneBtnProps {
    pressHandler?: () => void;
    style?: ViewStyle;
}

export default function DoneBtn({ pressHandler, style }: DoneBtnProps) {
    function localPressHandler(): void {
        if (pressHandler) {
            pressHandler();
        }
    }

    return (
        <Pressable 
            onPress={localPressHandler}
            style={(state) => [
                styles.button,
                state.pressed ? styles.buttonPressed : null,
                style
            ]}
        >
            <Text style={styles.buttonText}>DONE</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.light.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    buttonText: {
        color: Colors.dark.quaternary,
        fontSize: 18,
        fontWeight: 'bold',
    },
});