

// function range(size, startAt = 0) {
//   return [...Array(size).keys()].map((i) => i + startAt);
// }

// export default Paginate = (dataset, numPerPage = 5, page = 1) => {
//   const outputArray = [];
//   const rangeToShow = range(numPerPage, page * 5 - 5);
  
// };

// console.log(range(5, 0));

let sum = 0;
let numbers = [2,5,6];
let cumsum = async function(a, b) {
    return a + b
}
numbers.forEach(async function (a)  {
    sum = await cumsum(sum, a)
})
console.log(sum)
