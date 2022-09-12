import { settingsObj } from "../controller/make-settings";
import { settingsStorage } from "../app/app";
import { SortOrder, FilterTypes, ItemsInCart } from "../../typings/types";
import * as noUiSlider from 'nouislider';


export let itemsInCart: ItemsInCart = {'length': 0};


const CART_SIZE = 20;

export function setCheckbox(prop: string, storage: Storage): void {
  const inputs = document.querySelectorAll(`input[name="${prop}"]`);
  inputs.forEach(input => {
    JSON.parse(storage[prop]).forEach((property: string) => {
      if (property === input.getAttribute('value')?.toLowerCase()) {
        (input as HTMLInputElement).checked = true;
      }
    })
  })
}

export function sortProductCards (prop: string, setting: number): void {
  const list = document.querySelector('.cards-container');
  const fragment = document.createDocumentFragment();
  [...(list as HTMLElement).children]
  .sort((a, b): number => {
    let propA, propB;
    if (prop === 'year') {
      propA = Number(a.getAttribute(`data-${'year'}`));
      propB = Number(b.getAttribute(`data-${'year'}`));
    } else {
      propA = a.getAttribute(`data-${prop}`);
      propB = b.getAttribute(`data-${prop}`);
    }
    if (((propA as number)) > ((propB as number))) {
        return setting === SortOrder['alphabetic-ascending'] || setting === SortOrder['year-ascending'] ? 1 : -1;
      } else if ((propA as number) < (propB as number)) {
        return setting === SortOrder['alphabetic-ascending'] || setting === SortOrder['year-ascending'] ? -1 : 1;
      } else {
        return 0;
      }
    }).forEach(node => fragment.append(node));
    list?.append(fragment);
}

export function filterProducts(): void {

  const list = document.querySelector('.cards-container');

  if(settingsObj.sort) {
    if (Number(settingsObj.sort) === SortOrder['alphabetic-descending'] || Number(settingsObj.sort) === SortOrder['alphabetic-ascending']) {
      sortProductCards('model', Number(settingsObj.sort));
    } else if ((Number(settingsObj.sort) === SortOrder['year-descending'] || Number(settingsObj.sort) === SortOrder['year-ascending'])) {
      sortProductCards('year', Number(settingsObj.sort));
    }
  } else {
    sortProductCards('id', 1);
  }

  const filtered = [...(list as HTMLElement).children].filter(el => {
      const dataSet = (el as HTMLElement).dataset;

      if (dataSet.popular === 'true') {
        dataSet.popular = 'true'
      } else {
        dataSet.popular = 'false'
      }

      //main sort

      if (
        (settingsObj.color === null || settingsObj.color.size === 0 || settingsObj.color.has(dataSet.color?.toLowerCase() as string)) &&
        (settingsObj.produced === null || settingsObj.produced.size === 0 || settingsObj.produced.has(dataSet.produced?.toLowerCase() as string)) &&
        (settingsObj.popular === null || settingsObj.popular.size === 0 || settingsObj.popular.has((dataSet.popular as string))) &&
        (settingsObj.type === null || settingsObj.type.size === 0 || settingsObj.type.has(dataSet.type?.toLowerCase() as string)) &&
        (settingsObj.memory === null || settingsObj.memory.size === 0 || settingsObj.memory.has(dataSet.memory as string)) &&
        (settingsObj.filter.year.min === null || Number(dataSet.year as string) >= Number(settingsObj.filter.year.min as number) && Number(dataSet.year as string) <= Number(settingsObj.filter.year.max as number)) &&
        (settingsObj.filter.stock.min === null || Number(dataSet.stock as string) >= Number(settingsObj.filter.stock.min as number) && Number(dataSet.stock as string) <= Number(settingsObj.filter.stock.max as number)) &&
        (!settingsStorage.searchValue || settingsStorage.searchValue.length === 0 || (dataSet.model?.toLowerCase())?.indexOf(settingsStorage.searchValue.toLowerCase()) !== -1)) {
        el.classList.remove('hidden');
        return 1
      } else {
        el.classList.add('hidden');
        return 0
      }
  })
  if (filtered.length === 0) {
    document.querySelector('.no-items-popup')?.classList.remove('hidden-popup');
  } else {
    document.querySelector('.no-items-popup')?.classList.add('hidden-popup');
  }
}

export function handleSortMethodChange (e: Event): void {
  if ((e.target as HTMLButtonElement).nodeName !== 'BUTTON') return;
  const buttonPurpose = (e.target as HTMLButtonElement).getAttribute('data-purpose');
  const buttons = document.querySelectorAll('.sort-button');
  buttons.forEach(elem => {
    elem.classList.remove('chosen');
  });
  (e.target as HTMLButtonElement).classList.add('chosen');
  switch (buttonPurpose) {
    case 'alphabetic-ascending':
      settingsObj.sort = 1;
      break;
    case 'alphabetic-descending':
      settingsObj.sort = 2;
      break;
    case 'year-descending':
      settingsObj.sort = 4;
      break;
    case 'year-ascending':
      settingsObj.sort = 3;
      break;
  }
  settingsStorage.setItem('sort', String(settingsObj.sort));
  filterProducts();
}

export function rangeSliderChangeCBYear (e: (string | number)[]): void {
  const [min, max] = e;

  settingsObj.filter.year.min = Number(min);
  settingsObj.filter.year.max = Number(max);

  settingsStorage.setItem('year', JSON.stringify({
    'min': min,
    'max': max
  }));
  filterProducts()
}

export function rangeSliderChangeCBStock (e: (string | number)[]): void {
  const [min, max] = e;

  settingsObj.filter.stock.min = Number(min);
  settingsObj.filter.stock.max = Number(max);

  settingsStorage.setItem('stock', JSON.stringify({
    'min': min,
    'max': max
  }));
  filterProducts()
}

export function onFilterChanged(e: Event): void {
  if (((e.target as HTMLElement).tagName !== 'INPUT')) return;
    const filterName: string = (e.target as HTMLInputElement).name;
    const filterValue: string = (e.target as HTMLInputElement).value;

    if((e.target as HTMLInputElement).checked) {
      switch (filterName) {
        case FilterTypes[1]:
          if (settingsObj.color === null) {
            settingsObj.color = new Set;
            settingsObj.color.add(filterValue);
          } else {
            settingsObj.color.add(filterValue);
          }
          break;
        case FilterTypes[2]:
          if (settingsObj.produced === null) {
            settingsObj.produced = new Set;
            settingsObj.produced.add(filterValue);
          } else {
            settingsObj.produced.add(filterValue);
          }
          break;
        case FilterTypes[3]:
          if (settingsObj.popular === null) {
            settingsObj.popular = new Set;
            settingsObj.popular.add('true');
          } else {
            settingsObj.popular.add('true');
          }
          break;
        case FilterTypes[4]:
          if (settingsObj.type === null) {
            settingsObj.type = new Set;
            settingsObj.type.add(filterValue);
          } else {
            settingsObj.type.add(filterValue);
          }
          break;
        case FilterTypes[5]:
          if (settingsObj.memory === null) {
            settingsObj.memory = new Set;
            settingsObj.memory.add(filterValue);
          } else {
            settingsObj.memory.add(filterValue);
          }
          break;
      }
    } else {
      switch (filterName) {
        case FilterTypes[1]:
          (settingsObj.color as Set<string>).delete(filterValue);
          break;
        case FilterTypes[2]:
          (settingsObj.produced as Set<string>).delete(filterValue)
          break;
        case FilterTypes[3]:
          (settingsObj.popular as Set<string>).delete(filterValue);
          break;
        case FilterTypes[4]:
          (settingsObj.type as Set<string>).delete(filterValue);
          break;
        case FilterTypes[5]:
          (settingsObj.memory as Set<string>).delete(filterValue);
          break;
      }
    }
    const set = settingsObj[(filterName as keyof typeof settingsObj)];
    settingsStorage.setItem(filterName, JSON.stringify([...set as Set<string>]));
    filterProducts()
}

export function searchFieldCB(e: Event): void {
  const value = (e.target as HTMLInputElement).value;
  if (value) {
    settingsObj.searchValue = value;
    settingsStorage.setItem('searchValue', value);
  } else {
    settingsObj.searchValue = '';
    settingsStorage.setItem('searchValue', '');
  }
  filterProducts();
}

export function clearValueCB(e: Event): void {
  if ((e.target as HTMLElement).classList.contains('clear-icon')) {
    settingsObj.searchValue = '';
    settingsStorage.setItem('searchValue', '');
  }
  filterProducts()
}

export function loadCartCB(): void {
  const storage = window.localStorage;
  const cards = document.querySelectorAll('.card');
  const cartCounter = document.querySelector('.cart-counter');
  if (storage.itemsInCart) {
    itemsInCart = JSON.parse(storage.itemsInCart)
  }

  if (itemsInCart.length === CART_SIZE) {
      document.querySelector('.no-slots-popup')?.classList.remove('hidden-popup');
  }

  cards.forEach(card => {
    const cartHasDataId = Object.prototype.hasOwnProperty.call(itemsInCart, ((card as HTMLElement).getAttribute('data-id') as string));
    if(cartHasDataId) {
      card.classList.add('in-cart');
      card.querySelector('.remove-from-cart')?.removeAttribute('disabled');
    }
  });
  (cartCounter as HTMLElement).textContent = String(itemsInCart.length);
}

export function makeControlPanelCB(): void {
  const storage = settingsStorage;
  const filterTypes = [FilterTypes[1], FilterTypes[2], FilterTypes[3], FilterTypes[4], FilterTypes[5]];

  filterTypes.forEach((filterKey) => {
    if (storage[filterKey]) {
      setCheckbox(filterKey, storage)
    }
  })

  if (storage.sort) {
    const sortButton = document.querySelector(`[data-purpose=${SortOrder[storage.sort]}]`);
    (sortButton as HTMLButtonElement).classList.add('chosen');
  }
  if (storage.searchValue) {
    const searchField = document.querySelector('.search-field');
    (searchField as HTMLInputElement).value = storage.searchValue;
  }
}

export function resetFiltersCB(): void {
  const inputs = document.querySelectorAll(`input[type="checkbox"]`);
  const sliderYear = document.querySelector('#slider-year');
  const sliderStock = document.querySelector('#slider-on-stock');
  const searchField = document.querySelector('.search-field');

  settingsObj.filter = {
    'year': {
      'min': null,
      'max': null
    },
    'stock': {
      'min': null,
      'max': null
    },
  };
  settingsStorage.removeItem('year');
  settingsStorage.removeItem('stock');


  settingsObj.color = null;
  settingsStorage.removeItem('color');

  settingsObj.produced = null;
  settingsStorage.removeItem('produced');

  settingsObj.popular = null;
  settingsStorage.removeItem('popular');

  settingsObj.type = null;
  settingsStorage.removeItem('type');

  settingsObj.memory = null;
  settingsStorage.removeItem('memory');

  settingsObj.searchValue = null;
  settingsStorage.removeItem('searchValue');

  filterProducts();
  inputs.forEach(input => {
    (input as HTMLInputElement).checked = false;
  });
  (sliderYear as noUiSlider.target).noUiSlider?.set([2007, 2022]);
  (sliderStock as noUiSlider.target).noUiSlider?.set([1, 15]);

  (searchField as HTMLInputElement).value = '';
}

export function resetSettingsCB(): void {
    settingsStorage.removeItem('sort');
    settingsStorage.removeItem('year');
    settingsStorage.removeItem('stock');
    settingsStorage.removeItem('color');
    settingsStorage.removeItem('produced');
    settingsStorage.removeItem('popular');
    settingsStorage.removeItem('type');
    settingsStorage.removeItem('memory');
    settingsStorage.removeItem('searchValue');
    settingsStorage.removeItem('itemsInCart');
    location.reload();
}

export function onItemAddedToCart(e: Event): void {
  const cart = document.querySelector('.cart');
  const cartCounter = cart?.querySelector('.cart-counter');
  if (!(e.target as HTMLElement).closest('.card')) return;
  const elem = ((e.target as HTMLElement).closest(`div[data-id]`) as HTMLElement);
  const itemId = ((e.target as HTMLElement).closest(`div[data-id]`) as HTMLElement).getAttribute('data-id');
  const cartHasItemId = Object.prototype.hasOwnProperty.call(itemsInCart, (itemId as string));

  if (!(e.target as HTMLElement).classList.contains('remove-from-cart')) {
    if (itemsInCart.length === CART_SIZE - 1) {
      document.querySelector('.no-slots-popup')?.classList.remove('hidden-popup')
    }
    if (!cartHasItemId) {
      if (itemsInCart.length < CART_SIZE) {
        (elem as HTMLElement).classList.toggle('in-cart');
        const removeButton = (elem as HTMLElement).querySelector('.remove-from-cart');
        (removeButton as HTMLElement).removeAttribute('disabled');
        itemsInCart[itemId as keyof typeof itemsInCart] = 1;
        itemsInCart.length += 1;
        (cartCounter as HTMLElement).textContent = String(itemsInCart.length);
        settingsStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
      } else {
        return
      }
    } else {
      if (itemsInCart.length < CART_SIZE) {
        itemsInCart[itemId as keyof typeof itemsInCart] += 1;
        itemsInCart.length += 1;
        (cartCounter as HTMLElement).textContent = String(itemsInCart.length);
        settingsStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
      } else {
        return
      }
    }
  } else {
    if(itemsInCart.length === CART_SIZE) {
      document.querySelector('.no-slots-popup')?.classList.add('hidden-popup')
    }
    if (!cartHasItemId) {
      return
    } else {
      if (itemsInCart[itemId as keyof typeof itemsInCart] === 1) {
        (elem as HTMLElement).classList.toggle('in-cart');
        (e.target as HTMLElement).setAttribute('disabled', 'true');
        itemsInCart[itemId as keyof typeof itemsInCart] -= 1;
        delete itemsInCart[itemId as keyof typeof itemsInCart]
        itemsInCart.length -= 1;
        (cartCounter as HTMLElement).textContent = String(itemsInCart.length)
        settingsStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
      } else {
        itemsInCart[itemId as keyof typeof itemsInCart] -= 1;
        itemsInCart.length -= 1;
        (cartCounter as HTMLElement).textContent = String(itemsInCart.length);
        settingsStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
      }
    }
  }

}

