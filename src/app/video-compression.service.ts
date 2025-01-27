import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^\w\s.-]/g, '_'); 
}

@Injectable({
  providedIn: 'root',
})

export class VideoCompressionService {
  private ffmpeg = createFFmpeg({ log: true });

  constructor() {}

  async compressVideo(file: File, onProgress: (progress: number) => void): Promise<Blob | null> {
    try {
      if (!this.ffmpeg.isLoaded()) {
        await this.ffmpeg.load();
      }

      const fileName = sanitizeFileName(file.name);
      const fileData = await fetchFile(file); 
      this.ffmpeg.FS('writeFile', fileName, fileData); 
      const outputFileName = 'compressed_' + fileName;
      this.ffmpeg.setProgress(({ ratio }) => {
        onProgress(Math.round(ratio * 100)); 
      });

      await this.ffmpeg.run(
        '-i', fileName,
        '-vf', 'scale=1280:720', 
        '-b:v', '500k', 
        '-preset', 'ultrafast', 
        outputFileName
      );

      // await this.ffmpeg.run(
      //   '-i', fileName,
      //   '-vf', 'scale=640:360', // Scaling the video to 360p
      //   '-c:v', 'libvpx', // Use VP8 codec for faster compression
      //   '-b:v', '500k', // Set a lower bitrate to reduce file size
      //   '-crf', '30', // Higher CRF for faster compression (lower quality)
      //   '-preset', 'ultrafast', // Maximize speed at the cost of some quality
      //   '-threads', '4', // Use multiple threads for faster compression (adjust based on the number of CPU cores)
      //   '-tune', 'fastdecode', // Optimize for fast decoding/encoding
      //   outputFileName
      // );

      const compressedFile = this.ffmpeg.FS('readFile', outputFileName);
      const blob = new Blob([compressedFile.buffer], { type: 'video/mp4' });
      return blob;
    } catch (error) {
      console.error('Error during video compression:', error);
      return null;
    }
  }
}


// import { Injectable } from '@angular/core';
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// @Injectable({
//   providedIn: 'root',
// })
// export class VideoCompressionService {
//   private ffmpeg = createFFmpeg({ log: true });

//   constructor() {}

//   async compressVideo(file: File): Promise<Uint8Array | null> {
//     try {
//       if (!this.ffmpeg.isLoaded()) {
//         await this.ffmpeg.load();
//       }

//       const fileName = file.name;
//       const fileData = await fetchFile(file); 

//       this.ffmpeg.FS('writeFile', fileName, fileData);

//       const outputFileName = 'compressed_' + fileName;
//       const originalSizeMb = file.size / (1024 * 1024); 
//       const targetSizeMb = originalSizeMb * 0.2;
//       const videoDuration = await this.getVideoDuration(file);
//       const targetBitrateKbps = (targetSizeMb * 8 * 1024) / videoDuration;

//       await this.ffmpeg.run('-i', fileName, '-b:v', `${Math.round(targetBitrateKbps)}k`, outputFileName);

//       const compressedFile = this.ffmpeg.FS('readFile', outputFileName);

//       return compressedFile;
//     } catch (error) {
//       console.error('Error during video compression:', error);
//       return null;
//     }
//   }

//   async getVideoDuration(file: File): Promise<number> {
//     const video = document.createElement('video');
//     return new Promise((resolve, reject) => {
//         video.onloadedmetadata = () => {
//             resolve(video.duration);
//         };
//         video.onerror = reject;
//         video.src = URL.createObjectURL(file);
//     });
//   }
// }
