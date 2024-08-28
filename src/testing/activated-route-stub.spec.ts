// activated-route-stub.spec.ts
import { fakeAsync } from '@angular/core/testing';
import { ActivatedRouteStub } from './activated-route-stub';
import { convertToParamMap } from '@angular/router';

describe('ActivatedRouteStub', () => {
  let activatedRouteStub: ActivatedRouteStub;

  beforeEach(() => {
    activatedRouteStub = new ActivatedRouteStub();
  });

  it('should emit an empty ParamMap initially for paramMap', fakeAsync( () => {
    activatedRouteStub.paramMap.subscribe(paramMap => {
      expect(paramMap.keys.length).toEqual(0);
    });
  }));

  it('should emit an empty ParamMap initially for queryParamMap', fakeAsync(() => {
    activatedRouteStub.queryParamMap.subscribe(queryParamMap => {
      expect(queryParamMap.keys.length).toEqual(0);
    });
  }));

  it('should emit a new ParamMap when setParamMap is called', (done) => {
    const params = { id: '123' };
    activatedRouteStub.setParamMap(params);

    activatedRouteStub.paramMap.subscribe(paramMap => {
      expect(paramMap.get('id')).toBe('123');
      done();
    });
  });

  it('should emit a new QueryParamMap when setQueryParamMap is called', (done) => {
    const queryParams = { search: 'test' };
    activatedRouteStub.setQueryParamMap(queryParams);

    activatedRouteStub.queryParamMap.subscribe(queryParamMap => {
      expect(queryParamMap.get('search')).toBe('test');
      done();
    });
  });

  it('should convert Params to ParamMap correctly', (done) => {
    const params = { foo: 'bar', baz: 'qux' };
    activatedRouteStub.setParamMap(params);

    activatedRouteStub.paramMap.subscribe(paramMap => {
      expect(paramMap.get('foo')).toBe('bar');
      expect(paramMap.get('baz')).toBe('qux');
      done();
    });
  });

  it('should convert QueryParams to QueryParamMap correctly', (done) => {
    const queryParams = { page: '1', sort: 'desc' };
    activatedRouteStub.setQueryParamMap(queryParams);

    activatedRouteStub.queryParamMap.subscribe(queryParamMap => {
      expect(queryParamMap.get('page')).toBe('1');
      expect(queryParamMap.get('sort')).toBe('desc');
      done();
    });
  });
});
