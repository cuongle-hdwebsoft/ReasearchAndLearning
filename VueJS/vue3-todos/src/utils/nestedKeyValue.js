// {
//   formValue: {
//     productName: 'SH Mode'
//   }
// }

// stringKey = 'formValue.productName'

// v[formValue.productName] -> sai

// v[formValue][productName] -> đúng

// stringKey.split = ['formValue', 'productName']

// lần 1 reducer: return obj['formValue'] -> { productName: 'SH Mode' }

// lần 2 reducer: return obj['productName'] -> 'SH Mode'

// https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-and-arrays-by-string-path

export function nestedKeyValue(stringKey, obj) {
  return stringKey.split(".").reduce(function (obj, key) {
    return obj[key];
  }, obj);
}
