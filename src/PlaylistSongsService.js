const { Pool } = require('pg');
const SongPlaylistResponse = require('./SongPlaylistResponse');

class PlaylistSongsService {
  constructor() {
    this.pool = new Pool();
  }

  async getSongPlaylist(id, owner) {
    const query = {
      text: `SELECT pl.id, s.id as song_id, s.title, s.performer, pl.name
      FROM playlist_songs ps
      LEFT JOIN playlists pl ON pl.id = ps.playlist_id
      LEFT JOIN song s ON s.id = ps.song_id
      LEFT JOIN users us ON us.id = pl.owner
      WHERE ps.playlist_id = $1 AND pl.owner = $2
      `,
      values: [id, owner],
    };

    const { rows } = await this.pool.query(query);

    return SongPlaylistResponse(rows);
  }
}

module.exports = PlaylistSongsService;
