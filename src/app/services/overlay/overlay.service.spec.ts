import { TestBed } from '@angular/core/testing';

import { OverlayService } from './overlay.service';

describe('OverlayService', () => {
  let service: OverlayService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(OverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('openOverlay', () => {

    it('should broadcast open request', done => {
      const spy = spyOn(service.openOverlayBroadcaster, 'next');

      service.openOverlay();

      expect(spy).toHaveBeenCalled();

      done();
    });

  });

  describe('closeOverlay', () => {

    it('should broadcast close request', done => {
      const spy = spyOn(service.closeOverlayBroadcaster, 'next');

      service.closeOverlay();

      expect(spy).toHaveBeenCalled();

      done();
    });

  });

  describe('toggleOverlay', () => {

    it('should broadcast toggle request', done => {
      const spy = spyOn(service.toggleOverlayBroadcaster, 'next');

      service.toggleOverlay();

      expect(spy).toHaveBeenCalled();

      done();
    });

  });
  
});
