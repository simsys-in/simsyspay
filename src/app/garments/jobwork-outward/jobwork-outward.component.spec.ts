import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobworkOutwardComponent } from './jobwork-outward.component';

describe('JobworkOutwardComponent', () => {
  let component: JobworkOutwardComponent;
  let fixture: ComponentFixture<JobworkOutwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobworkOutwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobworkOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
