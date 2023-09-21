import { Timestamp } from "./timestamp";

interface QueueOptions {
    cooldown: number;
    global: {
        enabled: boolean;
        value?: number;
    }
}
  
export interface QueueChatUserstate {
    username: string;
    start: number;
}

export interface QueueItem {
    token: Symbol;
    startTime: number;
}

type Item = Partial<QueueItem>;

export abstract class Queue {
    
    static whitelist: unknown[] = [];
    private _queue: Map<Symbol, number> = new Map(); 
    
    public options: QueueOptions = { 
        cooldown: 0, 
        global: {
            enabled: false,
            value: 30000,
        }
    };
    
    private _isGlobalTimerEnabled: boolean = false;
    
    constructor(options: QueueOptions) {
      this.options = options;
    }
  
    public get list(): QueueItem[] {
      const list = [];
      for (let [token, startTime] of this._queue.entries()) {
        list.push({ token, startTime });
      };
      return list;
    }
  
    public clear(): void {
        this._queue.clear();
    }
    
    public static isInWhitelist(item: unknown): boolean {
      if (!item) return false;
      return this.whitelist.includes(item);
    }
    
    async countTime(item: QueueItem): Promise<string> {
      try {
        const now = Date.now();

        if (this._queue.has(item.token)) throw item;
        
        const itemQueueStartTime = this._queue.get(item.token);
        return Timestamp.parseCD(this.options.cooldown * 60000 - (now - itemQueueStartTime));
      } catch (err: unknown) {
        throw item;
      }
    }
    
    public isInQueue(item: Item): boolean {
      if (this._isGlobalTimerEnabled) return true;

      return this._queue.has(item.token);
    }
    
    public addTime(item: QueueItem, time: number): void {
        if (this._queue.has(item.token)) return;
        const newStartTime = Date.now() - (time * 60000);
        this._queue.set(item.token, newStartTime);
    }
    
    public toTimeout(item: Item): void {
      if (!item) return;
      
      const now = Date.now();
      let token = item.token;

      if (!this.isInQueue(item)) {
        token = Symbol();
      }

      this._queue.set(token, now);

      setTimeout(() => { this.removeFromQueue(item) }, this.options.cooldown);
      
      if (!this.options.global.enabled) return;
      this._setGlobalTimerEnabled(true);
      
      setTimeout(() => { this._setGlobalTimerEnabled(false) }, this.options.global.value);
    }

    private _setGlobalTimerEnabled(enabled: boolean): void {
        this._isGlobalTimerEnabled = enabled;
    }
    
    public removeFromQueue(user: Item): void {
        this._queue.delete(user.token);
    }
  }
  