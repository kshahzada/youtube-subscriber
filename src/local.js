const fs = require('fs');
const path = require("path");

export const getCache = (filename) => {
    const rawdata = fs.readFileSync(path.resolve(__dirname, filename));
    const data = JSON.parse(rawdata);
    console.log(`Cached data: ${JSON.stringify(data)}`);
    return data
}

export const setCache = (filename, counter) => {
    let data = JSON.stringify({ counter });
    fs.writeFileSync(path.resolve(__dirname, filename), data);
    console.log("Cache updated");
}