import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricOutwardComponent } from './fabric-outward.component';

describe('FabricOutwardComponent', () => {
  let component: FabricOutwardComponent;
  let fixture: ComponentFixture<FabricOutwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricOutwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
