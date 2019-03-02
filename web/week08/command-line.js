let sum = 0;
process.argv.forEach(item=> {
    const amt = parseInt(item,0);
    if(!isNaN(amt)) {
        sum += amt;
    }
});
console.log(sum);