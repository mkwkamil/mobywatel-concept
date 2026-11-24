// Darmowy, natywny polski syntezator mowy (Web Speech API) z bezpiecznym fallbackiem wizualnym

class PolishSpeechController {
  private speakingCallback: ((isSpeaking: boolean) => void) | null = null;
  private fallbackTimer: number | null = null;

  public speak(text: string, onStateChange?: (isSpeaking: boolean) => void) {
    this.stop();
    this.speakingCallback = onStateChange ?? null;

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.simulateVisualSpeech(text);
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pl-PL';
      utterance.rate = 0.92; // Nieco wolniejsze, wyraźne tempo dla seniora
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const polishVoice =
        voices.find((v) => v.lang.toLowerCase().startsWith('pl') && v.name.includes('Zosia')) ||
        voices.find((v) => v.lang.toLowerCase().startsWith('pl'));
      if (polishVoice) {
        utterance.voice = polishVoice;
      }

      utterance.onstart = () => {
        this.speakingCallback?.(true);
      };
      utterance.onend = () => {
        this.speakingCallback?.(false);
        this.speakingCallback = null;
      };
      utterance.onerror = () => {
        this.speakingCallback?.(false);
        this.speakingCallback = null;
      };

      this.speakingCallback?.(true);
      window.speechSynthesis.speak(utterance);

      // Zabezpieczenie na wypadek zablokowanego dźwięku w przeglądarce
      const durationMs = Math.min(Math.max(text.length * 55, 2500), 9000);
      this.fallbackTimer = window.setTimeout(() => {
        this.speakingCallback?.(false);
      }, durationMs);
    } catch {
      this.simulateVisualSpeech(text);
    }
  }

  private simulateVisualSpeech(text: string) {
    this.speakingCallback?.(true);
    const durationMs = Math.min(Math.max(text.length * 45, 2200), 6000);
    this.fallbackTimer = window.setTimeout(() => {
      this.speakingCallback?.(false);
      this.speakingCallback = null;
    }, durationMs);
  }

  public stop() {
    if (this.fallbackTimer !== null && typeof window !== 'undefined') {
      window.clearTimeout(this.fallbackTimer);
      this.fallbackTimer = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    this.speakingCallback?.(false);
    this.speakingCallback = null;
  }
}

export const polishSpeech = new PolishSpeechController();
