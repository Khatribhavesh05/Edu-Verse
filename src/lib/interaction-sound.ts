/**
 * Streak Widget Interaction Sound
 * 
 * Creates a subtle flame whoosh sound when users interact with the streak widget
 * 
 * Rules:
 * - Very soft volume
 * - Short duration (< 0.3 seconds)
 * - No loop, plays once
 * - Simulates flame/whoosh effect
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
 * Play flame whoosh sound
 * Simulates a soft flame ignition or whoosh effect
 */
export function playFlameWhooshSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create noise for flame texture
    const bufferSize = ctx.sampleRate * 0.3; // 0.3 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate pink noise (softer than white noise, more flame-like)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }
    
    // Buffer source for noise
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    
    // Filter for flame character (low-pass for warmth)
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, now); // Start warm
    filter.frequency.exponentialRampToValueAtTime(500, now + 0.25); // Fade down
    
    // Gain for volume envelope (whoosh shape)
    const gainNode = ctx.createGain();
    
    // Connect chain
    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Whoosh envelope: quick rise, gradual fall
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.06, now + 0.04); // Very soft peak
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    
    // Play
    noiseSource.start(now);
    noiseSource.stop(now + 0.3);
    
  } catch (error) {
    console.warn('Flame whoosh sound not supported:', error);
  }
}

/**
 * Clean up audio context (optional)
 */
export function cleanupInteractionAudioContext(): void {
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}
