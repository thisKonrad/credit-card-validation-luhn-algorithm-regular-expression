# credit-card-validation-luhn-algorithm-regular-expression
credit card validation against luhn algorithm and regular expression

this validation is file based so
the results are logged out in the console();


procedure:

the cvv number is checked against 
the equivalent RegEx 
depends on the choosen card option in the select element.

than the card number is checked against the euqivalent RegEx

final check is the card number against the luhn algorithm



luhn algorithm:
1.step: every second number from right is multiplicated by 2

2.step: so when now one of these multiplicated numbers is >= 10 we have 
       calculate the checksum of it.
       ( checksum, example two or more integers: 24 = 2 + 4 = 6 //
         checksum, example one integer: 6 = 6 )
       
3.step: the other numbers (first from right and those who are under ten),
        now gets added to the numbers from step.1 and 2.
        
4.step: if the result of this calculation results a number with an null 0 in the end.
        the number is checked true / valid!
----------------------------------------------------------------------------------------------------

get numbers to check the formualr:
https://www.paypalobjects.com/en_AU/vhelp/paypalmanager_help/credit_card_numbers.htm

add some credit card icons from here:
 icon-icons.com 
