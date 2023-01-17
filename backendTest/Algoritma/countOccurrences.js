function countOccurrences(INPUT, QUERY) {
  const counts = [];
  for (let i = 0; i < QUERY.length; i++) {
    let count = 0;
    for (let j = 0; j < INPUT.length; j++) {
      if (QUERY[i] === INPUT[j]) {
        count++;
      }
    }
    counts.push(count);
  }
  return counts;
}

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];
console.log(countOccurrences(INPUT, QUERY));
