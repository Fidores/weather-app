import { TestBed } from '@angular/core/testing';

import { MainHeaderService } from './main-header.service';

describe('MainHeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainHeaderService = TestBed.get(MainHeaderService);
    expect(service).toBeTruthy();
  });

  describe('setTitle', () => {

    it('should broadcast set title request', done => {
      const service: MainHeaderService = TestBed.get(MainHeaderService);
      const spy = spyOn(service.changeTitleBroadcaster, 'next');
      const title = 'A';

      service.setTitle(title);

      expect(spy).toHaveBeenCalledWith(title);
      done();
    });

  });
});
