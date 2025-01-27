import { Component } from '@angular/core';
import { VideoCompressionService } from '../video-compression.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  originalVideoUrl: string | ArrayBuffer | null = null;
  compressedVideoUrl: string | ArrayBuffer | null = null;
  originalSize: any = 0;
  compressedSize: any = 0;
  progress: number = 0;
  isLoading = false;

  constructor(private videoCompressionService: VideoCompressionService) {}

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.originalSize = (file.size / 1024 / 1024).toFixed(2); 
      this.originalVideoUrl = URL.createObjectURL(file);

      this.isLoading = true;
      const compressedFile = await this.videoCompressionService.compressVideo(file, (progress: number) => {
        this.progress = progress; 
      });

      if (compressedFile) {
        this.compressedSize = (compressedFile.size / 1024 / 1024).toFixed(2); 
        this.compressedVideoUrl = URL.createObjectURL(compressedFile);
      }

      this.isLoading = false;
    }
  }

  uploadVideo() {
    if (this.compressedVideoUrl) {
      console.log('Uploading compressed video...');
    }
  }
  // originalFileSize: number | null = null;
  // compressedFileSize: number | null = null;
  // originalVideoUrl: string | null = null;
  // compressedVideoUrl: string | null = null;
  // isLoading: boolean = false;
  // compressionPercentage: number = 0;
  // compressedVideo: Blob | null = null;
  // errorMessage: string | null = null;

  // constructor(private videoCompressionService: VideoCompressionService) {}

  // async onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input?.files?.length) {
  //     const file = input.files[0];
  //     this.originalVideoUrl = URL.createObjectURL(file);  
  //     this.isLoading = true;
  //     const compressedFile = await this.videoCompressionService.compressVideo(file);
  //     this.isLoading = false;
  //     if (compressedFile) {
  //       console.log('Compressed file size:', compressedFile.length);
  //       this.compressedVideo = new Blob([compressedFile], { type: 'video/mp4' });
  //       this.compressedVideoUrl = URL.createObjectURL(this.compressedVideo);
  //     } else {
  //       console.error('Video compression failed.');
  //     }
  //   }
  // }

  // uploadVideo() {
  //   if (this.compressedVideo) {
  //     console.log('Uploading compressed video...');
  //     const formData = new FormData();
  //     formData.append('file', this.compressedVideo, 'compressed_video.mp4');
  //   } else {
  //     console.error('No video selected or compressed.');
  //   }
  // }
}
