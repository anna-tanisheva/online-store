/**
 * @jest-environment jsdom
 */

/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const realStorage = global.localStorage;

const localStorageMock = {
  'color': `["test-color"]`,

  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn()
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

jest.spyOn(Storage.prototype, 'removeItem');

delete window.location;
window.location = { reload: jest.fn() };

const loadMock = new CustomEvent('loadMock');
Object.defineProperty(loadMock, 'currentTarget', {writable: false, value: Window});

const keyUpMock = new CustomEvent('keyUpMock');

beforeEach(() => {
  document.body.innerHTML =
  `<section class="control-panel"><div class="control-panel-wrapper">
      <div class="filters-wrapper">
        <div id="filters-color" class="color filter">
          <label>
            <input type="checkbox" name="color" value="test-color" class="filter-field"><span class="filter-label">test-color</span>
          </label>
        </div>
      </div>
  </section>`+
  '<form>' +
  '  <input type="search" class="search-field">Test</input type>' +
  '  <button type="reset" class="clear-icon" />' +
  '</form>' +
  `<div class="cards-container"><div data-year="2"></div><div data-year="1" data-color="test-color"></div>
  </div>` +
  '<button class="sort"/>'+
  '<button class="reset-settings"/>'+
  '<button class="reset-filters"/>' +
  `<div class="card" data-id="3" data-model="Samsung Galaxy A52" data-type="Smartphone" data-produced="Samsung" data-stock="15" data-year="2021" data-price="895" data-color="Blue" data-memory="256" data-popular="true">
      <div class="card-wrapper">
        <p class="item-name">MODEL: Samsung Galaxy A52</p>
        <div class="buttons-wrapper">
          <button class="add-to-cart button">Add to The Cart</button>
          <button class="remove-from-cart button" disabled="">Remove From Cart</button>
        </div>
      </div>
  </div>`
});

afterAll(()=>{
  global.localStorage = realStorage;
})

test('Clears search-field value after click on clear button', () => {
  const clearButton = document.querySelector('.clear-icon');
  const input = document.querySelector('.search-field');

  clearButton.click();

  expect(input.value).toEqual('');
});

test ('Sorts nodes in card container with function sortNodes', () => {
  const { sortNodes } = require('../components/callbacks/callbacks');
  const sortButton = document.querySelector('.sort');
  const sortContainer = document.querySelector('.cards-container');
  const yearAscendingOrder = 3;
  const firstChild = sortContainer.querySelector('div[data-year="1"]');
  const secondChild = sortContainer.querySelector('div[data-year="2"]');

  function sortCB () {
    sortNodes('year', yearAscendingOrder);
  }
  sortButton.addEventListener('click', sortCB);

  sortButton.click();

  expect(sortContainer.querySelector('div:nth-child(1)')).toEqual(firstChild)
  expect(sortContainer.querySelector('div:nth-child(2)')).toEqual(secondChild)
})

test ('Button reset-settings removes local-storage fields', () => {
  const { resetSettingsCB } = require('../components/callbacks/callbacks');
  const resetSettingsButton = document.querySelector('.reset-settings');

  resetSettingsButton.addEventListener('click', resetSettingsCB);
  resetSettingsButton.click();

  expect(localStorage.removeItem).toHaveBeenCalled();
})

test ('Function makes settings from local storage', () => {
  const { settingsObj, makeSettingsFromStorage } = require('../components/controller/make-settings');
  const testedProperty = new Set (JSON.parse(localStorage.color))
  makeSettingsFromStorage(localStorage);

  expect(settingsObj.color).toEqual(testedProperty);
})

test ('Function setCheckbox sets up filters', () => {
  const { setCheckbox } = require('../components/callbacks/callbacks');
  const testCheckBox = document.querySelector('input[name="color"]');
  setCheckbox('color', localStorage);

  expect(testCheckBox.checked).toEqual(true);
})

test ('Callback sets up check box with local storage on load event', () => {
  const { makeControlPanelCB } = require('../components/callbacks/callbacks');
  const testCheckBox = document.querySelector('input[name="color"]');

  window.addEventListener('loadMock', makeControlPanelCB);
  window.dispatchEvent(loadMock);

  expect(testCheckBox.checked).toEqual(true);
})

test ('Function filterPanelCB filters nodes', () => {
  const { filterPanelCB } = require('../components/callbacks/callbacks');
  const sortContainer = document.querySelector('.cards-container');
  const hiddenElement = sortContainer.querySelector('div[data-year="2"]');
  const visibleElement = sortContainer.querySelector('div[data-color="test-color"]');

  const { makeSettingsFromStorage } = require('../components/controller/make-settings');
  makeSettingsFromStorage(localStorage);
  filterPanelCB();

  expect(hiddenElement.classList.contains('hidden')).toBe(true);
  expect(visibleElement.classList.contains('hidden')).toBe(false);

})

test ('Function searchFieldCB sets up settingObj and localStorage field', () => {
  const { searchFieldCB } = require('../components/callbacks/callbacks');
  const { settingsObj } = require('../components/controller/make-settings');
  const target = document.querySelector('.search-field');
  target.value = 'Test';

  target.addEventListener('keyUpMock', searchFieldCB);
  target.dispatchEvent(keyUpMock);

  expect(settingsObj.searchValue).toEqual('Test');
  expect(localStorage.searchValue).toEqual('Test');
})

test ('Window Load event filterPanelCB', () => {
  const { filterPanelCB } = require('../components/callbacks/callbacks');
  const sortContainer = document.querySelector('.cards-container');
  const hiddenElement = sortContainer.querySelector('div[data-year="2"]');
  const visibleElement = sortContainer.querySelector('div[data-color="test-color"]');
  window.addEventListener('loadMock', filterPanelCB);
  window.dispatchEvent(loadMock);

  expect(hiddenElement.classList.contains('hidden')).toBe(true);
  expect(visibleElement.classList.contains('hidden')).toBe(false);
})

test ('Click on the card adds item to cart', () => {
  const {itemsInCart} = require('../components/callbacks/callbacks');
  const card = document.querySelector('.card');
  const cartLengthBefore = itemsInCart.length;

  const cartCBMock = function () {
    const itemId = card.getAttribute('data-id');
    card.classList.toggle('in-cart');
    itemsInCart[itemId] = 1;
    itemsInCart.length += 1;
  }

  card.addEventListener('click', cartCBMock);
  card.click();

  expect(itemsInCart.length).toEqual(cartLengthBefore + 1);
  expect(Object.keys(itemsInCart).includes("3")).toEqual(true);
})

test ('Click on the card sets local-storage property', () => {
  const {itemsInCart} = require('../components/callbacks/callbacks');
  const card = document.querySelector('.card');

  const cartCBMock = function () {
    const itemId = card.getAttribute('data-id');
    card.classList.toggle('in-cart');
    itemsInCart[itemId] = 1;
    itemsInCart.length += 1;
    localStorage.itemsInCart = JSON.stringify(itemsInCart);
  }

  card.addEventListener('click', cartCBMock);
  card.click();

  expect(localStorageMock.itemsInCart).toEqual(JSON.stringify(itemsInCart));
})