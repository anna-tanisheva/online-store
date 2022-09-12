import { Card } from './cards/card';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { Main } from './main/main';
import { dataArr } from '../controller/make-data';
import { Cart } from './cart/cart';
import { ControlPanel } from './conrol-panel/control-panel';
import { SortButton } from '../view/sort-button/sort-button';
import { RangeSlider } from './range-slider/slider';
import { Filters } from './filters/filters';
import { ResetFiltersButton } from './reset-buttons/reset-filters-button';
import { ResetSettingsButton } from './reset-buttons/reset-settings-button';
import { SearchField } from './search-field/search';
import { Popup } from './popup/popup';

export class AppView {

  private footer: Footer;

  private header: Header;

  private main: Main;

  private cart: Cart;

  private panel: ControlPanel;

  private slider: RangeSlider;

  private filters: Filters;

  private resetFiltersButton: ResetFiltersButton;

  private resetSettingsButton: ResetSettingsButton;

  private searchField: SearchField;

  private noItemsPopup: Popup<string>;

  private noSlotsPopup: Popup<string>;

  constructor () {
    this.footer = new Footer();
    this.header = new Header();
    this.main = new Main();
    this.cart = new Cart();
    this.panel = new ControlPanel();
    this.slider = new RangeSlider();
    this.filters = new Filters();
    this.resetFiltersButton = new ResetFiltersButton();
    this.resetSettingsButton = new ResetSettingsButton();
    this.searchField = new SearchField();
    this.noItemsPopup = new Popup('Sorry, there are no items to display', 'no-items-popup hidden-popup popup');
    this.noSlotsPopup = new Popup('Sorry, there are no slots empty', 'no-slots-popup hidden-popup popup arrow-box');
  }

  private drawFooter(): void {
    const footerTag = document.createElement('footer');
    footerTag.classList.add('footer');
    footerTag.innerHTML = this.footer.template;
    document.querySelector('body')?.append(footerTag)
  }

  private drawHeader(): void {
    const headerTag = document.createElement('header');
    headerTag.classList.add('header');
    headerTag.innerHTML = this.header.template;
    document.querySelector('body')?.append(headerTag)
  }

  private drawMain(): void {
    const mainTag = document.createElement('main');
    mainTag.classList.add('main');
    mainTag.innerHTML = this.main.template;
    document.querySelector('body')?.append(mainTag)
  }

  private drawCard(): void {
    (document.querySelector('.main .container') as HTMLElement).replaceChildren();
    const cardsContainer = document.createElement('section');
    cardsContainer.classList.add('cards-container');

    dataArr.forEach( elem => {
      const card = new Card();
      const cardTag = document.createElement('div');

      cardTag.classList.add('card');
      cardTag.classList.add('hidden');

      const keys: string[] = Object.keys(elem)
      keys.forEach((key) => {
        if (key === 'img') {
          if (elem.model) {
            const fileName = (elem.model as string).split(' ').join('-');
            card.template = card.template.replace(`{${key}}`, `./images/${fileName}.png`)
          }
        } else {
          if (elem[key as keyof typeof elem]) {
            while(card.template.indexOf(`{${key}}`) !== -1) {
              card.template = card.template.replace(`{${key}}`, `${key.toUpperCase()}: ${elem[key as keyof typeof elem]}`)
            }
          }
          if ((key as string) === 'popular') {
            if ((elem[key] as string) === 'yes') {
              cardTag.setAttribute(`data-${key}`, 'true');
            } else {
              cardTag.setAttribute(`data-${key}`, 'false');
            }
          } else {
            cardTag.setAttribute(`data-${key}`, elem[key] as string);
          }
        }
        cardTag.innerHTML = card.template;
      })
      while (cardTag.innerHTML.indexOf('{') !== -1) {
        if (cardTag.innerHTML.indexOf('{') !== -1) {
          const indStart = cardTag.innerHTML.indexOf('{');
          const indEnd = cardTag.innerHTML.indexOf('}');
          const key = cardTag.innerHTML.substring (indStart + 1, indEnd)
          cardTag.innerHTML = cardTag.innerHTML.replace(/{.*}/, `${key.toUpperCase()}: Not set`)
        }
      }

      cardsContainer.append(cardTag)
    })
    document.querySelector('.main .container')?.append(cardsContainer)
  }

  private drawCart(): void {
    const cartContainer = document.querySelector('.header .container');
    (cartContainer as HTMLElement).innerHTML += this.cart.template;
  }

  private drawControlPanel(): void {

    const arrayOfBtns = ['alphabetic-ascending', 'alphabetic-descending', 'year-ascending', 'year-descending'];

    const controlPanelContainer = document.querySelector('.main .container');
    const controlPanelTag = document.createElement('section');
    controlPanelTag.classList.add('control-panel');
    controlPanelTag.innerHTML = this.panel.template;
    const btnsContainer = (controlPanelTag as HTMLElement).querySelector('.sort-buttons-wrapper');
    arrayOfBtns.forEach((btn, ind: number) => {
      btn = new SortButton().template;
      (btnsContainer as HTMLDivElement).innerHTML += btn;
      (btnsContainer as HTMLDivElement).querySelectorAll('.sort-button').forEach(button => {
        if (button.innerHTML === '') {
          button.innerHTML = `${arrayOfBtns[ind].split('-').join(' ')} order`;
          button.setAttribute('data-purpose', arrayOfBtns[ind])
        }
      })
    })
    controlPanelContainer?.prepend(controlPanelTag)
  }

  private drawRangeSlider(): void {
    const controlPanelContainer = document.querySelector('.control-panel-wrapper');
    const controlRangeSliderWrapper = document.createElement('div');
    const captureYear = document.createElement('p');
    const captureStock = document.createElement('p');
    captureYear.innerHTML = `Range by Year`;
    captureStock.innerHTML = `Range by Amount on Stock`;

    captureYear.classList.add('capture');
    captureYear.classList.add('capture-year');
    captureStock.classList.add('capture');
    captureStock.classList.add('capture-stock');

    controlRangeSliderWrapper.classList.add('range-sliders-wrapper');
    controlRangeSliderWrapper.append(captureYear, captureStock)
    controlRangeSliderWrapper.innerHTML += this.slider.template
    controlPanelContainer?.append(controlRangeSliderWrapper);
  }

  private drawFilters (): void {
    const controlPanelContainer = document.querySelector('.control-panel-wrapper');
    const controlFiltersWrapper = document.createElement('div');
    controlFiltersWrapper.classList.add('filters-wrapper');
    controlFiltersWrapper.innerHTML = this.filters.template;
    controlPanelContainer?.append(controlFiltersWrapper);
  }

  private drawResetButtons (): void {
    const controlPanelContainer= document.querySelector('.control-panel-wrapper');
    const resetWrapper = document.createElement('div');
    resetWrapper.classList.add('reset-buttons-wrapper');
    resetWrapper.innerHTML += this.resetFiltersButton.template;
    resetWrapper.innerHTML += this.resetSettingsButton.template;
    controlPanelContainer?.append(resetWrapper);
  }

  private drawSearchField (): void {
    const controlPanelContainer= document.querySelector('.control-panel-wrapper');
    const searchWrapper = document.createElement('div');
    searchWrapper.classList.add('search-field-wrapper');
    searchWrapper.innerHTML += this.searchField.template;
    controlPanelContainer?.append(searchWrapper);
  }

  private drawNoItemsPopup (): void {
    const popupContainer = document.querySelector('.main .container');
    const popupWrapper = document.createElement('div');
    popupWrapper.classList.add('no-items-popup-wrapper');
    popupWrapper.innerHTML += this.noItemsPopup.template;
    popupContainer?.append(popupWrapper);
  }

  private drawNoSlotsPopup (): void {
    const popupContainer = document.querySelector('.cart');
    const popupWrapper = document.createElement('div');
    popupWrapper.classList.add('no-slots-popup-wrapper');
    popupWrapper.innerHTML += this.noSlotsPopup.template;
    popupContainer?.append(popupWrapper);
  }

    public drawView(): void {
    this.drawHeader();
    this.drawMain();
    this.drawCard();
    this.drawControlPanel();
    this.drawCart();
    this.drawFooter();
    this.drawFilters();
    this.drawRangeSlider();
    this.drawSearchField();
    this.drawResetButtons();
    this.drawNoSlotsPopup();
    this.drawNoItemsPopup();
  }
}