import { TestBed } from '@angular/core/testing';

import { SideMenuService } from './side-menu.service';

describe('SideMenuService', () => {
  let service: SideMenuService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(SideMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('openMenu', () => {

    it('should broadcast open menu request', done => {
      const spy = spyOn(service.openMenuBroadcaster, 'next');

      service.openMenu();

      expect(spy).toHaveBeenCalled();
      done();
    });

  });

  describe('closeMenu', () => {

    it('should broadcast close menu request', done => {
      const spy = spyOn(service.closeMenuBroadcaster, 'next');

      service.closeMenu();

      expect(spy).toHaveBeenCalled();
      done();
    });

  });

  describe('toggleMenu', () => {

    it('should broadcast toggle menu request', done => {
      const spy = spyOn(service.toggleMenuBroadcaster, 'next');

      service.toggleMenu();

      expect(spy).toHaveBeenCalled();
      done();
    });

  });
});
