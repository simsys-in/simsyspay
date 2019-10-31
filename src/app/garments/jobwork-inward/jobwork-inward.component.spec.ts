import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobworkInwardComponent } from './jobwork-inward.component';

describe('JobworkInwardComponent', () => {
  let component: JobworkInwardComponent;
  let fixture: ComponentFixture<JobworkInwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobworkInwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobworkInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
