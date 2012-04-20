// reversing a MUS expression using recursion
var reverse = function(expr) {
    // Your code here
    if (expr.tag == 'note')
    { return expr;}
    else if (expr.tag == 'seq'){
        return { tag: 'seq',
                left: reverse(expr.right),
                right: reverse(expr.left)};
    }
};

var endTime = function (time, expr) {
    return (time + getDur(expr));
    
};

var getDur = function (expr) {
    if (expr.tag == 'note')
        return expr.dur;
    else 
        return (getDur(expr.right) + getDur(expr.left));
};
