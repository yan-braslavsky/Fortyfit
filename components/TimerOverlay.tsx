// src/components/TimerOverlay.tsx

import React, { forwardRef, useImperativeHandle } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, ColorsTheme } from '@/constants/Colors';
import { useTimerOverlayViewModel, TimerOverlayViewModelProps } from '@/viewmodels/TimerOverlayViewModel';

interface TimerOverlayProps extends TimerOverlayViewModelProps {
    onDismiss?: () => void;
    theme?: ColorsTheme;
}

export interface TimerOverlayRef {
    show: () => void;
    hide: () => void;
    increaseTime: (amount: number) => void;
    decreaseTime: (amount: number) => void;
    reset: () => void;
}

const TimerOverlay = forwardRef<TimerOverlayRef, TimerOverlayProps>(({
    initialTime,
    onTimerEnd,
    onTimeChange,
    onDismiss,
    theme = ColorsTheme.Light,
}, ref) => {
    const {
        timeLeft,
        isActive,
        show,
        hide,
        increaseTime,
        decreaseTime,
        reset,
    } = useTimerOverlayViewModel({ initialTime, onTimerEnd, onTimeChange });

    const colors = Colors.getColorsByTheme(theme);

    useImperativeHandle(ref, () => ({
        show,
        hide,
        increaseTime,
        decreaseTime,
        reset,
    }));

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const styles = StyleSheet.create({
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        container: {
            backgroundColor: colors.card,
            padding: 40,
            borderRadius: 20,
            alignItems: 'center',
        },
        timerText: {
            fontSize: 72,
            color: colors.text,
        },
        buttonContainer: {
            flexDirection: 'row',
            marginTop: 30,
        },
        button: {
            marginHorizontal: 15,
            padding: 20,
            borderRadius: 10,
        },
        buttonText: {
            fontSize: 24,
            color: colors.text,
        },
    });

    if (!isActive) return null;

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.primary }]}
                        onPress={() => decreaseTime(15)}
                    >
                        <Text style={styles.buttonText}>-15s</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.secondary }]}
                        onPress={onDismiss}
                    >
                        <Text style={styles.buttonText}>Dismiss</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: colors.primary }]}
                        onPress={() => increaseTime(15)}
                    >
                        <Text style={styles.buttonText}>+15s</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
});

export default TimerOverlay;