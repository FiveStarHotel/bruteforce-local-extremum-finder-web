import functions from "./functions.js";
import SimpleBruteForce from "./SimpleBruteForce.js";

class Form {
  #formElement;

  #functionSelect;

  #outputObject;

  constructor(outputObject) {
    this.#outputObject = outputObject;

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

    this.#outputObject.clearOutput();

    SimpleBruteForce.findLocalExtremum(
      {
        func: functions[options.functionId].func,
        ...options
      },
      this.#outputObject.log
    )
  }

  #unpackForm = (formElement) => {
    const formData = new FormData(formElement);

    return {
      functionId: Number(formData.get("function")),
      accuracy: Number(formData.get("accuracy")),
      intervalFrom: Number(formData.get("intervalStart")),
      intervalTo: Number(formData.get("intervalEnd")),
      type: formData.get("extremumType"),
      latency: Number(formData.get("latency")),
    }
  }
}

export default Form;