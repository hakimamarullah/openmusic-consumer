class Listener {
  constructor(playlistSongService, mailSender) {
    this.playlistSongService = playlistSongService;
    this.mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { userId, playlistId, targetEmail } = JSON.parse(message.content.toString());

      const songs = await this.playlistSongService.getSongPlaylist(playlistId, userId);
      const result = await this.mailSender.sendEmail(targetEmail, JSON.stringify(songs));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
