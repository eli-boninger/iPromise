

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

function getRandomArbitrary(min, max) {
    return Math.round(100 * (Math.random() * (max - min) + min)) / 100;
}

const makeAsyncRequest = async (numSeconds) => {
    return await axios.get(`http://localhost:8080/seconds/${numSeconds}`);
};

const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const button4 = document.getElementById('button4');
const button1div = document.getElementById('button1-call');
const button2div = document.getElementById('button2-call');
const button3div = document.getElementById('button3-call');
const button4div = document.getElementById('button4-call');

button1.addEventListener('click', async (e) => {
    addLoaderDOM(e.target);
    const reqLength = getRandomArbitrary(2, 5);

    addRequestDetails(button1div, `await axios.get('API endpoint') // ${reqLength}s request`);

    const startTime = performance.now();
    await makeAsyncRequest(reqLength);
    const endTime = performance.now();


    removeLoaderDOM(e.target);
    e.target.innerText = `Line of code blocked execution for ${Math.round(100 * ((endTime - startTime) / 1000)) / 100}s`;
});

button2.addEventListener('click', async (e) => {
    addLoaderDOM(e.target);
    const reqOneLength = getRandomArbitrary(2, 5);
    let reqTwoLength = getRandomArbitrary(2, 5);
    if (reqOneLength === reqTwoLength) {
        reqTwoLength += 0.01;
    }

    addRequestDetails(button2div, `await Promise.all[(${reqOneLength}s request, ${reqTwoLength}s request)]`);

    const startTime = performance.now();
    await Promise.all([makeAsyncRequest(reqOneLength), makeAsyncRequest(reqTwoLength)]);
    const endTime = performance.now();


    removeLoaderDOM(e.target);
    e.target.innerText = `Line of code blocked execution for ${Math.round(100 * ((endTime - startTime) / 1000)) / 100}s`;
});

button3.addEventListener('click', async (e) => {
    addLoaderDOM(e.target);
    const reqLength = getRandomArbitrary(2, 5);

    addRequestDetails(button3div, `axios.get('API Endpoint') // ${reqLength}s request`);

    const startTime = performance.now();
    makeAsyncRequest(reqLength);
    const endTime = performance.now();

    removeLoaderDOM(e.target);
    e.target.innerText = `Line of code blocked execution for ${Math.round(100 * ((endTime - startTime))) / 100}ms`;

});


button4.addEventListener('click', async (e) => {
    addLoaderDOM(e.target);
    const reqOneLength = getRandomArbitrary(2, 5);
    const reqTwoLength = getRandomArbitrary(2, 5);

    addRequestDetails(button4div, `await axios.get('API Endpoint') // ${reqOneLength}s request\nawait axios.get('API Endpoint') // ${reqTwoLength}s request`);

    const startTime = performance.now();
    await makeAsyncRequest(reqOneLength);
    await makeAsyncRequest(reqTwoLength);
    const endTime = performance.now();

    removeLoaderDOM(e.target);
    e.target.innerText = `Lines of code blocked execution for ${Math.round(100 * ((endTime - startTime))) / 100}ms`;

});
