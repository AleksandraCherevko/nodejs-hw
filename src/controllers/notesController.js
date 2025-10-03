import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getNote = async (req, res) => {
  const note = await Note.find();
  res.status(200).json(note);
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);

  if (!note) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.status(200).json(note);
};
