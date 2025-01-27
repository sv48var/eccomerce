import { TestBed } from '@angular/core/testing';

import { VideoCompressionService } from './video-compression.service';

describe('VideoCompressionService', () => {
  let service: VideoCompressionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoCompressionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
