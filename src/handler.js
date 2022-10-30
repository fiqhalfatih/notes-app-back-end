/* eslint-disable consistent-return */
/* eslint-disable quotes */
const { nanoid } = require('nanoid');
const notes = require('./notes');

/* eslint-disable no-unused-vars */
// ini handler add note
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(20);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id.length > 0);

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });

  response.code(500);
  return response;
};

// ini handler bikin notes
const getAllHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

// ini handler buka notes
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// ini handler edit notes yang existing
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  // nge get data notes terbaru
  const { title, tags, body } = request.payload;
  // waktu update terbaru
  const updatedAt = new Date().toISOString();

  // cari index catatan yang mau diubah
  const index = notes.findIndex((note) => note.id === id);

  // kalo index ditemukan (index selain -1)
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  // kalo catatan ga ditemukan (index == -1)
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

// ini handler delete notes yang existing
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  // waktu update terbaru
  const updatedAt = new Date().toISOString();

  // cari index catatan yang mau di-delete
  const index = notes.findIndex((note) => note.id === id);

  // kalo index ditemukan (index selain -1)
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  // kalo catatan ga ditemukan (index == -1)
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
