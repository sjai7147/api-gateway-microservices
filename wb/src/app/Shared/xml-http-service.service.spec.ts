import { TestBed } from '@angular/core/testing';

import { XmlHttpServiceService } from './xml-http-service.service';

describe('XmlHttpServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: XmlHttpServiceService = TestBed.get(XmlHttpServiceService);
    expect(service).toBeTruthy();
  });
});
