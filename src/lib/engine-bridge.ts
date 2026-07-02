/**
 * Engine Bridge — WebSocket communication between web app and UE5
 * 
 * Protocol:
 * - Web → UE5: sends JSON commands about UI state changes
 * - UE5 → Web: sends JSON commands to control the web UI
 * 
 * Message format:
 * { type: string, payload: object }
 * 
 * Outgoing (web → UE5):
 *   { type: "screen_changed", payload: { screen: "menu"|"gallery"|"video"|"idle" } }
 *   { type: "champion_selected", payload: { id: string, name: string, group: number } }
 *   { type: "video_started", payload: { championId: string } }
 *   { type: "video_ended", payload: { championId: string } }
 *   { type: "heartbeat", payload: { timestamp: number } }
 * 
 * Incoming (UE5 → web):
 *   { type: "navigate", payload: { screen: "menu"|"gallery"|"video"|"idle" } }
 *   { type: "select_champion", payload: { id: string } }
 *   { type: "play_video", payload: { id: string } }
 *   { type: "wake_up", payload: {} }
 *   { type: "go_idle", payload: {} }
 */

export type ScreenName = 'idle' | 'menu' | 'gallery' | 'video';

export interface BridgeMessage {
  type: string;
  payload: Record<string, unknown>;
}

export type BridgeEventHandler = (message: BridgeMessage) => void;

export interface EngineBridgeConfig {
  /** WebSocket server URL, default: ws://localhost:9000 */
  url?: string;
  /** Auto-reconnect on disconnect, default: true */
  autoReconnect?: boolean;
  /** Reconnect interval in ms, default: 3000 */
  reconnectInterval?: number;
  /** Heartbeat interval in ms, default: 5000 */
  heartbeatInterval?: number;
}

const DEFAULT_CONFIG: Required<EngineBridgeConfig> = {
  url: 'ws://localhost:9000',
  autoReconnect: true,
  reconnectInterval: 3000,
  heartbeatInterval: 5000,
};

class EngineBridge {
  private ws: WebSocket | null = null;
  private config: Required<EngineBridgeConfig>;
  private listeners: Map<string, Set<BridgeEventHandler>> = new Map();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private isConnecting = false;
  private _isConnected = false;

  constructor(config?: EngineBridgeConfig) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  get isConnected(): boolean {
    return this._isConnected;
  }

  connect(): void {
    if (this.ws?.readyState === WebSocket.OPEN || this.isConnecting) return;
    this.isConnecting = true;

    try {
      this.ws = new WebSocket(this.config.url);

      this.ws.onopen = () => {
        this.isConnecting = false;
        this._isConnected = true;
        console.log('[EngineBridge] Connected to', this.config.url);
        this.emit({ type: '_connected', payload: {} });
        this.startHeartbeat();
      };

      this.ws.onmessage = (event) => {
        try {
          const message: BridgeMessage = JSON.parse(event.data);
          this.emit(message);
        } catch (e) {
          console.warn('[EngineBridge] Invalid message:', event.data);
        }
      };

      this.ws.onclose = () => {
        this.isConnecting = false;
        this._isConnected = false;
        this.stopHeartbeat();
        console.log('[EngineBridge] Disconnected');
        this.emit({ type: '_disconnected', payload: {} });

        if (this.config.autoReconnect) {
          this.scheduleReconnect();
        }
      };

      this.ws.onerror = (error) => {
        this.isConnecting = false;
        console.warn('[EngineBridge] WebSocket error');
      };
    } catch (e) {
      this.isConnecting = false;
      if (this.config.autoReconnect) {
        this.scheduleReconnect();
      }
    }
  }

  disconnect(): void {
    this.config.autoReconnect = false;
    this.stopHeartbeat();
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  send(message: BridgeMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  /** Send screen change notification to UE5 */
  sendScreenChanged(screen: ScreenName): void {
    this.send({ type: 'screen_changed', payload: { screen } });
  }

  /** Send champion selection notification to UE5 */
  sendChampionSelected(id: string, name: string, group: number): void {
    this.send({ type: 'champion_selected', payload: { id, name, group } });
  }

  /** Send video started notification to UE5 */
  sendVideoStarted(championId: string): void {
    this.send({ type: 'video_started', payload: { championId } });
  }

  /** Send video ended notification to UE5 */
  sendVideoEnded(championId: string): void {
    this.send({ type: 'video_ended', payload: { championId } });
  }

  /** Subscribe to messages from UE5 */
  on(type: string, handler: BridgeEventHandler): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(handler);

    // Return unsubscribe function
    return () => {
      this.listeners.get(type)?.delete(handler);
    };
  }

  /** Subscribe to all messages */
  onAny(handler: BridgeEventHandler): () => void {
    return this.on('*', handler);
  }

  private emit(message: BridgeMessage): void {
    // Notify specific listeners
    this.listeners.get(message.type)?.forEach((h) => h(message));
    // Notify wildcard listeners
    this.listeners.get('*')?.forEach((h) => h(message));
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) return;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, this.config.reconnectInterval);
  }

  private startHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      this.send({ type: 'heartbeat', payload: { timestamp: Date.now() } });
    }, this.config.heartbeatInterval);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }
}

// Singleton instance
let bridgeInstance: EngineBridge | null = null;

export function getEngineBridge(config?: EngineBridgeConfig): EngineBridge {
  if (!bridgeInstance) {
    bridgeInstance = new EngineBridge(config);
  }
  return bridgeInstance;
}

export { EngineBridge };
