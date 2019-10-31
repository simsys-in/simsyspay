import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricReturnComponent } from './fabric-return.component';

describe('FabricReturnComponent', () => {
  let component: FabricReturnComponent;
  let fixture: ComponentFixture<FabricReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
