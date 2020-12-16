import 'source-map-support/register';
import "@babel/polyfill";

import { asyncGetSubs } from './youtube';
import { setupParticle, getDisplayCount, setDisplayCount,  setSubCount} from './particle';
import { getCache, setCache } from './local';

import { deviceId, cacheFilename } from "./config.json";

const run = async () => {

    // Read YouTube
    const subscribers = await asyncGetSubs()/1000; // remove after
    console.log(`YouTube Subscribers: ${subscribers}`);

    // Make sure Particle Display Count is set
    await setupParticle();
    const onDeviceCount = await getDisplayCount(deviceId);
    if (onDeviceCount == -1) {
        const { counter } = getCache(cacheFilename);
        await setupParticle();
        await setDisplayCount(deviceId, counter);
    } else {
        setCache(cacheFilename, onDeviceCount);
    }
    await setupParticle();
    await setSubCount(deviceId, subscribers);
    console.log(subscribers)
}

run()
