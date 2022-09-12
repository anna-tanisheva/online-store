import { ISettingsObj } from "../../typings/types";


export const settingsObj: ISettingsObj<number, string> = {
  'sort': null,
  'filter': {
    'year': {
      'min': null,
      'max': null
    },
    'stock': {
      'min': null,
      'max': null
    },
  },
  'color': null,
  'produced': null,
  'popular': null,
  'type': null,
  'memory': null,
  'searchValue': null
}

export function getSettingsFromStorage(localStorage: Storage): void {

  const storage = localStorage;
  if (storage.produced) {
    settingsObj.produced = new Set (JSON.parse(storage.produced))
  }
  if (storage.color) {
    settingsObj.color = new Set (JSON.parse(storage.color));
  }
  if (storage.memory) {
    settingsObj.memory = new Set (JSON.parse(storage.memory))
  }
  if (storage.popular) {
    settingsObj.popular = new Set (JSON.parse(storage.popular))
  }
  if (storage.type) {
    settingsObj.type = new Set (JSON.parse(storage.type))

  }
  if (storage.sort) {
    settingsObj.sort = storage.sort
  }
  if (storage.year) {
    settingsObj.filter.year = JSON.parse(storage.year)
  }
  if (storage.stock) {
    settingsObj.filter.stock = JSON.parse(storage.stock)
  }

}
