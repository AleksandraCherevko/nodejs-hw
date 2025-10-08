import express from 'express';
import cors from 'cors';
// import pino from 'pino-http';
import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';
// import { Note } from './models/note.js';
import { logger } from './middleware/logger.js';
import { noteFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

// import notesRoutes from './routes/notesRoutes.js';
import router from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT || 3030;

app.use(logger);
app.use(express.json());
app.use(cors());
app.use(router);
// app.use(
//   pino({
//     level: 'info',
//     transport: {
//       target: 'pino-pretty',
//       options: {
//         colorize: true,
//         translateTime: 'HH:MM:ss',
//         ignore: 'pid,hostname',
//         messageFormat:
//           '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
//         hideObject: true,
//       },
//     },
//   }),
// );

// app.get('/notes', async (req, res) => {
//   const notes = await Note.find();
//   res.status(200).json(notes);
// });

// app.get('/notes/:noteId', async (req, res) => {
//   const { noteId } = req.params;
//   const note = await Note.findById(noteId);

//   if (!note) {
//     return res.status(404).json({ message: 'Note not found' });
//   }

//   res.status(200).json(note);
// });

app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});

// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// app.use((err, req, res, next) => {
//   console.error('Error:', err.message);
//   const isProd = process.env.NODE_ENV === 'production';
//   res.status(500).json({
//     message: isProd
//       ? 'Something went wrong. Please try again later.'
//       : err.message,
//   });
// });

// app.post('/notes', (req, res) => {
//   console.log(req.body);
//   res.status(201).json({ message: 'Note created' });
// });
app.use(noteFoundHandler);
app.use(errorHandler);
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
