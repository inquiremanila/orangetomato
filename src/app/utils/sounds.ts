// Sound utility for playing notification sounds
// Uses Web Audio API for cross-browser compatibility

// Base64 encoded sound data for notification (short beep)
const NOTIFICATION_SOUND = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwNUarm77RgGwU7k9nyw3YoBS189vDhkjwKEmCz6u2nVBIJS5zf8rxrHgUpf83y2ogzCBxs';
const COMMENT_SOUND = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwNUarm77RgGwU7k9nyw3YoBS189vDhkjwKEmCz6u2nVBIJS5zf8rxrHgUpf83y2ogzCBxs';

let audioContext: AudioContext | null = null;

// Initialize audio context on first use
const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

// Decode base64 audio data and play
const playBase64Audio = async (base64Data: string, volume: number = 0.5): Promise<void> => {
  try {
    const context = getAudioContext();
    
    // Convert base64 to array buffer
    const binaryString = atob(base64Data.split(',')[1]);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Decode audio data
    const audioBuffer = await context.decodeAudioData(bytes.buffer);
    
    // Create source and gain nodes
    const source = context.createBufferSource();
    const gainNode = context.createGain();
    
    source.buffer = audioBuffer;
    gainNode.gain.value = volume;
    
    // Connect nodes
    source.connect(gainNode);
    gainNode.connect(context.destination);
    
    // Play sound
    source.start(0);
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

// Play notification sound
export const playNotificationSound = (): void => {
  playBase64Audio(NOTIFICATION_SOUND, 0.3);
};

// Play comment sound (slightly different tone)
export const playCommentSound = (): void => {
  playBase64Audio(COMMENT_SOUND, 0.4);
};

// Alternative: Simple beep using oscillator
export const playBeep = (frequency: number = 800, duration: number = 150): void => {
  try {
    const context = getAudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration / 1000);
    
    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + duration / 1000);
  } catch (error) {
    console.error('Error playing beep:', error);
  }
};
