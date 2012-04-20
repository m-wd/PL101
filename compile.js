// ***************************************************************
// Data for validation and debugging 
// ***************************************************************
var melody_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };
		 
var noteMidi = [];
noteMidi['c'] = 0; noteMidi['d'] = 2; noteMidi['e'] = 4; noteMidi['f'] = 5; noteMidi['g'] = 7; noteMidi['a'] = 9; noteMidi['b'] = 11; 

// ***************************************************************		 
// Calculate the end time of a MUS expression ********************
// ***************************************************************
		 
var endTime = function (time, expr) {
    return (time + getDur(expr));
    
};
// ---------------------------------------------------------------
// helper function to recursively traverse MUS expression
// ---------------------------------------------------------------

var getDur = function (expr) {
    if ((expr.tag == 'note') || (expr.tag == 'rest'))
        return expr.dur;
    else 
		if (expr.tag == 'seq')
			return (getDur(expr.right) + getDur(expr.left));
	else
		return getMax(getDur(expr.right), getDur(expr.left));
};

var getMax = function (left, right) {
	if (left >= right)
		return left;
	else
		return right;
};

// ***************************************************************
// Compile MUS expression and output array with NOTE expressions
// ***************************************************************

var compile = function (musexpr) {
	var arr = [];
	
	arr = mus2note(musexpr, 0, arr);
	
	return arr;

};

// ----------------------------------------------------------------
// Transform MUS expression into NOTE array
// ----------------------------------------------------------------
var mus2note = function (expr, startTime, a) {

	if (expr.tag == 'note') {
		var value, offset;
		value = noteMidi[expr.pitch[0]];
		offset = parseInt(expr.pitch[1]);
		expr.pitch = (offset + 1) * 12 + value;
		expr.start = startTime;
		a.push(expr);
		return a;
	}
	else if (expr.tag == 'rest') {
		expr.start = startTime;
		a.push(expr);
		return a;
	}
	else if (expr.tag == 'seq') 
		return (mus2note(expr.right, endTime(startTime, expr.left), mus2note(expr.left, startTime, a)));
	else
		return (mus2note(expr.right, startTime, mus2note(expr.left, startTime, a)));
};


