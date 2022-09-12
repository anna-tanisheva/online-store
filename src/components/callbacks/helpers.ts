import { filterProducts, makeControlPanelCB, loadCartCB } from './callbacks';

export function addWindowOnLoad() {
  filterProducts();
  makeControlPanelCB();
  loadCartCB();
}