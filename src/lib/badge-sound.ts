/**
 * Badge Unlock Sound Effects
 * 
 * Creates celebration sounds for different badge milestones:
 * - Bronze Badge (3 days): Soft sparkle sound
 * - Silver Badge (7 days): Brighter chime + sparkle
 * - Golden Crown (15 days): Royal chime + sparkle
 * 
 * All sounds:
 * - Play ONCE per unlock
 * - Duration < 1 second
 * - Rewarding but not loud
 * - Generated via Web Audio API
 */

import { isSoundMuted } from './sound-effects';

let audioContext: AudioContext | null = null;

/**
 * Initialize audio context (lazy initialization)
 */
function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

/**
 * Create sparkle sound effect
 * Fast ascending arpeggio with shimmer
 */
function createSparkle(ctx: AudioContext, startTime: number, volume: number = 0.12): void {
  const sparkleNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  
  sparkleNotes.forEach((frequency, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.setValueAtTime(frequency, startTime + index * 0.05);
    osc.type = 'sine';
    
    // Quick fade in and out for sparkle effect
    const noteStart = startTime + index * 0.05;
    gain.gain.setValueAtTime(0, noteStart);
    gain.gain.linearRampToValueAtTime(volume, noteStart + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.01, noteStart + 0.15);
    
    osc.start(noteStart);
    osc.stop(noteStart + 0.15);
  });
}

/**
 * Bronze Badge Sound (3 days)
 * Soft sparkle - gentle and encouraging
 */
export function playBronzeBadgeSound(): void {
  if (isSoundMuted()) return;
  
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Soft sparkle only
    createSparkle(ctx, now, 0.1);
    
  } catch (error) {
    console.warn('Bronze badge audio not supported:', error);
  }
}

/**
 * Silver Badge Sound (7 days)
 * Brighter chime + sparkle - more celebratory
 */
export function playSilverBadgeSound(): void {
  if (isSoundMuted()) return;
  
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Main chime (brighter, two-tone)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    
    // Silver chime: D5 + F#5 (major third)
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc2.frequency.setValueAtTime(739.99, now); // F#5
    osc1.type = 'sine';
    osc2.type = 'sine';
    
    // Volume envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.04);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.5);
    osc2.stop(now + 0.5);
    
    // Add sparkle on top
    createSparkle(ctx, now + 0.15, 0.12);
    
  } catch (error) {
    console.warn('Silver badge audio not supported:', error);
  }
}

/**
 * Golden Crown Sound (15 days)
 * Royal chime + sparkle - triumphant and majestic
 */
export function playGoldenCrownSound(): void {
  if (isSoundMuted()) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Royal fanfare chord (3-note major chord)
    const frequencies = [
      523.25,  // C5
      659.25,  // E5
      783.99   // G5
    ];
    
    const oscillators: OscillatorNode[] = [];
    const mainGain = ctx.createGain();
    mainGain.connect(ctx.destination);
    
    // Create rich chord
    frequencies.forEach((freq) => {
      const osc = ctx.createOscillator();
      osc.connect(mainGain);
      osc.frequency.setValueAtTime(freq, now);
      osc.type = 'sine';
      oscillators.push(osc);
    });
    
    // Royal envelope - longer, more majestic
    mainGain.gain.setValueAtTime(0, now);
    mainGain.gain.linearRampToValueAtTime(0.2, now + 0.06);
    mainGain.gain.linearRampToValueAtTime(0.2, now + 0.3);
    mainGain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);
    
    oscillators.forEach((osc) => {
      osc.start(now);
      osc.stop(now + 0.7);
    });
    
    // Add bright sparkle cascade
    createSparkle(ctx, now + 0.2, 0.15);
    
    // Add second sparkle for extra celebration
    createSparkle(ctx, now + 0.4, 0.13);
    
  } catch (error) {
    console.warn('Golden crown audio not supported:', error);
  }
}

/**
 * Play appropriate badge sound based on milestone days
 */
export function playBadgeUnlockSound(days: number): void {
  if (days === 3) {
    playBronzeBadgeSound();
  } else if (days === 7) {
    playSilverBadgeSound();
  } else if (days >= 15) {
    playGoldenCrownSound();
  }
}

/**
 * Clean up audio context (optional)
 */
export function cleanupBadgeAudioContext(): void {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}
