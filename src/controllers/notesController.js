import { Note } from '../models/notes.js';

export const getNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

export const getNotesById = async (req, res) => {
  const { notesId } = req.params;
  const note = await Note.findById(notesId);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  res.status(200).json(note);
};
