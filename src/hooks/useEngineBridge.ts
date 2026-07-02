'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { getEngineBridge, type BridgeMessage, type EngineBridgeConfig, type ScreenName } from '@/lib/engine-bridge'

interface UseEngineBridgeOptions extends EngineBridgeConfig {
  /** Connect automatically on mount, default: true */
  autoConnect?: boolean;
}

/**
 * React hook for UE5 Engine Bridge communication.
 * 
 * Usage:
 * ```tsx
 * const { isConnected, send, sendScreenChanged, sendChampionSelected } = useEngineBridge({
 *   onNavigate: (screen) => setScreen(screen),
 *   onSelectChampion: (id) => selectChampion(id),
 * });
 * ```
 */
export function useEngineBridge(options?: UseEngineBridgeOptions & {
  onNavigate?: (screen: ScreenName) => void;
  onSelectChampion?: (championId: string) => void;
  onPlayVideo?: (championId: string) => void;
  onWakeUp?: () => void;
  onGoIdle?: () => void;
  onMessage?: (message: BridgeMessage) => void;
}) {
  const { autoConnect = true, onNavigate, onSelectChampion, onPlayVideo, onWakeUp, onGoIdle, onMessage, ...config } = options || {};
  const [isConnected, setIsConnected] = useState(false);
  const bridgeRef = useRef(getEngineBridge(config));
  const callbacksRef = useRef({ onNavigate, onSelectChampion, onPlayVideo, onWakeUp, onGoIdle, onMessage });

  // Keep callbacks ref updated
  callbacksRef.current = { onNavigate, onSelectChampion, onPlayVideo, onWakeUp, onGoIdle, onMessage };

  useEffect(() => {
    const bridge = bridgeRef.current;

    const unsubs: (() => void)[] = [];

    unsubs.push(bridge.on('_connected', () => setIsConnected(true)));
    unsubs.push(bridge.on('_disconnected', () => setIsConnected(false)));

    // UE5 → Web commands
    unsubs.push(bridge.on('navigate', (msg) => {
      callbacksRef.current.onNavigate?.(msg.payload.screen as ScreenName);
    }));

    unsubs.push(bridge.on('select_champion', (msg) => {
      callbacksRef.current.onSelectChampion?.(msg.payload.id as string);
    }));

    unsubs.push(bridge.on('play_video', (msg) => {
      callbacksRef.current.onPlayVideo?.(msg.payload.id as string);
    }));

    unsubs.push(bridge.on('wake_up', () => {
      callbacksRef.current.onWakeUp?.();
    }));

    unsubs.push(bridge.on('go_idle', () => {
      callbacksRef.current.onGoIdle?.();
    }));

    // Generic message handler
    unsubs.push(bridge.onAny((msg) => {
      if (!msg.type.startsWith('_')) {
        callbacksRef.current.onMessage?.(msg);
      }
    }));

    if (autoConnect) {
      bridge.connect();
    }

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, [autoConnect]);

  const send = useCallback((message: BridgeMessage) => {
    bridgeRef.current.send(message);
  }, []);

  const sendScreenChanged = useCallback((screen: ScreenName) => {
    bridgeRef.current.sendScreenChanged(screen);
  }, []);

  const sendChampionSelected = useCallback((id: string, name: string, group: number) => {
    bridgeRef.current.sendChampionSelected(id, name, group);
  }, []);

  const sendVideoStarted = useCallback((championId: string) => {
    bridgeRef.current.sendVideoStarted(championId);
  }, []);

  const sendVideoEnded = useCallback((championId: string) => {
    bridgeRef.current.sendVideoEnded(championId);
  }, []);

  return {
    isConnected,
    send,
    sendScreenChanged,
    sendChampionSelected,
    sendVideoStarted,
    sendVideoEnded,
  };
}
