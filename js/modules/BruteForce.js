import Utils from "./Utils.js";

class BruteForce {
  static findLocalExtremum = async function (
    func,
    start,
    end,
    accuracy,
    type,
    latency,
    logFunction,
    flowController
  ) {
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
      throw new Error(
        "Задержка между операциями должна быть положительным числом!"
      );
    }

    const INTERMEDIATE_POINTS_AMOUNT = 20;

    const actions = {
      min: {
        compare: (current, next) => current < next,
        extremumWord: "минимум",
      },

      max: {
        compare: (current, next) => current > next,
        extremumWord: "максимум",
      },
    };

    let leftBound = start;
    let rightBound = end;

    let currentX = leftBound;

    let step = (rightBound - leftBound) / INTERMEDIATE_POINTS_AMOUNT;
    logFunction(`Шаг равен ${step}`, "stepChanged");

    let isEndOfAccuracy = true;

    let iterationCount = 0;

    while (rightBound - leftBound > accuracy) {
      if (flowController && flowController.isTerminated) {
        flowController.toggleTerminate();
        throw new Error("Выполнение прервано пользователем!");
      }

      while (flowController && flowController.isPaused) {
        await Utils.wait(100);
        if (flowController && flowController.isTerminated) {
          flowController.toggleTerminate();
          throw new Error("Выполнение прервано пользователем!");
        }
      }

      iterationCount++;

      await Utils.wait(latency);

      logFunction(
        `Текущее значение x = ${currentX.toFixed(
          3
        )}, значение в этой функции = ${func(currentX).toFixed(
          4
        )}, итерация: ${iterationCount}`,
        "message"
      );

      if (actions[type].compare(func(currentX), func(currentX + step))) {
        logFunction(
          `Локальный ${
            actions[type].extremumWord
          } находится между f(${currentX.toFixed(3)}) = ${func(
            currentX
          ).toFixed(4)} и f(${(currentX + step).toFixed(3)}) = ${func(
            currentX + step
          ).toFixed(4)}`,
          "message"
        );

        if (currentX === start) {
          logFunction(
            `Локальный ${
              actions[type].extremumWord
            } был обнаружен на одном из концов промежутка в точке x = ${currentX.toFixed(
              3
            )}.`,
            "endOfSearch"
          );

          isEndOfAccuracy = false;

          break;
        }

        leftBound = currentX;
        rightBound = currentX + step;
        logFunction(
          `Поиск в промежутке [${leftBound.toFixed(3)}, ${rightBound.toFixed(
            3
          )}]`,
          "intervalChanged"
        );

        step = (rightBound - leftBound) / INTERMEDIATE_POINTS_AMOUNT;
        logFunction(`Шаг равен ${step.toFixed(4)}`, "stepChanged");

        continue;
      }

      if (currentX >= end) {
        logFunction(
          `Локальный ${
            actions[type].extremumWord
          } был обнаружен на одном из концов промежутка в точке x = ${currentX.toFixed(
            3
          )}.`,
          "endOfSearch"
        );

        isEndOfAccuracy = false;

        break;
      }

      currentX += step;
    }

    if (isEndOfAccuracy) {
      logFunction(
        `Шаг = ${step.toFixed(
          4
        )} меньше заданной точности = ${accuracy}. Поиск прекращен.`,
        "endOfSearch"
      );
    }

    logFunction(
      `Локальный ${
        actions[type].extremumWord
      } был найден в точке f(${currentX.toFixed(3)}) = ${func(currentX).toFixed(
        4
      )} за ${iterationCount} итераций`,
      "finalExtremum"
    );
  };
}

export default BruteForce;
