import { TestBed } from '@angular/core/testing';

import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagesService],
    });
    service = TestBed.inject(MessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have no messages to start', () => {
    expect(service.messages.length).toBe(0);
  });

  it('should add a message', () => {
    service.add('message1');
    expect(service.messages.length).toBe(1);
    expect(service.messages).toContain('message1');
  })

  it('should remove all messages when clear is called', () => {
    service.add('message1');
    service.clear();
    expect(service.messages.length).toBe(0);
  })
});
