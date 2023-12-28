import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabunganComponent } from './tabungan.component';

describe('TabunganComponent', () => {
  let component: TabunganComponent;
  let fixture: ComponentFixture<TabunganComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabunganComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabunganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
