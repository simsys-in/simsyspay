import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnReturnComponent } from './yarn-return.component';

describe('YarnReturnComponent', () => {
  let component: YarnReturnComponent;
  let fixture: ComponentFixture<YarnReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YarnReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YarnReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
