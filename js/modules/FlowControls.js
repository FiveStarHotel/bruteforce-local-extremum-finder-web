class FlowControls {
  #flowController;

  #pauseButton;
  #pauseButtonIcon;

  #stopButton;

  #lockableElements;

  constructor(flowController) {
    this.#flowController = flowController;

    this.#pauseButton = document.querySelector("#flowPause");
    this.#pauseButtonIcon = this.#pauseButton.querySelector(".flow-controls__button-icon");

    this.#stopButton = document.querySelector("#flowStop");

    this.#lockableElements = [this.#pauseButton, this.#stopButton];

    this.#pauseButton.addEventListener("click", this.#onPauseClick);
    this.#stopButton.addEventListener("click", this.#onStopClick);
  }

  lock = () => {
    this.#lockableElements.forEach(el => el.setAttribute("disabled", true));
  }

  unlock = () => {
    this.#lockableElements.forEach(el => el.removeAttribute("disabled"));
  }

  #onPauseClick = () => {
    switch (this.#flowController.isPause()) {
      case true:
        this.#unpause();
        break;
      case false:
        this.#pause();
        break;
      default:
        throw new Error("Something strange is happening here!!!");
    }
  }

  #pause = () => {
    this.#flowController.pause();

    this.#pauseButton.classList.remove("flow-controls__button_continue");
    this.#pauseButton.classList.add("flow-controls__button_pause");
    this.#pauseButton.title = "Продолжить";

    this.#pauseButtonIcon.src = "./icons/play.svg";
    this.#pauseButtonIcon.alt = "continue";
  }

  #unpause = () => {
    this.#flowController.unpause();

    this.#pauseButton.classList.remove("flow-controls__button_pause")
    this.#pauseButton.classList.add("flow-controls__button_continue")
    this.#pauseButton.title = "Поставить на паузу";

    this.#pauseButtonIcon.src = "./icons/pause.svg";
    this.#pauseButtonIcon.alt = "pause";
  }

  #onStopClick = () => {
    this.#stop();
  }

  #stop = () => {
    this.#flowController.stop();
    this.#unpause();
  }

  restart = () => {
    this.#unpause();
  }
}

export default FlowControls;