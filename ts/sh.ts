export { sollHaben }

function sollHaben(arr, indexSH: number, indexUmsatz: number) {
    for ( let i = 2; i < arr.length; i++ ){
        if ( arr[i][indexSH] == '"S"' ){
            arr[i][indexUmsatz] = '-' + arr[i][indexUmsatz]
        }
    }
    return arr
}