import './popup.scss';

export class Popup <T> {

  public template: string;

  private message: T;

  private htmlClass: string;

  constructor (message: T, htmlClass:string) {

    this.message = message;
    this.htmlClass = htmlClass;
    this.template = `<h3 class="${htmlClass}">${this.message}</h3>`
  }

}