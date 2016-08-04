// Create a function that will be called when the user clicks on the button element you added to your HTML.
// This function should grab the values entered by the user from the input elements and the select element.
// The function should then calculate the monthly payment as follows (we can break this formula into 4 'buckets' for readability)
// $(document).ready(function(){});

var calcButton = document.getElementById("btnCalculate"); //weight calcuating button

$("#btnCalculate").click(function() { // when this element is clicked call this function, JavaSCript callback, one function calling another function.
	// Loan balance entered by user
	var loanBalance = parseFloat($('#balance').val());

	// Annual Interest Rate entered by user
	var interestRate = parseFloat($('#rate').val());

	// Loan term entered by user
	var loanTerm = parseFloat($('#term').val());

	// Period is 12 for monthly, 2 for bi-monthly
	var period = parseFloat($('#period option:selected').val());

	if (isNaN(loanBalance) || isNaN(interestRate) || isNaN(loanTerm)){
		$("#user_output").text("Please enter a valid number");
		return;		
	}

	// number of payments (360)
	var numberOfPayments = loanTerm * period;

	// monthly interest rate (~0.0033)      
	var monthlyInterestRate = (interestRate / 100) / period;         

	// compounded interest rate (~3.31)
	var compoundedInterestRate = Math.pow((1 + monthlyInterestRate), numberOfPayments);  

	// interest quotient (~0.004)
	var interestQuotient  = (monthlyInterestRate * compoundedInterestRate) / (compoundedInterestRate - 1);

	// final calculation rounded to two decimal places ($1432.25)
	var monthlyPayment = Math.round((loanBalance * interestQuotient) * 100) / 100;

	$("#user_output").text("$" + monthlyPayment);

});


