import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DyeingProgramComponent } from './dyeing-program.component';

describe('DyeingProgramComponent', () => {
  let component: DyeingProgramComponent;
  let fixture: ComponentFixture<DyeingProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DyeingProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyeingProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
