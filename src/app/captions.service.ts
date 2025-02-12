import { Injectable } from '@angular/core';
import { pipeline } from '@xenova/transformers';

@Injectable({
  providedIn: 'root',
})
export class CaptionService {

  constructor() {}

  async generateCaptions(audioBlob: Blob): Promise<string | null> {
    try {
      const model = await pipeline('automatic-speech-recognition', 'whisper-base');  

      const audioFile = new File([audioBlob], 'audio.wav');

      const arrayBuffer = await this.readFileAsArrayBuffer(audioFile);

      const floatArray = new Float32Array(arrayBuffer);

      const transcription = await model(floatArray);

      const transcriptionText = Array.isArray(transcription) ? transcription[0]?.text : transcription?.text;
      
      return transcriptionText || null;
    } catch (error) {
      console.error('Error generating captions:', error);
      return null;
    }
  }

  private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }
}
