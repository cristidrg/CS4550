document.addEventListener("DOMContentLoaded", function(event) {
  const mode = {
    "CLEAN": 'clean',
    "WRITE": 'write',
    "WAITING_INPUT": 'waiting_input',
  };

  const ops = {
    "PLUS": 'plus',
    "MINUS": 'minus',
    "TIMES": 'times',
    "DIVIDE": 'divide',
    "NONE": 'none'
  }

  const INITIAL_STATE = {
    mode: mode.CLEAN,
    currOp: ops.NONE,
    resultBox: "...",
    previousNum: false,
    total: 0
  };

  let state = Object.assign({}, INITIAL_STATE);
  
  const resultBox = document.querySelector('.calculator .result');

  const operate = (operation, a, b) => {
    switch(operation) {
      case ops.PLUS: return a + b;
      case ops.TIMES: return a * b;
      case ops.MINUS: return a - b;
      case ops.DIVIDE: return a / b;
      default: return a + b;
    }
  }

  const onClearClick = () => {
    state = Object.assign({}, INITIAL_STATE);
    resultBox.innerHTML = '...'
  }

  const onDigitClick = (event) => {
    if (state.mode == mode.CLEAN || state.mode == mode.WAITING_INPUT) {
      resultBox.innerHTML = "";
      state.mode = mode.WRITE;
      state.resultBox = event.target.innerHTML;
    } else if (state.mode == mode.WRITE) {
      state.resultBox += event.target.innerHTML;
    }

    resultBox.innerHTML = state.resultBox;
  }

  const handleOp = (op) => (event) => {
    if (state.mode == mode.CLEAN) {
      return;
    } else if (!state.previousNum && state.mode == mode.WAITING_INPUT) {
      return;
    } else if (!state.previousNum) {
      state = Object.assign({}, state, {
        mode: mode.WAITING_INPUT,
        currOp: op,
        resultBox: "",
        total: parseFloat(resultBox.innerHTML),
        previousNum: parseFloat(resultBox.innerHTML)
      });
    } else if (state.previousNum) {
      state = Object.assign({}, state, {
        mode: mode.WAITING_INPUT,
        currOp: op,
        resultBox: "",
        previousNum: parseFloat(resultBox.innerHTML),
        total: operate(state.currOp, state.total, parseFloat(resultBox.innerHTML))
      });
      
      resultBox.innerHTML = state.total;
    }
  }

  const onPlusClick = handleOp(ops.PLUS);
  const onTimesClick = handleOp(ops.TIMES);
  const onDivideClick = handleOp(ops.DIVIDE);
  const onMinusClick = handleOp(ops.MINUS);
  
  document.querySelectorAll('button[data-type="digit"]').forEach(element => {
    element.addEventListener("click", onDigitClick);
  })

  document.querySelector('button[data-operation="plus"]').addEventListener("click", onPlusClick);
  document.querySelector('button[data-operation="times"]').addEventListener("click", onTimesClick);
  document.querySelector('button[data-operation="divide"]').addEventListener("click", onDivideClick);
  document.querySelector('button[data-operation="minus"]').addEventListener("click", onMinusClick);
  document.querySelector('button[data-operation="clear"').addEventListener("click", onClearClick);
});