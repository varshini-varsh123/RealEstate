import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAuthAppComponent } from './my-auth-app.component';

describe('MyAuthAppComponent', () => {
  let component: MyAuthAppComponent;
  let fixture: ComponentFixture<MyAuthAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAuthAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAuthAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
