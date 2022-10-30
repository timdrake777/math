import readline from "readline";

const f = (x: any) => (x.includes(".") ? x.split(".").pop().length : 0);

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> Введите эпсилон: ",
});

const exponentialToDecimal = (exponential: number) => {
  let decimal = exponential.toString().toLowerCase();
  if (decimal.includes("e+")) {
    const exponentialSplitted = decimal.split("e+");
    let postfix = "";
    for (
      let i = 0;
      i <
      +exponentialSplitted[1] -
        (exponentialSplitted[0].includes(".")
          ? exponentialSplitted[0].split(".")[1].length
          : 0);
      i++
    ) {
      postfix += "0";
    }
    const addCommas = (text: any) => {
      let j = 3;
      let textLength = text.length;
      while (j < textLength) {
        text = `${text.slice(0, textLength - j)},${text.slice(
          textLength - j,
          textLength
        )}`;
        textLength++;
        j += 3 + 1;
      }
      return text;
    };
    decimal = addCommas(exponentialSplitted[0].replace(".", "") + postfix);
  }
  if (decimal.toLowerCase().includes("e-")) {
    const exponentialSplitted = decimal.split("e-");
    let prefix = "0.";
    for (let i = 0; i < +exponentialSplitted[1] - 1; i++) {
      prefix += "0";
    }
    decimal = prefix + exponentialSplitted[0].replace(".", "");
  }
  return decimal;
};

const sekysh = (x: number) => {
  return 1.5 - 0.4 * Math.sqrt(Math.pow(x, 3)) - 0.5 * Math.log(x);
};

rl.prompt();
rl.on("line", (input: string) => {
  var inputs = input.split(",");

  var eps = Number.parseFloat(inputs[0]);
  var countAfterDot = 0;
  if (eps.toString().includes("e")) {
    countAfterDot = f(exponentialToDecimal(eps));
  } else {
    countAfterDot = f(eps.toString());
  }
  var startX = Number.parseFloat(inputs[1]);
  if (!eps || !startX) {
    console.log("Неверный ввод");
    rl.close();
    return;
  }
  var key = 0;
  var nextX = 0;
  var fOld = 0;
  var fNew = 0;
  var subX = 1;
  do {
    if (key === 0) {
      console.log(`Итерация #${key}`);
      console.log(`X${key} = ${startX}`);
      fOld = sekysh(startX);
      console.log(`F(xn) = ${fOld}`);
      console.log(`|xn-xn-1| = 0`);
      nextX = startX + 1;
    } else {
      console.log(`Итерация #${key}`);
      console.log(`X${key} = ${nextX}`);
      fNew = sekysh(nextX);
      console.log(`F(xn) = ${fNew}`);
      subX = Math.abs(nextX - startX);
      console.log(`|xn-xn-1| = ${subX}`);
      var temp = nextX - (fNew * (startX - nextX)) / (fOld - fNew);
      startX = nextX;
      nextX = temp;
      fOld = fNew;
    }
    key++;
  } while (subX > eps);
  console.log("------------------------");
  console.log(`x* = ${nextX}`);
  rl.close();
});
