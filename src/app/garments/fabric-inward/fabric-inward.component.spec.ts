import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricInwardComponent } from './fabric-inward.component';

describe('FabricInwardComponent', () => {
  let component: FabricInwardComponent;
  let fixture: ComponentFixture<FabricInwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricInwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
