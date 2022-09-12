import { AppView } from '../view/appView';
import { handleSortMethodChange, resetFiltersCB, onFilterChanged, rangeSliderChangeCBYear, rangeSliderChangeCBStock, clearValueCB, searchFieldCB, resetSettingsCB, onItemAddedToCart } from '../callbacks/callbacks';
import * as noUiSlider from 'nouislider';
import { settingsObj, getSettingsFromStorage } from '../controller/make-settings';
import wNumb from 'wnumb';
import { addWindowOnLoad } from '../callbacks/helpers'

export const settingsStorage = localStorage;


export class App {
  private view: AppView;

  constructor() {
    this.view = new AppView();
  }

  public start(): void {
    getSettingsFromStorage(settingsStorage);
    this.view.drawView();

    const sliderYearTarget = document.querySelector('#slider-year');
    const sliderOnStockTarget = document.querySelector('#slider-on-stock');
    const filters = document.querySelector('.filters-wrapper');
    const searchField = document.querySelector('.search-field');
    const clearButton = document.querySelector('.clear-icon');
    const resetFiltersButton = document.querySelector('.reset-filters');
    const resetSettingsButton = document.querySelector('.reset-settings');
    const sortingButtonsWrapper = document.querySelector('.sort-buttons-wrapper');
    const cardsWrapper = document.querySelector('.cards-container');



    if (sliderYearTarget && sliderYearTarget instanceof HTMLElement) {
      const yearSlider = noUiSlider.create(sliderYearTarget, {
        start: [settingsObj.filter.year.min || 2007, settingsObj.filter.year.max || 2022],
        connect: true,
        step: 1,
        range: {
            'min': 2007,
            'max': 2022
        },
        tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})]
      });
      yearSlider.on('change', rangeSliderChangeCBYear);
    }


    if (sliderOnStockTarget && sliderOnStockTarget instanceof HTMLElement) {
      const stockSlider = noUiSlider.create(sliderOnStockTarget, {
        start: [settingsObj.filter.stock.min || 1, settingsObj.filter.stock.max || 20],
        connect: true,
        step: 1,
        range: {
            'min': 1,
            'max': 15
        },
        tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0})]
      });
      stockSlider.on('change', rangeSliderChangeCBStock);
    }


    (filters as HTMLElement).addEventListener('click', onFilterChanged);

    window.addEventListener('load', addWindowOnLoad);

    searchField?.addEventListener('keyup', searchFieldCB);

    clearButton?.addEventListener('click', clearValueCB);

    resetFiltersButton?.addEventListener('click', resetFiltersCB);

    resetSettingsButton?.addEventListener('click', resetSettingsCB);

    cardsWrapper?.addEventListener('click', onItemAddedToCart)

    sortingButtonsWrapper?.addEventListener('click', handleSortMethodChange);
  }

}