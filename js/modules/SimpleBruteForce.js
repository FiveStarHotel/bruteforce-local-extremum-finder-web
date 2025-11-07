class SimpleBruteForce {
  static findLocalExtremum = (
  {
  func,
  accuracy,
  intervalFrom: start,
  intervalTo: end,
  type,
  latency
  }, logFunction) => {
    if (end <= start) {
      throw new Error("Точка начала должна быть меньше точки конца!");
    }

    if (accuracy <= 0) {
      throw new Error("Точность должна быть положительной!");
    }

    if (!["min", "max"].includes(type)) {
      throw new Error("Неверно указан тип экстремума!");
    }

    if (latency < 0) {
      throw new Error("Задержка между операциями должна быть положительной!");
    }

    // Algorithm's constants
    const INTERMEDIATE_POINTS_AMOUNT = 20;

    // Constants for output
    const NUMBERS_AMOUNT_AFTER_DECIMAL_POINT_SMALL = 2;
    const NUMBERS_AMOUNT_AFTER_DECIMAL_POINT_BIG = 3;

    const actions = {
      min: {
        compare: (current, next) => current < next,
        extremumWord: "минимум",
      },

      max: {
        compare: (current, next) => current > next,
        extremumWord: "максимум",
      },
    }

    let leftBound = start;
    let rightBound = end;

    let currentX = leftBound;

    let step = (rightBound - leftBound) / INTERMEDIATE_POINTS_AMOUNT;
    logFunction(`Шаг равен <b>${step}</b>`, "stepChanged");

    let isEndOfAccuracy = true;

    let iterationCount = 0;

    let outputCurrentX, outputNextX, outputCurrentFunctionValue, outputNextFunctionValue, outputLeftBound, outputRightBound, outputStep;
    while (rightBound - leftBound > accuracy) {
      // Strings to output
      outputCurrentX = currentX.toFixed(NUMBERS_AMOUNT_AFTER_DECIMAL_POINT_SMALL);
      outputNextX = (currentX + step).toFixed(NUMBERS_AMOUNT_AFTER_DECIMAL_POINT_SMALL);

      outputCurrentFunctionValue = func(currentX).toFixed(NUMBERS_AMOUNT_AFTER_DECIMAL_POINT_BIG);
      outputNextFunctionValue = func(currentX + step).toFixed(NUMBERS_AMOUNT_AFTER_DECIMAL_POINT_BIG);

      outputLeftBound = leftBound.toFixed(NUMBERS_AMOUNT_AFTER_DECIMAL_POINT_SMALL);
      outputRightBound = rightBound.toFixed(NUMBERS_AMOUNT_AFTER_DECIMAL_POINT_SMALL);

      outputStep = step.toFixed(NUMBERS_AMOUNT_AFTER_DECIMAL_POINT_BIG);
      /////////////////////

      iterationCount++;

      // TODO: Сделать счетчик итераций
      logFunction(
        `Текущее значение <b>x = ${outputCurrentX}</b>, <b>f(${outputCurrentX}) = ${outputCurrentFunctionValue}</b>`,
        "message"
      )

      if (actions[type].compare(func(currentX), func(currentX + step))) {
        logFunction(
          `Локальный ${actions[type].extremumWord} находится между <b>f(${outputCurrentX}) = ${outputCurrentFunctionValue}</b> и <b>f(${outputNextX}) = ${outputNextFunctionValue}</b>`,
          "message"
        )

        if (currentX === start) {
          logFunction(
            `Локальный ${actions[type].extremumWord} был обнаружен в одном из концов промежутка в точке <b>x = ${outputCurrentX}</b>`,
            "endOfSearch"
          )

          isEndOfAccuracy = false;

          break;
        }

        leftBound = currentX;
        rightBound = currentX + step;

        logFunction(
          `Поиск в промежутке <b>[${outputLeftBound}, ${outputRightBound}]</b>`,
          "intervalChanged"
        )

        step = (rightBound - leftBound) / INTERMEDIATE_POINTS_AMOUNT;

        logFunction(
          `Шаг равен <b>${outputStep}</b>`,
          "stepChanged"
        )

        continue;
      }

      if (currentX >= end) {
        logFunction(
          `Локальный ${actions[type].extremumWord} был обнаружен на одном из концов промежутка в точке <b>x = ${outputCurrentX}</b>`,
          "endOfSearch"
        )

        isEndOfAccuracy = false;

        break;
      }

      currentX += step
    }

    if (isEndOfAccuracy) {
      logFunction(
        `Шаг = <b>${outputStep}</b> меншье заданной точности = <b>${accuracy}</b>. Поиск прекращен.`,
        "endOfSearch"
      )
    }

    logFunction(
      `Локальный ${actions[type].extremumWord} был найден в точке <b>f(${outputCurrentX}) = ${outputCurrentFunctionValue}</b> за ${iterationCount} итераций`,
      "finalExtremum"
    )
  }
}

export default SimpleBruteForce;