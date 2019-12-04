/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TrackDataService } from './trackData.service';

describe('Service: TrackData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrackDataService]
    });
  });

  it('should ...', inject([TrackDataService], (service: TrackDataService) => {
    expect(service).toBeTruthy();
  }));
});
