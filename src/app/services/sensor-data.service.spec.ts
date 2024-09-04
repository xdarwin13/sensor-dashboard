/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SensorDataService } from './sensor-data.service';

describe('Service: SensorData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SensorDataService]
    });
  });

  it('should ...', inject([SensorDataService], (service: SensorDataService) => {
    expect(service).toBeTruthy();
  }));
});
