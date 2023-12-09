import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahdataComponent } from './tambahdata.component';

describe('TambahdataComponent', () => {
  let component: TambahdataComponent;
  let fixture: ComponentFixture<TambahdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TambahdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TambahdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
