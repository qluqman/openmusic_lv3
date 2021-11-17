const mapDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  inserted_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});

const mapDBToPlaylists = ({ id, name, username }) => ({
  id,
  name,
  username,
});

const mapDBToPlaylistSongs = ({ id, title, performer }) => ({
  id,
  title,
  performer,
});

module.exports = {
  mapDBToModel,
  mapDBToPlaylists,
  mapDBToPlaylistSongs,
};