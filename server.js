const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/seconds/:n', async (req, res) => {
    const { n } = req.params;
    await sleep(n * 1000);
    res.json({
        responseTime: `~${n} seconds`,
    });
});

app.get('/seconds/:n/error-prone', async (req, res) => {
    const { n } = req.params;
    await sleep(n * 1000);

    if (Math.random() < 0.5) {
        res.json({
            responseTime: `~${n} seconds`,
        });
    } else {
        res.status(500).send(`Request with time ${n}s server error`);
    }

});

app.listen(8080, () => {
    console.log("server is listening on port 8080");
});