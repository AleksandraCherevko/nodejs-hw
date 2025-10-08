import { Router } from 'express';
import { Note } from '../models/note.js';
import { getNotes, getNoteById } from '../controllers/notesController.js';

const router = Router();

router.get('/notes', getNotes);

router.get('/notes/:noteId', getNoteById);

export default router;
