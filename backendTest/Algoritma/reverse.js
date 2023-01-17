function reverseAlphabet(str) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let reversed = "";
  for (let i = 0; i < str.length; i++) {
    let char = str[i].toLowerCase();
    if (alphabet.indexOf(char) !== -1) {
      reversed = char + reversed;
    }
  }
  return reversed + "1";
}
console.log(reverseAlphabet("NEGIE1"));