function longest(sentence) {
    const words = sentence.split(" ");
    let longest = 0;
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > longest) {
        longest = words[i].length;
      }
    }
    return longest;
  }
  const sentence = "Saya sangat senang mengerjakan soal algoritma";
  console.log(longest(sentence));