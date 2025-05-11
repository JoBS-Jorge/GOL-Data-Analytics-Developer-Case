import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  afterEach(() => {
    localStorage.clear();
    document.body.classList.remove('high-contrast');
  });

  it('deve criar o componente', async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('deve carregar o contraste do localStorage no ngOnInit', async () => {
    localStorage.setItem('highContrast', JSON.stringify(true));

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // ngOnInit é chamado aqui

    expect(component.isHighContrast).toBeTrue();
    expect(document.body.classList.contains('high-contrast')).toBeTrue();
  });

  it('deve alternar o contraste e atualizar o localStorage corretamente', async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Alternar para true
    component.isHighContrast = false;
    component.toggleContrast();

    expect(component.isHighContrast).toBeTrue();
    expect(localStorage.getItem('highContrast')).toBe('true');
    expect(document.body.classList.contains('high-contrast')).toBeTrue();

    // Alternar de volta para false
    component.toggleContrast();

    expect(component.isHighContrast).toBeFalse();
    expect(localStorage.getItem('highContrast')).toBe('false');
    expect(document.body.classList.contains('high-contrast')).toBeFalse();
  });

  it('deve aplicar o modo de alto contraste no body', async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    component.isHighContrast = true;
    component.applyContrastMode();

    expect(document.body.classList.contains('high-contrast')).toBeTrue();
  });

  it('deve remover o modo de alto contraste do body', async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    document.body.classList.add('high-contrast');
    component.isHighContrast = false;
    component.applyContrastMode();

    expect(document.body.classList.contains('high-contrast')).toBeFalse();
  });
});
