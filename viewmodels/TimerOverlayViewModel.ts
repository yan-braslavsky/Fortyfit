// src/viewmodels/TimerOverlayViewModel.ts

import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { AppState, AppStateStatus } from 'react-native';

const TIMER_STORAGE_KEY = '@timer_end_time';

export interface TimerOverlayViewModelProps {
    initialTime: number;
    onTimerEnd: () => void;
    onTimeChange?: (timeLeft: number) => void;
}

export function useTimerOverlayViewModel({
    initialTime,
    onTimerEnd,
    onTimeChange,
}: TimerOverlayViewModelProps) {
    const [timeLeft, setTimeLeft] = useState<number>(initialTime);
    const [isActive, setIsActive] = useState<boolean>(false);
    const appState = useRef<AppStateStatus>(AppState.currentState);

    useEffect(() => {
        setupNotifications();
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        
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
        setIsActive(true);
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
        onTimerEnd();
    };

    const show = () => {
        setIsActive(true);
        startTimer();
    };

    const hide = async () => {
        setIsActive(false);
        await clearTimer();
    };

    const increaseTime = async (amount: number) => {
        const newTime = timeLeft + amount;
        setTimeLeft(newTime);
        const endTimeStr = await AsyncStorage.getItem(TIMER_STORAGE_KEY);
        if (endTimeStr) {
            const endTime = parseInt(endTimeStr) + amount * 1000;
            await AsyncStorage.setItem(TIMER_STORAGE_KEY, endTime.toString());
            scheduleBackgroundTimer();
        }
    };

    const decreaseTime = async (amount: number) => {
        const newTime = Math.max(0, timeLeft - amount);
        setTimeLeft(newTime);
        const endTimeStr = await AsyncStorage.getItem(TIMER_STORAGE_KEY);
        if (endTimeStr) {
            const endTime = Math.max(Date.now(), parseInt(endTimeStr) - amount * 1000);
            await AsyncStorage.setItem(TIMER_STORAGE_KEY, endTime.toString());
            scheduleBackgroundTimer();
        }
    };

    const reset = () => {
        setTimeLeft(initialTime);
        startTimer();
    };

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

    return {
        timeLeft,
        isActive,
        show,
        hide,
        increaseTime,
        decreaseTime,
        reset,
    };
}