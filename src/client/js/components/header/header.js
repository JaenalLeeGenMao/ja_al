import { WebComponent } from "web-component";

@WebComponent("custom-header", {
  template: require("./header.html"),
  styles: require("client/assets/styles/header_styles.scss")
  // shadowDOM: true
})
export default class Header extends HTMLElement {
  constructor() {
    super();
    this._fname = null;
    this._lname = null;
    this._location = null;
    this._phone = null;
    this._rating = null; //this property is bind to element attribute becouse of observedAttributes
    this._review = null;
    this._follower = null;
    this._site = null;
  }

  static get observedAttributes() {
    return [
      "fname",
      "lname",
      "location",
      "phone",
      "site",
      "rating",
      "review",
      "follower"
    ];
  }

  // Only called for the who attributes due to observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    //this._who = newValue; this is handled by WebComponent decorator
    this._updateRendering();
  }

  connectedCallback() {
    if (!this.hasAttribute("rating")) {
      this.setAttribute("rating", 0);
    }
    if (!this.hasAttribute("review")) {
      this.setAttribute("review", 0);
    }
    if (!this.hasAttribute("follower")) {
      this.setAttribute("follower", 0);
    }
    this._updateRendering();
  }

  _updateRendering() {
    const locationIcon = `<svg id="location-outline" class="ionicon" viewBox="0 0 512 512" width="2rem" height="2rem"><path fill=#717e87 d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z" stroke-linecap="round" stroke-linejoin="round" class="ionicon-fill-none ionicon-stroke-width"></path><circle fill=#ffffff cx="256" cy="192" r="48" stroke-linecap="round" stroke-linejoin="round" class="ionicon-fill-none ionicon-stroke-width"></circle></svg>`;
    const callIcon = `<svg id="call-outline" class="ionicon" viewBox="0 0 512 512" width="2rem" height="2rem"><path fill=#717e87 d="M451 374c-15.88-16-54.34-39.35-73-48.76-24.3-12.24-26.3-13.24-45.4.95-12.74 9.47-21.21 17.93-36.12 14.75s-47.31-21.11-75.68-49.39-47.34-61.62-50.53-76.48 5.41-23.23 14.79-36c13.22-18 12.22-21 .92-45.3-8.81-18.9-32.84-57-48.9-72.8C119.9 44 119.9 47 108.83 51.6A160.15 160.15 0 0083 65.37C67 76 58.12 84.83 51.91 98.1s-9 44.38 23.07 102.64 54.57 88.05 101.14 134.49S258.5 406.64 310.85 436c64.76 36.27 89.6 29.2 102.91 23s22.18-15 32.83-31a159.09 159.09 0 0013.8-25.8C465 391.17 468 391.17 451 374z" stroke-miterlimit="10" class="ionicon-fill-none ionicon-stroke-width"></path></svg>`;
    const plusIcon = `<svg id="add-circle-sharp" class="ionicon" viewBox="0 0 512 512" width="3rem" height="3rem"><path fill=#717e87 d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm96 224h-80v80h-32v-80h-80v-32h80v-80h32v80h80z"></path></svg>`;

    $("#profile_name").html(`${this._fname} ${this._lname}`);
    $("#profile_phone").html(`${callIcon} <p>${this._phone}</p>`);
    $("#profile_location").html(`${locationIcon} <p>${this._location}</p>`);

    $("#profile_rating").attr("rating", this._rating);
    $("#profile_rating").attr("size", "2.4rem");

    $("#profile_review").html(
      this._review > 1
        ? `${this._review}<p>Reviews</p>`
        : `${this._review}<p>Review</p>`
    );
    $("#profile_follower").html(
      this._follower > 1
        ? `${plusIcon} ${this._follower}<p>Followers</p>`
        : `${plusIcon} ${this._follower}<p>Follower</p>`
    );
  }
}
