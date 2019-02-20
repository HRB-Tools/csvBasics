export { sollHaben }

function sollHaben(arr, indexSH, indexUmsatz){
    for ( let i = 0; i < arr.length; i++ ){
        for ( let j = 0; j < arr[i].length; j++ ){
            if ( arr[i][indexSH] = 'S' ){
                arr[i][indexUmsatz] = '-' + arr[i][indexUmsatz]
            }
        }
    }
    return arr
}