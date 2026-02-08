/**
 * Streak Sound Effect Utility
 * 
 * Generates a soft, positive "progress chime" sound using Web Audio API
 * Duration: < 0.5 seconds
 * Volume: Subtle and pleasant
 */

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
 * Play a soft progress chime sound
 * Creates a pleasant two-tone chime that lasts ~0.4 seconds
 */
export function playStreakChime(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create oscillator for the chime
    const oscillator1 = ctx.createOscillator();
    const oscillator2 = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Connect nodes
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Set frequencies for a pleasant two-tone chime (C5 and E5)
    oscillator1.frequency.setValueAtTime(523.25, now); // C5
    oscillator2.frequency.setValueAtTime(659.25, now); // E5
    
    // Use sine wave for soft, pleasant tone
    oscillator1.type = 'sine';
    oscillator2.type = 'sine';
    
    // Set volume envelope (fade in and out for smoothness)
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05); // Soft fade in
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.2);  // Hold
    gainNode.gain.linearRampToValueAtTime(0, now + 0.4);     // Fade out
    
    // Start and stop
    oscillator1.start(now);
    oscillator2.start(now);
    oscillator1.stop(now + 0.4);
    oscillator2.stop(now + 0.4);
    
  } catch (error) {
    // Silently fail if audio context is not supported
    console.warn('Audio playback not supported:', error);
  }
}

/**
 * Clean up audio context (optional, for memory management)
 */
export function cleanupAudioContext(): void {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}
