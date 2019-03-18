//export class Matrix{
export function factorial(num){
    return num > 0 ? num * this.factorial(num - 1) : 1;
}

export function nCr(n, r){
    return this.factorial(n) /  this.factorial(r) / this.factorial(n-r)
}

export function arrayToMatrix(arr){
    var matrix = []
    matrix.push(arr)
    console.log(matrix)
    return matrix
}

export function scalarMultiply(scalar, matrix){
    let rows = matrix.length, columns = matrix[0].length;
    if (!columns){
        matrix = [matrix]
        rows = matrix.length
        columns = matrix[0].length
    }

    var newMatrix = createMatrix(rows, columns)
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < columns; j++){
            newMatrix[i][j] = scalar * matrix[i][j]
        }
    }
    return newMatrix
}

export function linspace(start, end, numValues){
    var spacedArr = this.zeros(1, numValues)
    var spacing = (end - start) / (numValues - 1)
    for (let i = 0; i < numValues; i++){
        spacedArr[0][i] = start + spacing*i
    }
    return spacedArr;
}

export function zeros(rows = 1, columns = 1){
    return createMatrix(rows, columns)
}

export function createIndexMatrix(rows = 1, columns = 1){
    let matrix = []
    let count = 0
    for (let i = 0; i < rows; i ++){
        let currRow = [];
        for (let j = 0; j < columns; j ++){
            currRow.push(count)
            count++
        }    
        matrix.push(currRow)
    }
    return matrix
}

export function createMatrix(rows = 1, columns = 1, value=0){
    let matrix = []
    for (let i = 0; i < rows; i ++){
        let currRow = [];
        for (let j = 0; j < columns; j ++){
            currRow.push(value)
        }    
        matrix.push(currRow)
    }
    return matrix
}

export function add(a, b){
    let rows = a.length, columns = b[0].length;
    if (a.length !== b.length || a[0].length !== b[0].length){
        console.log('error size mismatch')
        return
    }

    var matrix = zeros(rows, columns)

    for (let i = 0; i < rows; i++){
        for (let j = 0; j < columns; j++){
            matrix[i][j] = a[i][j] + b[i][j]
        }
    }

    return matrix
}

export function multiply(a , b){
    let rows = a.length, columns = b[0].length;
    if (a[0].length !== b.length){
        return
    }

    var matrix = this.zeros(rows, columns)

    for (let i = 0; i < rows; i++){
        for (let j = 0; j < columns; j++){
            var temp_col = []
            for (let k =0; k < b.length; k++){
                temp_col.push(b[k][j])
            }
            matrix[i][j] = this.dot(a[i], temp_col)
        }
    }
    return matrix
}

export function dot(a , b){
    if (a.length !== b.length){
        return
    }

    var value = 0;
    for (let i = 0; i < a.length; i++){
        value += a[i] * b[i]
    }
    return value
}

export function dim(matrix){
    return `dim: (${matrix.length},${matrix[0].length})`
}

export function printMatrix(matrix){
    var mToString = "";
    for (let i = 0; i < matrix.length; i++){
        var currRow = matrix[i];
        mToString += "["
        for (let j = 0; j < currRow.length; j++){
            mToString += ` ${currRow[j]},`
        }
        mToString += " ]\n"
    }
    return mToString
}
//}



