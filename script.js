const digits = document.getElementsByClassName("digits");
const current = document.getElementsByClassName("currentOperand")[0];
const previous = document.getElementsByClassName("previousOperand")[0];
const AC = document.getElementsByClassName("AC")[0];
const del = document.getElementsByClassName("del")[0];
const operations = document.getElementsByClassName("operations");
const spans = document.getElementsByClassName("operation")[0];
const equal = document.getElementsByClassName('equal')[0]

const ACTION = {
  ADD_DIGIT: "add_digit",
  CLEAR: "clear",
  DELETE: "delete",
  EVAL: "evaluate",
  OPERATIONS: "operation",
};
let evaluat = true
function typenumber(e, act) {
  switch (act) {
    case ACTION.OPERATIONS:
      if (spans.textContent !== "" && current.textContent === "") {
        spans.textContent = e.target.value;
      }
      if (current.textContent === "") {
        return;
      }
      if (
        previous.textContent !== "" &&
        spans.textContent !== "" &&
        current.textContent !== ""
      ) {
        current.textContent = evaluate(
          previous.textContent,
          current.textContent,
          spans.textContent
        );
      }

      previous.textContent = current.textContent;
      current.textContent = "";
      spans.textContent = e.target.value;
      break;

    case ACTION.ADD_DIGIT:
      if (current.textContent === "0" && e.target.value === "0") {
        return;
      }
      if (current.textContent.includes(".") && e.target.value === ".") {
        return;
      }
      if (evaluat) {current.textContent = ""; evaluat = false}
      current.textContent += e.target.value;
      break;
    case ACTION.CLEAR:
      current.textContent = "";
      spans.textContent = "";
      previous.textContent = "";
      break;
    case ACTION.DELETE:
      current.textContent = "";
      break;
    case ACTION.EVAL:
      if (
        current.textContent !== "" &&
        previous.textContent !== "" &&
        spans.textContent !== ""
      ) {
        current.textContent = evaluate(
          previous.textContent,
          current.textContent,
          spans.textContent
        );
        previous.textContent = ""
        spans.textContent= ""
        evaluat = true
      }
  }
}

function evaluate(prev, current, operand) {
  prev = parseFloat(prev);
  current = parseFloat(current);
  switch (operand) {
    case "+":
      return prev + current;
      break;
    case "-":
      return prev - current;
      break;
    case "x":
      return prev * current;
      break;
    case "÷":
      return prev / current;
      break;
  }
}

AC.addEventListener("click", (e) => typenumber(e, (act = ACTION.CLEAR)));
del.addEventListener("click", (e) => typenumber(e, (act = ACTION.DELETE)));
equal.addEventListener("click", (e) => typenumber(e, (act = ACTION.EVAL)));

for (digit of digits) {
  digit.addEventListener("click", (e) =>
    typenumber(e, (act = ACTION.ADD_DIGIT))
  );
}
for (operand of operations) {
  operand.addEventListener("click", (e) =>
    typenumber(e, (act = ACTION.OPERATIONS))
  );
}
