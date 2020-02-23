import { WebComponent } from "web-component";
import _get from "lodash/get";

@WebComponent("custom-input", {
  template: require("./input.html"),
  styles: require("client/assets/styles/input_styles.scss")
  // shadowDOM: true
})
export default class Input extends HTMLElement {
  constructor() {
    super();
    this._name = null;
    this._value = null;
  }

  static get observedAttributes() {
    return ["name", "value"];
  }

  // Only called for the who attributes due to observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    //this._who = newValue; this is handled by WebComponent decorator
    this._updateRendering();
  }

  connectedCallback() {
    const inputRef = $(this).find("div.input__wrapper")[0];
    $(inputRef).html(`
      <div>
      <label>${this._name}</label>
      <input type="text" name=${this._name} value="${this._value}" />
      </div>
    `);
    this._updateRendering();
  }

  _updateInputChange = value => {
    const inputRef = $(this).find("div.input__wrapper")[0];
    $(inputRef).html(`
      <div>
        <label>${this._name}</label>
        <input type="text" name=${this._name} value="${value}" />
      </div>
    `);
  };

  _updateRendering() {
    const inputRef = $(this).find("div.input__wrapper")[0];
    $(inputRef).html(`
      <div>
        <label>${this._name}</label>
        <input type="text" name=${this._name} value="${this._value}" />
      </div>
    `);

    $(inputRef).change(e => {
      const value = _get(e, "target.value", "");
      if (value.trim().length > 0) {
        this._updateInputChange(value);
      } else {
        this._updateInputChange(this._value);
      }
    });
  }
}
