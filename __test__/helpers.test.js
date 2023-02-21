const { getMEAN, getMEDIAN, getMODE, saveJSON, createJSONres, createJSONresALL } = require('../helpers')

describe('return the MEAN, MEDIAN, MODE from a string of numbers', () => {
    const nums = '1,5,9,7,5,3';
    const bimodal = '1,5,9,7,5,3,3';
    test('return the MEAN as INT', () => {
        expect(getMEAN(nums)).toEqual(5);
    });
    test('return the MEDIAN as INT', () => {
        expect(getMEDIAN(nums)).toEqual(5);
    });
    test('return single MODE as [array]', () => {
        expect(getMODE(nums)).toEqual([5]);
        expect(getMODE(bimodal)).toEqual([3, 5]);
    });
})

describe('createJSONres createJSONresALL generate response', () => {
    const nums = '1,5,9,7,5,3';
    const bimodal = '1,5,9,7,5,3,3';
    test('return MEAN respons', () => {
        const meanVal = getMEAN(nums);
        const oppVal = 'mean'
        res = createJSONres(oppVal, meanVal);
        expect(res).toEqual({ response: { operation: oppVal, value: meanVal } });
    });
    test('return MEDIAN respons', () => {
        const medianVal = getMEDIAN(nums);
        const oppVal = 'median'
        res = createJSONres(oppVal, medianVal);
        expect(res).toEqual({ response: { operation: oppVal, value: medianVal } });
    });
    test('return MODE respons', () => {
        const modeVal = getMODE(nums);
        const oppVal = 'mode'
        res = createJSONres(oppVal, modeVal);
        expect(res).toEqual({ response: { operation: oppVal, value: modeVal } });
    });
    test('returns ALL response', () => {
        const modeVal = getMODE(nums);
        const medianVal = getMEDIAN(nums);
        const meanVal = getMEAN(nums);
        res = createJSONresALL(meanVal, medianVal, modeVal);
        expect(res).toEqual({ response: { operation: "all", mean: meanVal, median: medianVal, mode: modeVal } })
    })
})


//how do you test the entire app? Integration testing....
//how do you test error classes if at all...?
