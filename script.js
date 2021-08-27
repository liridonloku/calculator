function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    if(b === 0){
        alert("Cannot divide by zero");
        return a;
    }
    return a/b;
}

function percent(a,b){
    return a/100*b;
}

let input = []; //the array to contains all user input elements
let displayString;  //used to enhance the display of the input
let lastOperatorWasEquals;   //additional logic if the last operator was "=", see case "equals" in the switch statement
const expression = document.getElementById('expression');
const history = document.getElementById('history');
const buttons = document.querySelectorAll("button");
buttons.forEach(button =>{
    button.addEventListener('click', e =>{
        let id = e.target.id;
        let hasOperator = input.includes('+') || input.includes('-') || input.includes('%') || input.includes('×') || input.includes('÷');
        let lastDigit = input[input.length-1];
        let endsWithOperator = lastDigit==='+' || lastDigit==='-' || lastDigit==='%' || lastDigit==='×' || lastDigit==='÷';
        switch (id){
            case 'c':
                expression.textContent = '';
                history.textContent = '';
                input = [];
                break;
            case 'ce':
                input.pop();
                break;            
            case 'percent':
            case 'plus':
            case 'minus':
            case 'mult':
            case 'div':
                if(hasOperator && endsWithOperator){
                    input.pop();
                    input.push(e.target.textContent);
                    lastOperatorWasEquals = false;
                }
                else if(hasOperator && !endsWithOperator){
                    history.textContent = displayString;
                    let newResult = calculateExpression(input);
                    input = [];
                    input.push(newResult);
                    input.push(e.target.textContent);
                    lastOperatorWasEquals = false;
                }
                else if(input===''){
                    //If the screen is empty, do nothing.
                }
                else{
                    input.push(e.target.textContent);
                    lastOperatorWasEquals = false;
                }
                break;
            case 'equals':
                if(hasOperator && !endsWithOperator){
                    history.textContent = displayString;
                    let newResult = calculateExpression(input);
                    input = [];
                    input.push(newResult);
                    lastOperatorWasEquals = true;
                }
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                if(lastOperatorWasEquals){
                    input = [];
                    input.push(e.target.textContent);
                    lastOperatorWasEquals = false;
                }
                else{
                    let operatorIndex = Math.max(input.indexOf('+'), input.indexOf('-'), input.indexOf('%'), input.indexOf('×'), input.indexOf('÷'));
                    if(!hasOperator && input.length >=15){
                        alert('Calculator doesn\'t work with longer numbers');
                        //First argument can't have more than 15 digits.
                    }
                    else if(hasOperator && input.slice(operatorIndex).length >=16){
                        alert('Calculator doesn\'t work with longer numbers');
                        //Second argument can't have more than 15 digits.
                    }
                    else{
                        input.push(e.target.textContent);
                    }
                }
                break;
            case 'negative':
                if(!hasOperator){
                    input.unshift('-'); //insert a minus if it's just one operand on the screen
                }
                else{
                    //Do nothing.
                }
            case 'point':
                if(input.length === 0 || endsWithOperator){
                    input.push('0.');
                }
                else{
                    input.push('.');   // needs more work in use cases.
                }
        }

        // This part deals with the display, so that zeros preceding numbers aren't displayed. Needs a different implementation...
        let firstArg;
        let secondArg;
        let operator;
        hasOperator = input.includes('+') || input.includes('-') || input.includes('%') || input.includes('×') || input.includes('÷'); //check again
        lastDigit = input[input.length-1]; //check again
        endsWithOperator = lastDigit==='+' || lastDigit==='-' || lastDigit==='%' || lastDigit==='×' || lastDigit==='÷'; //check again
        if(hasOperator && !endsWithOperator){    
            let operatorIndex = Math.max(input.indexOf('+'), input.indexOf('-'), input.indexOf('%'), input.indexOf('×'), input.indexOf('÷'));
            firstArg = parseFloat(input.slice(0,operatorIndex).join(''));
            operator = input[operatorIndex];
            secondArg = parseFloat(input.slice(operatorIndex+1).join(''));
        }
        else if(hasOperator && endsWithOperator){
            let operatorIndex = Math.max(input.indexOf('+'), input.indexOf('-'), input.indexOf('%'), input.indexOf('×'), input.indexOf('÷'));
            firstArg = parseFloat(input.slice(0,operatorIndex).join(''));
            operator = input[input.length-1].toString();
            secondArg = '';
        }
        else if(input.length === 0){
            firstArg = '';
            operator = '';
            secondArg = '';
        }
        else{
            firstArg = parseFloat(input.slice(0).join(''));
            operator = '';
            secondArg = '';
        }
        displayString = firstArg.toString()+ operator.toString()+ secondArg.toString();
        expression.textContent = displayString;




        // Resize the font based on input length
        if(expression.textContent.length > 20){
            expression.style.transitionDuration = '0.1s';
            expression.style.fontSize = '16px';
        }
        else{
            expression.style.transitionDuration = '0.1s';
            expression.style.fontSize = '24px';
        }
    });
});

function calculateExpression(array){
    let operatorIndex = Math.max(array.indexOf('+'), array.indexOf('-'), array.indexOf('%'), array.indexOf('×'), array.indexOf('÷'));
    let firstArg = parseFloat(array.slice(0,operatorIndex).join(''));
    let operator = array[operatorIndex];
    let secondArg = parseFloat(array.slice(operatorIndex+1).join(''));
    let result = 0;
    switch (operator){
        case '+':
            result = add(firstArg,secondArg);
            break;
        case '-':
            result = subtract(firstArg,secondArg);
            break;
        case '%':
            result = percent(firstArg,secondArg);
            break;
        case '×':
            result = multiply(firstArg,secondArg);
            break;
        case '÷':
            result = divide(firstArg,secondArg);
            break;
        default:
            console.log("Operator selection error");
            break;
    }
    result = result.toString();
    return result;
}