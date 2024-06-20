import { StyleSheet, View } from 'react-native';
import React from 'react';


export enum SeparatorType {
    Horizontal,
    Vertical
}

export default function Separator({ type = SeparatorType.Horizontal }: { type?: SeparatorType }) {
    return (
        <View style={(type === SeparatorType.Horizontal) ? styles.separatorHorizontal : styles.separatorVertical} />
    )
}

const styles = StyleSheet.create({
    separatorHorizontal: {
        backgroundColor: "#eee",
        marginVertical: 30,
        height: 1,
        width: '100%',
    },
    separatorVertical: {
        marginHorizontal: 30,
        backgroundColor: "#eee",
        height: '100%',
        width: 1,
    }
})