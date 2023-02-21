const { QueryError } = require('./errors');
const { writeFileSync, readFile } = require('fs');

function validQuery(values) {
    if (!values) {
        throw new QueryError('You must include numbers.', 400);
    }
    arr = values.split(",");
    if (arr.every((num) => {
        if (parseInt(num) === 0) {
            return true;
        } else {
            return parseInt(num);
        }
    })) {
        return true;
    } else {
        badNums = arr.filter((val) => { if (!parseInt(val)) { return val } });
        msg = `${badNums.toString()} is not a number...`
        throw new QueryError(msg, 400);
    }
}
function stringTOint(values) {
    // from the string of values make an array of nums
    return values.split(",").map(num => parseInt(num))
}
function getMEAN(values) {
    //takes the string of number from the query ?nums=1,2,3 and returns the mean
    const nums = stringTOint(values)
    //sum up the values in the nums, and then divide the sum by the length of nums
    const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
    //mean is a number type
    return mean
}

function getMEDIAN(values) {
    //takes the string of number from the query ?nums=1,2,3 and returns the median
    const nums = stringTOint(values);
    //sort nums in ascending order inplace. 
    nums.sort((a, b) => a - b);
    //The median is the middle value in a sorted dataset
    let midINDEX = Math.floor(nums.length / 2);
    if (nums.length % 2 === 0) {
        return (nums[midINDEX - 1] + nums[midINDEX]) / 2;
    } else {
        return nums[midINDEX];
    }
}

function getMODE(values) {
    //takes the string of number from the query ?nums=1,2,3 and returns the mode
    // handles bimodal and no mode
    const nums = stringTOint(values);
    //The mode is the value that appears most frequent
    freq = nums.reduce((obj, num, i) => {
        //set num as key and (frequency it appears as the val)
        obj[num] = (obj[num] || 0) + 1;
        return obj
    }, {});
    let maxFreq = 0;
    //mode can be bimodal
    let mode = [];
    for (let key in freq) {
        if (freq[key] > maxFreq) {
            maxFreq = freq[key];
            mode = [parseInt(key)];
        } else if (freq[key] === maxFreq) {
            mode.push(parseInt(key));
        }
    }
    //if all values appear the same number of times return 'No Mode'
    freqValues = Object.values(freq)
    if (freqValues.every(val => val == freqValues[0])) {
        return 'No Mode'
    }
    return mode;
}
//saves results to a json file if the user specifies in the querry string save=true
function saveJSON(newData) {
    newData['date'] = new Date().toISOString();
    readFile('results.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        oldData = JSON.parse(data);
        oldData.push(newData);
        updatedData = JSON.stringify(oldData)
        writeFileSync('results.json', updatedData, (err) => {
            if (err) {
                console.error(err)
                throw err;
            }
        })
    })
    return true;
}
function createJSONres(operation, value) {
    return { response: { operation: operation, value: value } }
}
function createJSONresALL(mean, median, mode) {
    return { response: { operation: "all", mean: mean, median: median, mode: mode } }
}
module.exports = { getMEAN, getMEDIAN, getMODE, validQuery, saveJSON, createJSONres, createJSONresALL }