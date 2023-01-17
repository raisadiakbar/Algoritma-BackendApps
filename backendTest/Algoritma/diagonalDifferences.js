function diagonalDifference(matrix) {
    let primary = 0;
    let secondary = 0;
    for (let i = 0; i < matrix.length; i++) {
      primary += matrix[i][i];
      secondary += matrix[i][matrix.length - i - 1];
    }
    return primary - secondary;
  }
  
  const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];
  console.log(diagonalDifference(matrix));
  