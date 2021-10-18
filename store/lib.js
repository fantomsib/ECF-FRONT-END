import Vue from "vue";

export const isObject = arr => typeof arr === 'object' &&  arr !== null;
export const isArray = Array.isArray;
export const isTypeArray = arr => isArray(arr) && typeof arr.length !== undefined

export const vAssign = (arr, arr2) => {
  for(const key in arr2){
    if(isObject(arr2[key])){
      Vue.set(arr, key, vAssign( arr[key] || isTypeArray(arr2[key])?[]:{}, arr2[key]));
      continue;
    }
    Vue.set(arr, key, arr2[key]);
  }
  return arr;
}

export const genOptions = arr => {
  const res = [];
  for(const key in arr){
    res.push({
      value: String(key),
      text: arr[key]
    });
  }
  return res;
}
