import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HishamTestComponent } from './hisham-test.component';

describe('HishamTestComponent', () => {
  let component: HishamTestComponent;
  let fixture: ComponentFixture<HishamTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HishamTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HishamTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
