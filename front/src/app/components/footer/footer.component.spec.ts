import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente Footer', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir o texto correto no footer', () => {
    const footerTextElement: HTMLElement = fixture.nativeElement.querySelector('.footer-text');
    expect(footerTextElement.textContent).toContain('Case Test Gol - Desenvolvido por Jorge Braz - Utilizando Angular');
  });
});
