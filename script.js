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
let negative; //The +/- sign toggle
let displayString;  //used to enhance the display of the input
let lastOperatorWasEquals;   //additional logic if the last operator was "=", see case "equals" in the switch statement
const expression = document.getElementById('expression');
const history = document.getElementById('history');
const sign = document.getElementById('sign');
const buttons = document.querySelectorAll("button");
buttons.forEach(button =>{
    button.addEventListener('click', e =>{
        let id = e.target.id;
        let hasOperator = input.includes('+') || input.includes('-') || input.includes('%') || input.includes('×') || input.includes('÷');
        let operatorIndex = Math.max(input.indexOf('+'), input.indexOf('-'), input.indexOf('%'), input.indexOf('×'), input.indexOf('÷'));
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
                    if(negative){
                        history.textContent = `-${displayString}`;
                    }
                    else{
                        history.textContent = displayString;
                    }
                    let newResult = calculateExpression(input);
                    input = [];
                    input = input.concat(newResult);
                    input.push(e.target.textContent);
                    lastOperatorWasEquals = false;
                }
                else if(input.length === 0){
                    //If the screen is empty, do nothing.
                }
                else{
                    input.push(e.target.textContent);
                    lastOperatorWasEquals = false;
                }
                break;
            case 'equals':
                if(hasOperator && !endsWithOperator){
                    if(negative){
                        history.textContent = `-${displayString}`;
                    }
                    else{
                        history.textContent = displayString;
                    }
                    let newResult = calculateExpression(input);
                    input = [];
                    input = input.concat(newResult);
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
                if((input.length === 1 && input[0] === '0') || (hasOperator && input.slice(operatorIndex+1).length === 1 && input[operatorIndex+1] === '0')){
                    //If the first digit of either operand is 0, replace it.
                    input.pop();
                    input.push(e.target.textContent);
                }   
                else if(lastOperatorWasEquals){
                    input = [];
                    input.push(e.target.textContent);
                    lastOperatorWasEquals = false;
                }
                else{
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
            case '0':
                if((input.length === 1 && input[0] === '0') || (hasOperator && input.slice(operatorIndex+1).length === 1 && input[operatorIndex+1] === '0')){
                    //Do nothing if the first digit of either operand is 0.
                }                
                else if(lastOperatorWasEquals){
                    input = [];
                    input.push(e.target.textContent);
                    lastOperatorWasEquals = false;
                }
                else{
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
                if(sign.textContent === ''){
                    sign.textContent = '-'
                    negative = true;
                }
                else{
                    sign.textContent = '';
                    negative = false;
                }
                break;
            case 'point':
                if(input.length === 0 || endsWithOperator){
                    input.push('0','.');
                }
                else if(lastOperatorWasEquals){
                    input = [];
                    input.push('0','.');
                    lastOperatorWasEquals = false;
                }
                else if((!hasOperator && input.includes('.')) || (hasOperator && input.slice(operatorIndex).includes('.'))){
                    //If current operand already includes a point, don't add another.
                }
                else{
                    input.push('.');
                }
                break;
        }

        //Turn array to string for better display
        displayString = input.join('');
        expression.textContent = displayString;




        // Resize font based on input length
        if(expression.textContent.length > 20){
            expression.style.transitionDuration = '0.1s';
            sign.style.transitionDuration = '0.1s';
            expression.style.fontSize = '16px';
            sign.style.fontSize = '16px';
        }
        else{
            expression.style.transitionDuration = '0.1s';
            expression.style.fontSize = '24px';
            sign.style.transitionDuration = '0.1s';
            sign.style.fontSize = '24px';
        }
    });
});

function calculateExpression(array){
    let operatorIndex = Math.max(array.indexOf('+'), array.indexOf('-'), array.indexOf('%'), array.indexOf('×'), array.indexOf('÷'));
    let firstArg = parseFloat(array.slice(0,operatorIndex).join(''));
    if(negative){
        firstArg = firstArg * (-1);
        negative = false;
        sign.textContent = '';
    }
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
    result = parseFloat(result.toString()).toPrecision(15);     //to fix incorrect calculation with long float numbers
    result = result.toString();
    while((result.includes('.') && result.charAt(result.length-1)==='0') || result.charAt(result.length-1)==='.'){
        result = result.slice(0,-1);
    }
    return result;
}

//Keyboard support
document.addEventListener('keydown', e =>{
    let id = e.key;
    let hasOperator = input.includes('+') || input.includes('-') || input.includes('%') || input.includes('×') || input.includes('÷');
    let operatorIndex = Math.max(input.indexOf('+'), input.indexOf('-'), input.indexOf('%'), input.indexOf('×'), input.indexOf('÷'));
    let lastDigit = input[input.length-1];
    let endsWithOperator = lastDigit==='+' || lastDigit==='-' || lastDigit==='%' || lastDigit==='×' || lastDigit==='÷';
    switch (id){
        case 'Delete':
            expression.textContent = '';
            history.textContent = '';
            input = [];
            break;
        case 'Backspace':
            input.pop();
            break;            
        case '%':
        case '+':
        case '-':
            if(hasOperator && endsWithOperator){
                input.pop();
                input.push(e.key);
                lastOperatorWasEquals = false;
            }
            else if(hasOperator && !endsWithOperator){
                if(negative){
                    history.textContent = `-${displayString}`;
                }
                else{
                    history.textContent = displayString;
                }
                let newResult = calculateExpression(input);
                input = [];
                input = input.concat(newResult);
                input.push(e.key);
                lastOperatorWasEquals = false;
            }
            else if(input.length === 0){
                //If the screen is empty, do nothing.
            }
            else{
                input.push(e.key);
                lastOperatorWasEquals = false;
            }
            break;
        case '*':
            if(hasOperator && endsWithOperator){
                input.pop();
                input.push('×');
                lastOperatorWasEquals = false;
            }
            else if(hasOperator && !endsWithOperator){
                if(negative){
                    history.textContent = `-${displayString}`;
                }
                else{
                    history.textContent = displayString;
                }
                let newResult = calculateExpression(input);
                input = [];
                input = input.concat(newResult);
                input.push('×');
                lastOperatorWasEquals = false;
            }
            else if(input.length === 0){
                //If the screen is empty, do nothing.
            }
            else{
                input.push('×');
                lastOperatorWasEquals = false;
            }
            break;
        case '/':
            if(hasOperator && endsWithOperator){
                input.pop();
                input.push('÷');
                lastOperatorWasEquals = false;
            }
            else if(hasOperator && !endsWithOperator){
                if(negative){
                    history.textContent = `-${displayString}`;
                }
                else{
                    history.textContent = displayString;
                }
                let newResult = calculateExpression(input);
                input = [];
                input = input.concat(newResult);
                input.push('÷');
                lastOperatorWasEquals = false;
            }
            else if(input.length === 0){
                //If the screen is empty, do nothing.
            }
            else{
                input.push('÷');
                lastOperatorWasEquals = false;
            }
            break;
        case '=':
        case 'Enter':
            if(hasOperator && !endsWithOperator){
                if(negative){
                    history.textContent = `-${displayString}`;
                }
                else{
                    history.textContent = displayString;
                }
                let newResult = calculateExpression(input);
                input = [];
                input = input.concat(newResult);
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
            if((input.length === 1 && input[0] === '0') || (hasOperator && input.slice(operatorIndex+1).length === 1 && input[operatorIndex+1] === '0')){
                //If the first digit of either operand is 0, replace it.
                input.pop();
                input.push(e.key);
            }   
            else if(lastOperatorWasEquals){
                input = [];
                input.push(e.key);
                lastOperatorWasEquals = false;
            }
            else{
                if(!hasOperator && input.length >=15){
                    alert('Calculator doesn\'t work with longer numbers');
                    //First argument can't have more than 15 digits.
                }
                else if(hasOperator && input.slice(operatorIndex).length >=16){
                    alert('Calculator doesn\'t work with longer numbers');
                    //Second argument can't have more than 15 digits.
                }
                else{
                    input.push(e.key);
                }
            }
            break;
        case '0':
            if((input.length === 1 && input[0] === '0') || (hasOperator && input.slice(operatorIndex+1).length === 1 && input[operatorIndex+1] === '0')){
                //Do nothing if the first digit of either operand is 0.
            }                
            else if(lastOperatorWasEquals){
                input = [];
                input.push(e.key);
                lastOperatorWasEquals = false;
            }
            else{
                if(!hasOperator && input.length >=15){
                    alert('Calculator doesn\'t work with longer numbers');
                    //First argument can't have more than 15 digits.
                }
                else if(hasOperator && input.slice(operatorIndex).length >=16){
                    alert('Calculator doesn\'t work with longer numbers');
                    //Second argument can't have more than 15 digits.
                }
                else{
                    input.push(e.key);
                }
            }
            break;
        case 'n':
            if(sign.textContent === ''){
                sign.textContent = '-'
                negative = true;
            }
            else{
                sign.textContent = '';
                negative = false;
            }
            break;
        case '.':
            if(input.length === 0 || endsWithOperator){
                input.push('0','.');
            }
            else if(lastOperatorWasEquals){
                input = [];
                input.push('0','.');
                lastOperatorWasEquals = false;
            }
            else if((!hasOperator && input.includes('.')) || (hasOperator && input.slice(operatorIndex).includes('.'))){
                //If current operand already includes a point, don't add another.
            }
            else{
                input.push('.');
            }
            break;
        default:
            break;
    }

    //Turn array to string for better display
    displayString = input.join('');
    expression.textContent = displayString;



    // Resize font based on input length
    if(expression.textContent.length > 20){
        expression.style.transitionDuration = '0.1s';
        sign.style.transitionDuration = '0.1s';
        expression.style.fontSize = '16px';
        sign.style.fontSize = '16px';
    }
    else{
        expression.style.transitionDuration = '0.1s';
        expression.style.fontSize = '24px';
        sign.style.transitionDuration = '0.1s';
        sign.style.fontSize = '24px';
    }
});