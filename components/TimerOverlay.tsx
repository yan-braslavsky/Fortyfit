import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AppState, AppStateStatus } from 'react-native';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import { Colors, ColorsTheme } from '@/constants/Colors';

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const now = Date.now();
    console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
    return BackgroundFetch.BackgroundFetchResult.NewData;
});

type TimerOverlayProps = {
    isActiveOnStart?: boolean;
    initialTime?: number;
    backgroundNotifications?: boolean;
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
    isActiveOnStart: initialVisible = true,
    initialTime = 60,
    backgroundNotifications = false,
    onTimerEnd,
    onTimeChange,
    onDismiss,
    theme = ColorsTheme.Light,
}, ref) => {
    const [timeLeft, setTimeLeft] = useState<number>(initialTime);
    const [isActive, setIsActive] = useState<boolean>(initialVisible);
    const appState = useRef<AppStateStatus>(AppState.currentState);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const colors = Colors.getColorsByTheme(theme);

    useEffect(() => {
        if (backgroundNotifications) {
            setupNotifications();
            registerBackgroundFetch();
        }
        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
            if (timerRef.current) clearInterval(timerRef.current);
            Notifications.dismissAllNotificationsAsync();
        };
    }, [backgroundNotifications]);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prevTime => {
                    const newTime = prevTime - 1;
                    onTimeChange?.(newTime);
                    if (backgroundNotifications) updateNotification(newTime);
                    if (newTime === 0) {
                        onTimerEnd?.();
                    }
                    return newTime;
                });
            }, 1000);
        } else if (timeLeft === 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            onDismiss?.();
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft, onTimerEnd, onDismiss, onTimeChange, backgroundNotifications]);

    useImperativeHandle(ref, () => ({
        show: () => setIsActive(true),
        hide: () => setIsActive(false),
        increaseTime: (amount: number) => setTimeLeft(time => time + amount),
        decreaseTime: (amount: number) => setTimeLeft(time => Math.max(0, time - amount)),
        reset: () => setTimeLeft(initialTime),
    }), [initialTime]);

    const setupNotifications = useCallback(async () => {
        await Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });

        Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
    }, []);

    const registerBackgroundFetch = useCallback(async () => {
        try {
            await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
                minimumInterval: 15 * 60,
                stopOnTerminate: false,
                startOnBoot: true,
            });
            console.log("Background fetch registered");
        } catch (err) {
            console.log("Background fetch failed to register", err);
        }
    }, []);

    const updateNotification = useCallback(async (time: number) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Workout Timer',
                body: `Time left: ${formatTime(time)}`,
                data: { timeLeft: time },
            },
            trigger: null,
        });
    }, []);

    const handleAppStateChange = useCallback((nextAppState: AppStateStatus) => {
        if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
            Notifications.dismissAllNotificationsAsync();
        }
        appState.current = nextAppState;
    }, []);

    const handleNotificationResponse = useCallback((response: Notifications.NotificationResponse) => {
        const { actionIdentifier } = response;
        if (actionIdentifier === 'increase') increaseTime(15);
        else if (actionIdentifier === 'decrease') decreaseTime(15);
        else if (actionIdentifier === 'dismiss') onDismiss?.();
    }, [onDismiss]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const increaseTime = useCallback((amount: number) => setTimeLeft(time => time + amount), []);
    const decreaseTime = useCallback((amount: number) => setTimeLeft(time => Math.max(0, time - amount)), []);

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
            alignContent: 'center',
        },
        container: {
            backgroundColor: colors.card,
            padding: 40,
            borderRadius: 20,
            alignItems: 'center',
            width: '90%',
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
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        },
        largeButton: {
            backgroundColor: colors.primary,
        },
        smallButton: {
            backgroundColor: colors.secondary,
            padding: 15,
        },
        buttonText: {
            fontSize: 24,
            color: colors.text,
            textAlign: 'center',
        },
    });

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.largeButton]} onPress={() => decreaseTime(15)}>
                        <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.smallButton]} onPress={onDismiss}>
                        <Text style={styles.buttonText}>Dismiss</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.largeButton]} onPress={() => increaseTime(15)}>
                        <Text style={styles.buttonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
});

export default TimerOverlay;
