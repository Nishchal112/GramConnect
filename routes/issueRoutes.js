import express from 'express'
import { Issue } from '../models/Issue.js'

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { title, description, location } = req.body;
        const newIssue = await Issue.create({ title, description, location });
        res.status(201).json(newIssue);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const issues = await Issue.findAll();
        res.json(issues);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
