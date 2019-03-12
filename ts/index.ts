import { fileresult } from './fileio';
import {csvArray, resultArray} from './csv';
import { filedownload } from './filedownload';
import { colSwap } from './colswap';
import { sollHaben } from "./sh";

// Init when document is loaded
document.onreadystatechange = function(){
    if ( document.readyState == 'complete' ){
        init();
    }
};

const colMap : number[] = [6, 0, 7, 9, 10, -1, -1, 13] // from Index => map[Index]
const reverseMap : number[] = [8, -1, -1, -1, -1, -1, 4, 5, -1, 1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7]
const tagsSource : string[] = ['Sollkonto', 'Betrag', 'Habenkonto', 'Belegdatum', 'Belegnummer', 'Steuercode', 'Steuerart', 'Kost 1', 'Kost 2']
const tagsTarget : string[] = ['Umsatz', 'Soll/Haben', 'leer', 'leer', 'leer', 'leer', 'Konto', 'Gegenkonto', 'leer', 'Belegdatum', 'Belegfeld 1', 'Belegfeld 2', 'leer', 'Buchungstext']
console.log(reverseMap.length)
let init = function(){
    let text;
    // Adds EventListeners to each item
    let btn1 = document.querySelector('ul .nav');
    btn1.addEventListener('mousedown', function (){
        text = fileresult();
        text.then(function(csvFile) {
            return resultArray(csvFile)
        }).then(function(intermediateArr){
            return sollHaben(intermediateArr, 1, 0)
        }).then(function(resultArr) {
            return colSwap(resultArr, reverseMap)
        }).then(function(arr2d){
            let temparr = arr2d.slice(2, -1)
            temparr.forEach( el => {
                el[4] = el[4].slice(0,-1)
                el[5] = el[5].slice(0,-1)
                el[4] = el[7].length > 2 ? 'S'+el[4] : el[4]
                el[5] = el[7].length > 2 ? 'S'+el[5] : el[5]
            })
            console.log(temparr)
            return temparr
        }).then(function (arr2d) {
            return csvArray(arr2d)
        }).then(function(csvArr){
            filedownload(csvArr, `DTVF_${new Date().getFullYear()}_${('00' + (new Date().getMonth()+1)).slice(-2)}${('00' + new Date().getDate()).slice(-2)}.csv`)
        })
    });

};
// .then(function (arr2d) {
//     let information = classify(arr2d);
//     console.log(information);
//     return arr2d;
// })