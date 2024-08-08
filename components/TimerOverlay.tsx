// src/components/TimerOverlay.tsx

import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AppState, AppStateStatus } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Colors, ColorsTheme } from '@/constants/Colors';

const TIMER_STORAGE_KEY = '@timer_end_time';

type TimerOverlayProps = {
    isActiveOnStart?: boolean;
    initialTime?: number;
    onTimerEnd?: () => void;
    onTimeChange?: (timeLeft: number) => void;
    onDismiss?: () => void;
    theme?: ColorsTheme;
};

export interface TimerOverlayRef {
    show: () => void;
    hide: () => void;
    increaseTime: (amount: number) => void;
    decreaseTime: (amount: number) => void;
    reset: () => void;
}

const TimerOverlay = forwardRef<TimerOverlayRef, TimerOverlayProps>(({
    isActiveOnStart = true,
    initialTime = 60,
    onTimerEnd,
    onTimeChange,
    onDismiss,
    theme = ColorsTheme.Light,
}, ref) => {
    const [timeLeft, setTimeLeft] = useState<number>(initialTime);
    const [isActive, setIsActive] = useState<boolean>(isActiveOnStart);
    const appState = useRef<AppStateStatus>(AppState.currentState);
    const colors = Colors.getColorsByTheme(theme);

    useEffect(() => {
        setupNotifications();
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        
        if (isActive) {
            startTimer();
        }

        return () => {
            subscription.remove();
            clearTimer();
        };
    }, []);

    const setupNotifications = async () => {
        await Notifications.requestPermissionsAsync();
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });
    };

    const startTimer = async () => {
        const now = Date.now();
        const endTime = now + timeLeft * 1000;
        await AsyncStorage.setItem(TIMER_STORAGE_KEY, endTime.toString());
        scheduleBackgroundTimer();
    };

    const scheduleBackgroundTimer = async () => {
        await Notifications.cancelAllScheduledNotificationsAsync();
        const endTimeStr = await AsyncStorage.getItem(TIMER_STORAGE_KEY);
        if (endTimeStr) {
            const endTime = parseInt(endTimeStr);
            const timeLeftMs = endTime - Date.now();
            if (timeLeftMs > 0) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Timer Ended",
                        body: "Your timer has finished!",
                    },
                    trigger: { seconds: timeLeftMs / 1000 },
                });
            }
        }
    };

    const clearTimer = async () => {
        await AsyncStorage.removeItem(TIMER_STORAGE_KEY);
        await Notifications.cancelAllScheduledNotificationsAsync();
    };

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
            // App has come to the foreground
            const endTimeStr = await AsyncStorage.getItem(TIMER_STORAGE_KEY);
            if (endTimeStr) {
                const endTime = parseInt(endTimeStr);
                const now = Date.now();
                const remaining = Math.max(0, Math.round((endTime - now) / 1000));
                setTimeLeft(remaining);
                setIsActive(true);
                if (remaining <= 0) {
                    handleTimerEnd();
                }
            }
        }
        appState.current = nextAppState;
    };

    const handleTimerEnd = async () => {
        setIsActive(false);
        setTimeLeft(0);
        await clearTimer();
        onTimerEnd?.();
    };

    useImperativeHandle(ref, () => ({
        show: () => {
            setIsActive(true);
            startTimer();
        },
        hide: async () => {
            setIsActive(false);
            await clearTimer();
        },
        increaseTime: async (amount: number) => {
            const newTime = timeLeft + amount;
            setTimeLeft(newTime);
            const endTimeStr = await AsyncStorage.getItem(TIMER_STORAGE_KEY);
            if (endTimeStr) {
                const endTime = parseInt(endTimeStr) + amount * 1000;
                await AsyncStorage.setItem(TIMER_STORAGE_KEY, endTime.toString());
                scheduleBackgroundTimer();
            }
        },
        decreaseTime: async (amount: number) => {
            const newTime = Math.max(0, timeLeft - amount);
            setTimeLeft(newTime);
            const endTimeStr = await AsyncStorage.getItem(TIMER_STORAGE_KEY);
            if (endTimeStr) {
                const endTime = Math.max(Date.now(), parseInt(endTimeStr) - amount * 1000);
                await AsyncStorage.setItem(TIMER_STORAGE_KEY, endTime.toString());
                scheduleBackgroundTimer();
            }
        },
        reset: () => {
            setTimeLeft(initialTime);
            startTimer();
        },
    }), [timeLeft, initialTime]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(async () => {
                const endTimeStr = await AsyncStorage.getItem(TIMER_STORAGE_KEY);
                if (endTimeStr) {
                    const endTime = parseInt(endTimeStr);
                    const now = Date.now();
                    const remaining = Math.max(0, Math.round((endTime - now) / 1000));
                    setTimeLeft(remaining);
                    onTimeChange?.(remaining);
                    if (remaining <= 0) {
                        handleTimerEnd();
                    }
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

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
                        onPress={() => ref.current?.decreaseTime(15)}
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
                        onPress={() => ref.current?.increaseTime(15)}
                    >
                        <Text style={styles.buttonText}>+15s</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
});

export default TimerOverlay;