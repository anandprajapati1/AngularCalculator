var app = angular.module("calculatorApp", []);

app.controller('CalcController', function($scope) {
	// $scope.operations=["+","-","*","/","="];
	$scope.numkeys = [
		[1, 2, 3, '+'],
		[4, 5, 6, '-'],
		[7, 8, 9, '*'],
		['C', 0, '=', '/']
	];
	$scope.stack = "";
	var prevOpration, userInput = 0;
	$scope.result = 0;
	$scope.inputval = 0;

	$scope.custClick = function(o) {
		// console.log(o);
		switch (o) {
			//>> operations
			case '+':
				pushOperationInStack(o, sum);
				break;
			case '-':
				pushOperationInStack(o, sub);
				break;
			case '*':
				pushOperationInStack(o, mul);
				break;
			case '/':
				pushOperationInStack(o, div);
				break;
			case '=':
			if(!$scope.inputval)$scope.stack+=$scope.inputval;
			if(!prevOpration||!prevOpration.m)break;
			$scope.result=prevOpration.m($scope.result, $scope.inputval);
			prevOpration=undefined;
			$scope.inputval=$scope.result;
				break;
			case 'C':
				clear();
				break;
			default:
				//>> numeric
				// if(userInput>0)$scope.inputval=0;

				$scope.stack += o?o:"";
				$scope.inputval = parseInt($scope.inputval + "" + o);
				break;
		}
	};

	//>> utility methods
	function pushOperationInStack(o, opMethod) {
		if ($scope.stack != "" && $scope.stack.indexOf(o) != ($scope.stack.length - 1)) {
			// calculate
			$scope.result = !prevOpration||!prevOpration.m?$scope.inputval: prevOpration.m($scope.result, $scope.inputval);
			$scope.inputval = 0;
			// push in stack
			$scope.stack += o;
			prevOpration = {
				o: o,
				m: opMethod
			};
		}
	};

	function sum(a, b) {
		return a + b
	};

	function sub(a, b) {
		return a - b
	};

	function mul(a, b) {
		return a * b
	};

	function div(a, b) {
		if (b != 0) return a / b
	};

	// function res() {};

	function clear() {
		$scope.result = $scope.inputval = 0;
		$scope.stack = "";
		prevOpration = undefined;
	};

});