document.addEventListener('DOMContentLoaded', () => {
    const calculator = document.querySelector('.Calculadora');
    const keys = calculator.querySelector('.btCalculadora');
    const display = document.querySelector('.display_calculadora');
  
    keys.addEventListener('click', e => {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        let { firstValue, modValue, operator, previousKeyType } = calculator.dataset;
        
        const calculate = (n1, operator, n2) => {
            const num1 = parseFloat(n1);
            const num2 = parseFloat(n2);
        
            if (operator === 'add') return num1 + num2;
            if (operator === 'subtract') return num1 - num2;
            if (operator === 'multiply') return num1 * num2;
            if (operator === 'divide') return num1 / num2;
        };
      
        const createResultString = () => {
            if (!action) {
                if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                    return keyContent;
                } else {
                    return displayedNum + keyContent;
                }
            }
        
            if (action === 'decimal') {
                if (!displayedNum.includes('.')) {
                    return displayedNum + '.';
                } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                    return '0.';
                } else {
                    return displayedNum;
                }
            }
        
            if (action === 'clear') {
                return '0';
            }
        
            if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
                if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                    return calculate(firstValue, operator, displayedNum);
                } else {
                    return displayedNum;
                }
            }
        
            if (action === 'calculate') {
                if (firstValue) {
                    if (previousKeyType === 'calculate') {
                        firstValue = displayedNum;
                        modValue = calculator.dataset.modValue;
                    }
                    return calculate(firstValue, operator, displayedNum);
                } else {
                    return displayedNum;
                }
            }
        };
        
        const resultString = createResultString();
        display.textContent = resultString;
        
        calculator.dataset.previousKeyType = action;
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            calculator.dataset.operator = action;
            key.classList.add('is-depressed');
        } else {
            key.classList.remove('is-depressed');
        }
    });
});
