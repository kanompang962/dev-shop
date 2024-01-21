import { HomeComponent } from './home.component'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from 'src/app/app.component';

describe('AppComponent', () => {
    // let fixture:HomeComponent;
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
          declarations: [HomeComponent],
          imports: [HttpClientTestingModule], // Import the HttpClientTestingModule
        }).compileComponents();
      });

      beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create the app', () => {
        expect(component).toBeTruthy();
      });
    
      it('should have a title "home"', () => {
        expect(component.title).toEqual('home');
      });

      it('should be "home" on app component html', () => {
        // const fixture = TestBed.createComponent(AppComponent)
        expect(fixture.nativeElement.textContent).toContain('COLLECTION');
      });
  })
