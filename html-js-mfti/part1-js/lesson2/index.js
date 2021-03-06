var o1 = {text: 'txt1'};
var o2 = o1;
o2.text = 'txt2';
console.log('o1.text', o1.text);

var arr = [];
arr[100] = 2;
console.log('arr.length', arr.length);

var arr2 = {};
arr2['100a'] = 2;
console.log('arr2.length', arr2.length);
console.log('Object.keys(arr2).length', Object.keys(arr2).length);

