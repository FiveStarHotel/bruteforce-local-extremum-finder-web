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

    const format = {
      short: (value) => value.toFixed(NUMBERS_AMOUNT_AFTER_DECIMAL_POINT_SMALL),
      long: (value) => value.toFixed(NUMBERS_AMOUNT_AFTER_DECIMAL_POINT_BIG),
    };

    while (rightBound - leftBound > accuracy) {
      iterationCount++;

      // TODO: Сделать счетчик итераций
      logFunction(
        `Текущее значение <b>x = ${format.short(currentX)}</b>, <b>f(${format.short(currentX)}) = ${format.long(func(currentX))}</b>`,
        "message"
      )

      if (actions[type].compare(func(currentX), func(currentX + step))) {
        logFunction(
          `Локальный ${actions[type].extremumWord} находится между <b>f(${format.short(currentX)}) = ${format.long(func(currentX))}</b> и <b>f(${format.short(currentX + step)}) = ${format.long(func(currentX + step))}</b>`,
          "message"
        )

        if (currentX === start) {
          logFunction(
            `Локальный ${actions[type].extremumWord} был обнаружен в одном из концов промежутка в точке <b>x = ${format.short(currentX)}</b>`,
            "endOfSearch"
          )

          isEndOfAccuracy = false;

          break;
        }

        leftBound = currentX;
        rightBound = currentX + step;

        logFunction(
          `Поиск в промежутке <b>[${format.short(leftBound)}, ${format.short(rightBound)}]</b>`,
          "intervalChanged"
        )

        step = (rightBound - leftBound) / INTERMEDIATE_POINTS_AMOUNT;

        logFunction(
          `Шаг равен <b>${format.long(step)}</b>`,
          "stepChanged"
        )

        continue;
      }

      if (currentX >= end) {
        logFunction(
          `Локальный ${actions[type].extremumWord} был обнаружен на одном из концов промежутка в точке <b>x = ${format.short(currentX)}</b>`,
          "endOfSearch"
        )

        isEndOfAccuracy = false;

        break;
      }

      currentX += step
    }

    if (isEndOfAccuracy) {
      logFunction(
        `Шаг = <b>${format.long(step)}</b> меншье заданной точности = <b>${accuracy}</b>. Поиск прекращен.`,
        "endOfSearch"
      )
    }

    logFunction(
      `Локальный ${actions[type].extremumWord} был найден в точке <b>f(${format.short(currentX)}) = ${format.long(func(currentX))}</b> за ${iterationCount} итераций`,
      "finalExtremum"
    )
  }
}

export default SimpleBruteForce;