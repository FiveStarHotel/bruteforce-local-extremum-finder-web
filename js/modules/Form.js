import functions from "./functions.js";

class Form {
  #formElement;

  #functionSelect;

  constructor() {
    this.#formElement = document.querySelector("#functionConfigForm");

    this.#functionSelect = document.querySelector("#configFunctionSelect");
    this.#fillFunctionSelect(functions);

    this.#formElement.addEventListener("submit", this.#onSubmit);
  }

  #fillFunctionSelect = (functionsObject) => {
    this.#functionSelect.innerHTML = "";

    functionsObject.forEach((element, index) => {
      this.#functionSelect.insertAdjacentHTML("beforeend", `<option value="${index}">${element.label}</option>`)
    })
  }

  #onSubmit = (e) => {
    e.preventDefault();

    const options = this.#unpackForm(this.#formElement);

    console.log(options);
  }

  #unpackForm = (formElement) => {
    const formData = new FormData(formElement);

    return {
      functionId: formData.get("function"),
      accuracy: formData.get("accuracy"),
      intervalFrom: formData.get("intervalStart"),
      intervalTo: formData.get("intervalEnd"),
      type: formData.get("extremumType"),
      latency: formData.get("latency"),
    }
  }
}

export default Form;