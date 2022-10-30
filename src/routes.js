const {
  addNoteHandler,
  getAllHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

/* eslint-disable no-multiple-empty-lines */
const routes = [
  // ngepost notes
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },

  // munculin notes di list notes
  {
    method: 'GET',
    path: '/notes',
    handler: getAllHandler,
  },

  // munculin isi notes
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },

  // ngedit isi notes
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },

  // ngeapus notes
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
