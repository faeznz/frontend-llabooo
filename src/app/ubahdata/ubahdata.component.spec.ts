import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbahdataComponent } from './ubahdata.component';

describe('UbahdataComponent', () => {
  let component: UbahdataComponent;
  let fixture: ComponentFixture<UbahdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbahdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UbahdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
