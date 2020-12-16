const Particle = require('particle-api-js');
import { username, password } from './particle.creds.json';

const particle = new Particle();
let token;

export const setupParticle = async () => {
    return particle.login({ username: username, password: password }).then(
        function (data) {
            token = data.body.access_token;
            console.log(token)
        },
        function (err) {
            console.log('Could not log in.', err);
        }
    );
}

export const getDisplayCount = (deviceId) => {
    return particle.getVariable({ deviceId, name: "display_count", auth: token }).then(function (data) {
        console.log(`On-device count: ${data.body.result}`);
        return(data.body.result);
    }, function (err) {
        console.log('An error getting on-device count:', err);
        throw err;
    });
}

const callParticleFunction = ({deviceId, name, argument, auth}) => {
    var axios = require('axios');
    var qs = require('qs');
    var data = qs.stringify({
        'arg': ''+argument 
    });
    var config = {
    method: 'post',
    url: `https://api.particle.io/v1/devices/${deviceId}/${name}`,
    headers: { 
        'Authorization': `Bearer ${auth}`, 
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
    };
    return axios(config)
}

export const setDisplayCount = (deviceId, count) => {
    const fnPr = callParticleFunction({ deviceId, name: 'syncDis', argument: count, auth: token });
    return fnPr.then(
        function (data) {
            console.log('Display set to:', data.data.return_value);
            return data;
        }, function (err) {
            console.log('An error occurred:', err);
            throw err;
        });
        
}

export const setSubCount = (deviceId, count) => {
    const fnPr = callParticleFunction({ deviceId, name: 'syncSub', argument: count, auth: token });
    return fnPr.then(
        function (data) {
            console.log({data})
            console.log('Display set to:', data.data.return_value);
            return data;
        }, function (err) {
            console.log('An error occurred:', err);
            throw err;
        });
}