/* ::$:: credit_card_validation script js ::$:: */


/* get the basic card information elements */
let formCreditCard = document.querySelector('#credit-card-formular');
const cardNumber = document.querySelector('#card-number');
const cvv = document.querySelector('#cvv');



const resetBtn = document.querySelector('#btn-res');
/* create an location reload for the reset button */
resetBtn.addEventListener('click',()=>{

    location.reload();

});


/* get the drop down expiration date elements: */
const selectYear = document.querySelector('#exp-date-year');
const selectMonth = document.querySelector('#exp-date-month');


/* :: generate the expiration-time input :: */
const months = [ 
        '01', '02', '03', '04', 
        '05', '06', '07', '08', 
        '09', '10', '11', '12' 
];

function dropMonths(){

    for( let element of months){

        const optionMonth = document.createElement('option');
        optionMonth.innerText = [element];
        /* direct the month to the drop down element */
        selectMonth.appendChild(optionMonth);}

}
dropMonths();


function dropYears(){
/**:: in the select box we will 
 * always start with the current year 
 * so the user can't use years of the past ::*/

    /* current year: */
    const yearDate = new Date().getFullYear()
    
    for( let i = 0 ; i < yearDate ; i++ ){

        const optionYear = document.createElement('option');

        optionYear.innerText = yearDate + i;

        selectYear.appendChild(optionYear);

        /** => max count till 10++ years 
        * enough for credit expiration ::*/
         if( i >= 10){

            break;

        }
    } 
}
dropYears();


/** ↓ ensure that the user does not 
* choose an invalid expiration date */
const expMonth = document.querySelector('#exp-date-month');
const expYear = document.querySelector('#exp-date-year');

expMonth.addEventListener('click', ()=>{
  
    const validDateMonth = new Date().getUTCMonth();

    if( expYear.selectedIndex < 1 && 
        expMonth.selectedIndex <= validDateMonth ) {
        
        alertModal.showModal()

        alertText.innerText = `We can not confirm ! 
                            Please enter a value that is 
                            not in the past and valid 
                            from one month!`;
                            console.clear()};

});


/** validate the cvv / cvc number against a regular expression  
 * with 3 ints for visa or mastercard (visa = cvv, master = cvc)..
 * for american express you need a cvv number with 4 ints
 * seperated functions below ↓ ::
*/

/* :::: get the card-type option :::: */
const cardSelect = document.querySelector('.card-choose');

/* choose the right validation function for card type */
function cvvValid(){

   if( cardSelect.selectedIndex === 2 ) {

            return cvvAmexValid();
        }
        else {

            return cvvViMaValid();
        };
}

/* validate visa && mastercard against regEx */
function cvvViMaValid(){

    const cvvVMRegExp = /^\d{3}$/;
    let cvvVMTest = cvvVMRegExp.test(cvv.value);
        
    if(cvvVMTest == true) {

        return cvv.value;
    }

    else { 

        alertModal.showModal()

        alertText.innerText = `We can not confirm! 
                Please enter a valid
                verification code
                with 3 numbers !`;
                console.clear();
    }

};

/* validate american express against regEx */
function cvvAmexValid(){

    const cvvAXRegExp = /^\d{4}$/;
    let cvvAXTest = cvvAXRegExp.test(cvv.value);
                
    if(cvvAXTest == true){

        return cvv.value;

    }
        else { 
                alertModal.showModal()
                alertText.innerText = `We can not confirm! 
                Please enter a valid 
                verification code 
                with 4 numbers!`;
                console.clear();
            }
};


/** ↓ validate the choosen card number 
*   against the matching regEx :: */

/* choose the right function for your card type */
function cardValidation(){

    if(cardSelect.selectedIndex === 2) {

        return cardAmexTest();
    }
            else if(cardSelect.selectedIndex === 1) {

                return cardMasterTest();
            }
                else if(cardSelect.selectedIndex === 0) {

                    return cardVisaTest();
                };
                   
};


function cardAmexTest(){

    const amexRegEx = /^(?:3[47][0-9]{13})$/;
    let amexTest = amexRegEx.test(cardNumber.value);

    if( amexTest === true ){

       return cardNumber.value;
    } 
      else { 

        alertModal.showModal()
        alertText.innerText = `We can not confirm! 
        Please enter a valid card number!`;
        console.clear();

    }

};


function cardVisaTest(){

    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    let visaTest = visaRegEx.test(cardNumber.value); 
    
    if( visaTest === true ){

        return cardNumber.value;
    } 
       else { 
            alertModal.showModal()
            alertText.innerText = `We can not confirm! 
            Please enter a valid card number!`;
            console.clear();
    }

};

function cardMasterTest(){

    const masterRegEx = /^(?:5[1-5][0-9]{14})$/;
    let masterTest = masterRegEx.test(cardNumber.value);
    
    if( masterTest === true ){

        return cardNumber.value;
    } 
       else { 
            alertModal.showModal()
            alertText.innerText = `We can not confirm! 
            Please enter a valid card number!`;
            console.clear();
    }

};



/* :: > ↓ validate the card number against Luhn algorithm < :: */

/* arrays for the checksum */
let firstOfR = [];
let secondOfR = [];
let secondOfRrest = [];
let checksumArray = [];
let addTheChecksum =[];


function luhnValidate(){

    getNumbers()
    checksumNumbers()
    getCheckNumberRight(checksumArray)

    /* check the last number (as a string) 
    * #of the validation number = 0 */
    let numberForValidation = sumArray(secondOfRrest) 
    + sumArray(firstOfR) + sumArray(addTheChecksum);
    
    /* log out the luhn algo result  in red */
    console.log('%c Total Validation Number: ' + numberForValidation, 'color:red');
    
    let finalCheckSign = numberForValidation.toString();
    let getLastSign = finalCheckSign.slice(-1);
    
    if( getLastSign === '0'){
    
            return 'VALID!';
            
        } 
        else { 
            alertModal.showModal()
            alertText.innerText = `We can not confirm! 
            Please enter a valid card number!`;
            console.clear();
        }

    
    /* get the numbers with a value >= 10 and calculate the checksum */
    function checksumNumbers(){
    
    for( let value of secondOfR ){
    
    if( value >= 10 ){
    
        let overTen = value;
        let sum = 0;
        
        /* convert the numbers to a string for the checksum calculation */
        let xSplit = overTen.toString();
        
        for( let i = 0; i < xSplit.length; i++){
            /* re convert the strings to numbers and push to array */
            sum = sum + parseFloat(xSplit[i]);
    
            checksumArray.push(sum);
        }
        
        /* push all numbers < 10 in a seperate array */
        } 
        else if ( value < 10) {
    
        let underTen = value;

        secondOfRrest.push(underTen);

        }
    }};
    

    function getNumbers(){
    
        /* get the input value */
        let n = cardNumber.value;
    
        /* get the inputValue string.length to iterate correctly */
        let cardL = n.length;
    
        /* iterate rewards over n.length(cardL) and log every second index */
        /* if cardNumber is even */
        if(cardL % 2 === 0){

            for( let i = n.length -1; i >= 0; i-- ){
        
                if(i % 2 === 0){
    
                /* get the values of every 2nd index form String */
                n.slice(i);
    
                /* (parse to number) and multiply by 2 */
                let idxEven = (n[i]) * 2;
    
                /* throw numbers to array */
                secondOfR.push(idxEven);
    
                /* => send first numbers from right to firstOfR-array :: */
                } 
                else if( i % 2 !== 0 ){
    
                    n.slice(i);
                    /* multiply 1 = changes the string values into numbers */
                    let firstEven = (n[i]) * 1;     
    
                    firstOfR.push(firstEven);
                  
                }}
        }
        /* if cardNumber is odd */
                else if( cardL % 2 !== 0 ) { 
                for( let i = n.length -1; i >= 0  ; i-- ){
        
                if(i % 2 !== 0 ){
        
                n.slice(i);
    
                let idxOdd = (n[i]) * 2;
    
                secondOfR.push(idxOdd);
    
                }
                /* => send first numbers from right to firstOfR-array */
                else if(i%2 === 0){
    
                    n.slice(i);
                    let firstOdd = (n[i]) * 1;    
                       
                    firstOfR.push(parseInt(firstOdd));

                }
            }
        }
    };  
    

    /* ::: summerize function for all arrays ::: */
    function sumArray(array){

        return array.reduce((a, b) => a + b, 0);

    }
    

    /* slice out the real checksums out of checksumArray */
    function getCheckNumberRight(x){
    
            for( let i = 0; i < x.length ; i++ ){
        
                if(i % 2 !== 0){
    
                x.slice(i);
    
                let checkSum = (x[i]) * 1;
    
                addTheChecksum.push(checkSum)
            }
    }};  

};


/**  submit the formular values from the named HTML elements
 *   and the other values from the validation functions above 
 *   with the FormData()interface :: */
formCreditCard.addEventListener('submit', sendForm ); 

function sendForm(event){

    event.preventDefault()

    formCreditCard = event.target; 


    let formData = new FormData(formCreditCard); 

    /* append values .. */
    formData.append('credit card number: ', cardValidation())
    formData.append('cvv / cvc number: ', cvvValid())
    formData.append('luhn algorithm check: ',luhnValidate())

    /* and additional values like confrim time */
    formData.append('submit date: ', new Date().toLocaleDateString())
    formData.append('submit time: ', new Date().toLocaleTimeString())

    for( let key of formData.keys()){

        console.log(key, formData.get(key));

    }
    formCreditCard.reset();

    /** :: set an target for the formular submisson ::
    * let urlTarget = 'http://localhost:8000';

    * let request = new Request(urlTarget,{
    *    body: formData,
    *    method: 'Post'
    * }); */

    /** ::: response for the server with fetch/promise :::
    * fetch(request)
    *     .then((response)=>response.json())
    *       .then((data)=>console.log('server request: ' + data))
    *   formData.reset();  */
       
};


/*  get the alerts  */
const alertWindow = document.querySelector('.alert-window');
const alertModal = document.querySelector('#alert-dialog');
const alertText = document.querySelector('#alert-text');

/* close alert button */
let closeAlert = document.querySelector('#close-alert');

closeAlert.addEventListener('click', ()=>{
       console.clear()
       alertModal.close();
})


/* ::≠$≠:: -- end of credit card validation -- ::≠$≠:: */
