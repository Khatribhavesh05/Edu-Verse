/**
 * Sound Effects Manager for EduVerse
 * All sounds are soft, short, and child-friendly
 */

class SoundManager {
  private audioContext: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Load mute preference from localStorage
    if (typeof window !== 'undefined') {
      const savedPreference = localStorage.getItem('eduverse-sound-muted');
      this.isMuted = savedPreference === 'true';
      
      // Initialize Web Audio API
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.warn('Web Audio API not supported');
      }
    }
  }

  /**
   * Play a soft click sound
   */
  playClick(): void {
    if (this.isMuted || !this.audioContext) return;
    
    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.05);
  }

  /**
   * Play a streak whoosh sound
   */
  playStreak(): void {
    if (this.isMuted || !this.audioContext) return;
    
    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 400;
    oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  }

  /**
   * Play a badge unlock chime
   */
  playBadge(): void {
    if (this.isMuted || !this.audioContext) return;
    
    const ctx = this.audioContext;
    
    // Play three notes: C, E, G (major chord)
    const frequencies = [523.25, 659.25, 783.99];
    const startTimes = [0, 0.05, 0.1];
    
    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime + startTimes[i]);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTimes[i] + 0.3);
      
      oscillator.start(ctx.currentTime + startTimes[i]);
      oscillator.stop(ctx.currentTime + startTimes[i] + 0.3);
    });
  }

  /**
   * Play a success pop sound
   */
  playSuccess(): void {
    if (this.isMuted || !this.audioContext) return;
    
    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 1000;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.08);
  }

  /**
   * Play a page transition whoosh sound
   */
  playPageTransition(): void {
    if (this.isMuted || !this.audioContext) return;
    
    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 300;
    oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.12);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.12);
  }

  /**
   * Play Orbi hello sound (friendly pop)
   */
  playOrbiHello(): void {
    if (this.isMuted || !this.audioContext) return;
    
    const ctx = this.audioContext;
    
    // Two-tone friendly pop (C6 -> E6)
    const frequencies = [1046.50, 1318.51];
    
    frequencies.forEach((freq, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      
      const startTime = ctx.currentTime + (i * 0.04);
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.1);
    });
  }

  /**
   * Play dashboard action start sound
   */
  playActionStart(): void {
    if (this.isMuted || !this.audioContext) return;
    
    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 700;
    oscillator.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.08);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  }

  /**
   * Play card/feature open sound
   */
  playCardOpen(): void {
    if (this.isMuted || !this.audioContext) return;
    
    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 500;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.06);
  }

  /**
   * Toggle mute state
   */
  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('eduverse-sound-muted', String(this.isMuted));
    }
    return this.isMuted;
  }

  /**
   * Get current mute state
   */
  getMuteState(): boolean {
    return this.isMuted;
  }

  /**
   * Set mute state
   */
  setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('eduverse-sound-muted', String(muted));
    }
  }
}

// Export singleton instance
export const soundManager = new SoundManager();

// Convenience functions
export const playClickSound = () => soundManager.playClick();
export const playStreakSound = () => soundManager.playStreak();
export const playBadgeSound = () => soundManager.playBadge();
export const playSuccessSound = () => soundManager.playSuccess();
export const playPageTransitionSound = () => soundManager.playPageTransition();
export const playOrbiHelloSound = () => soundManager.playOrbiHello();
export const playActionStartSound = () => soundManager.playActionStart();
export const playCardOpenSound = () => soundManager.playCardOpen();
export const toggleSoundMute = () => soundManager.toggleMute();
export const isSoundMuted = () => soundManager.getMuteState();
