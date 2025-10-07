import express from 'express';
const app = express();
app.use(express.json());
app.get('/health', (req, res) => res.json({ ok: true }));
app.listen(4000, () => console.log('API listening on 4000'));
