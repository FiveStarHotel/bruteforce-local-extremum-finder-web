class Output {
  #elementOutput;
  #buttonClearOutput;


  constructor() {
      this.#elementOutput = document.querySelector("#outputContainer");
      this.#buttonClearOutput = document.querySelector("#outputClearButton");

      this.clearOutput();

      this.#buttonClearOutput.addEventListener("click", this.clearOutput);
  }

  clearOutput = () => {
    this.#elementOutput.innerHTML = "";
  }

  log = (messageHTML, messageType) => {
    const messageElement = document.createElement("div");
    messageElement.className = "output__message-container";
    messageElement.setAttribute("data-type", messageType);

    messageElement.insertAdjacentHTML("afterbegin",
      `<span>${this.#messageTypes[messageType].prefix}</span>`
    )

    messageElement.insertAdjacentHTML("beforeend",
      `${messageHTML}`
    )

    this.#elementOutput.prepend(messageElement);
  }

  #messageTypes = {
    message: {
      className: "message",
      prefix: "[Сообщение]: ",
    },
    error: {
      className: "error",
      prefix: "[ОШИБКА]: ",
    },
    unknown: {
      className: "unknown",
      prefix: "",
    },
    stepChanged: {
      className: "stepChanged",
      prefix: "[Изменение шага]: ",
    },
    endOfSearch: {
      className: "endOfSearch",
      prefix: "[Конец поиска]: ",
    },
    intervalChanged: {
      className: "intervalChanged",
      prefix: "[Изменение интервала]: ",
    },
    finalExtremum: {
      className: "finalExtremum",
      prefix: "[НАЙДЕННЫЙ ЭКСТРЕМУМ]: ",
    },
  }
}

export default Output;