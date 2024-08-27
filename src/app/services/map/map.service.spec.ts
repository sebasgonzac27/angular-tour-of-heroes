import { TestBed } from '@angular/core/testing';

import { MapService } from './map.service';

describe('MapService', () => {
  let mapService: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapService]
    });
    mapService = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(mapService).toBeTruthy();
  });

  describe('getCurrentPosition', () => {
    it('should set the center latitude and longitude', () => {
      const position = {
        coords: {
          latitude: 10,
          longitude: 20,
          altitude: 0,
          accuracy: 0,
          altitudeAccuracy: 0,
          heading: 0,
          speed: 0
        },
        timestamp: 0
      };
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake((callback) => {
        callback(position);
      });
      mapService.getCurrentPosition();
      expect(mapService.center.latitude).toBe(10);
      expect(mapService.center.longitude).toBe(20);
    });
  })
});
