import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectLoaderComponent } from './my-project-loader.component';

describe('MyProjectLoaderComponent', () => {
  let component: MyProjectLoaderComponent;
  let fixture: ComponentFixture<MyProjectLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyProjectLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProjectLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
