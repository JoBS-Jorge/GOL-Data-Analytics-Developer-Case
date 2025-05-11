import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReservationsSearchComponent } from './reservations-search.component';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('ReservationsSearchComponent', () => {
  let component: ReservationsSearchComponent;
  let fixture: ComponentFixture<ReservationsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsSearchComponent] // standalone
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir o valor transformado ao digitar no input', () => {
    spyOn(component.search, 'emit');

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = ' João ';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.search.emit).toHaveBeenCalledWith('joão');
  });

  it('deve mostrar o botão de limpar quando searchValue não está vazio', () => {
    component.searchValue = 'teste';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();
  });

  it('deve limpar o input e emitir string vazia ao clicar no botão de limpar', () => {
    component.searchValue = 'algo';
    fixture.detectChanges();

    spyOn(component.search, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click');
    fixture.detectChanges();

    expect(component.searchValue).toBe('');
    expect(component.search.emit).toHaveBeenCalledWith('');
  });
});
