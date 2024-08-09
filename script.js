/******* DOM Manipulation Functions *********/

const createLoaderDot = () => {
    const div = document.createElement('div');
    div.classList.add('loader-container__loader-dot');
    return div;
};

const generateSingleLoaderContainer = () => {
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('loader-container');

    const loaderDiv = document.createElement('div');
    loaderDiv.classList.add('loader-container__loader');

    loaderDiv.appendChild(createLoaderDot());
    loaderDiv.appendChild(createLoaderDot());
    loaderDiv.appendChild(createLoaderDot());
    containerDiv.appendChild(loaderDiv);
    return containerDiv;
};

const addLoaderDOM = (el) => {
    el.replaceChildren();
    el.classList.add('request__button--loading');
    el.appendChild(generateSingleLoaderContainer());
};

const removeLoaderDOM = (el) => {
    el.replaceChildren();
    el.classList.remove('request__button--loading');
};

const addRequestDetails = (buttonDivEl, text) => {
    const p1 = document.createElement('p');
    p1.innerText = text;
    const p2 = document.createElement('p');
    p2.innerText = `---`;
    buttonDivEl.appendChild(p1);
    buttonDivEl.appendChild(p2);
};

const createRequestSection = (descriptionText) => {
    const divEl = document.createElement('div');
    divEl.classList.add('request');

    const pEl = document.createElement('p');
    pEl.classList.add('request__description');
    pEl.innerText = descriptionText;

    const buttonEl = document.createElement('button');
    buttonEl.innerText = 'Make request';
    buttonEl.classList.add('request__button');

    const detailsEl = document.createElement('div');
    detailsEl.classList.add("request__result");

    divEl.appendChild(pEl);
    divEl.appendChild(buttonEl);
    divEl.appendChild(detailsEl);
    return [divEl, buttonEl, detailsEl];

};

/******** Async request functions *******/

function getRandomArbitrary(min, max) {
    return Math.round(100 * (Math.random() * (max - min) + min)) / 100;
}

const makeAsyncRequest = async (numSeconds) => {
    return await axios.get(`http://localhost:8080/seconds/${numSeconds}`);
};

const createEventListener = (numsRequests, detailsDiv, parallel = true, awaited = true) => async (e) => {
    addLoaderDOM(e.target);
    const arr = new Array(numsRequests).fill(undefined);
    const lengths = arr.map((a) => { let l = getRandomArbitrary(2, 5); console.log(l); return l; });

    let detailStr;
    if (lengths.length > 1 && parallel) {
        detailStr = `await Promise.all([${lengths.map(l => `${l}s request`).join(', ')})])`;
    } else if (lengths.length > 1) {
        detailStr = lengths.map(l => `await axios.get('API Endpoint') // ${l}s request`).join('\n');
    } else {
        detailStr = `${awaited ? 'await ' : ''} axios.get('API endpoint') // ${lengths[0]}s request`;
    }

    addRequestDetails(detailsDiv, detailStr);

    const startTime = performance.now();
    if (parallel && awaited) {
        await Promise.all(lengths.map(l => makeAsyncRequest(l)));
    } else if (parallel) {
        Promise.all(lengths.map(l => makeAsyncRequest(l)));
    } else {
        for (let i = 0; i < lengths.length; i++) {
            await makeAsyncRequest(lengths[i]);
        }
    }
    const endTime = performance.now();

    removeLoaderDOM(e.target);
    const secondsDuration = Math.round(100 * ((endTime - startTime) / 1000)) / 100;
    const msDuration = Math.round(100 * ((endTime - startTime))) / 100;
    e.target.innerText = `Line(s) of code blocked execution for ${awaited ? `${secondsDuration}s` : `${msDuration}ms`}`;
};

const [req1, req1Button, req1Div] = createRequestSection('Single awaited request');
req1Button.addEventListener('click', createEventListener(1, req1Div));

const [req2, req2Button, req2Div] = createRequestSection('Multiple awaited requests (in sequence)');
req2Button.addEventListener('click', createEventListener(2, req2Div, false));

const [req3, req3Button, req3Div] = createRequestSection('Multiple awaited requests (in parallel with Promise.all)');
req3Button.addEventListener('click', createEventListener(2, req3Div, true, true));

const [req4, req4Button, req4Div] = createRequestSection('One request not awaited');
req4Button.addEventListener('click', createEventListener(1, req4Div, true, false));

const main = document.getElementById('main');
main.appendChild(req1);
main.appendChild(req2);
main.appendChild(req3);
main.appendChild(req4);