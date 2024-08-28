// in-memory-data.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { InMemoryDataService } from './in-memory-data.service';
import { Hero } from '../../models/hero';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('createDb: should return a list of heroes', () => {
    const db = service.createDb();
    expect(db.heroes.length).toBe(9);
    expect(db.heroes).toEqual([
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' },
    ]);
  });

  it('genId: should return 11 if no heroes', () => {
    const result = service.genId([]);
    expect(result).toBe(11);
  });

  it('genId: should return the max hero id + 1 if heroes are present', () => {
    const heroes: Hero[] = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
    ];
    const result = service.genId(heroes);
    expect(result).toBe(15);
  });

  it('genId: should return the next id for a single hero', () => {
    const heroes: Hero[] = [{ id: 20, name: 'Tornado' }];
    const result = service.genId(heroes);
    expect(result).toBe(21);
  });
});
