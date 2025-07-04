import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropformComponent } from './propform.component';

describe('PropformComponent', () => {
  let component: PropformComponent;
  let fixture: ComponentFixture<PropformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
