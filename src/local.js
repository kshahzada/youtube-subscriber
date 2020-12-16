const fs = require('fs');

export const getCache = (filename) => {
    const rawdata = fs.readFileSync(filename);
    const data = JSON.parse(rawdata);
    console.log(`Cached data: ${JSON.stringify(data)}`);
    return data
}

export const setCache = (filename, counter) => {
    let data = JSON.stringify({ counter });
    fs.writeFileSync(filename, data);
    console.log("Cache updated");
}