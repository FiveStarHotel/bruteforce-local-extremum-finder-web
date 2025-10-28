import functions from "./functions.js";

class Form {
  #form;

  #functionSelect;

  constructor() {
    this.#form = document.querySelector("#functionConfigForm");

    this.#functionSelect = document.querySelector("#configFunctionSelect");
    this.#fillFunctionSelect(functions);
  }

  #fillFunctionSelect(functionsObject) {
    this.#functionSelect.innerHTML = "";

    functionsObject.forEach((element, index) => {
      this.#functionSelect.insertAdjacentHTML("beforeend", `<option value="${index}">${element.label}</option>`)
    })
  }
}

export default Form;