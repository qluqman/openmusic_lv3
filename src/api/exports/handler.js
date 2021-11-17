/* eslint-disable import/extensions */
const ClientError = require('../../exceptions/ClientError');

class ExportsHandler {
  constructor(service, validator, playlistsService) {
    this._service = service;
    this._validator = validator;
    this._playlistsService=playlistsService;
    this.postExportPlaylistsHandler = this.postExportPlaylistsHandler.bind(this);
  }
 
  async postExportPlaylistsHandler(request, h) {
    try {
      this._validator.validateExportPlaylistsPayload(request.payload);
      const userId = request.auth.credentials.id
      const playlistId = request.params.playlistId
      await this._playlistsService.verifyPlaylistOwner(playlistId, userId);
 
      const message = {
        targetEmail: request.payload.targetEmail,
        playlistId : request.params.playlistId
      };
 
      await this._service.sendMessage('export:playlists', JSON.stringify(message));
 
      const response = h.response({
        status: 'success',
        message: 'Permintaan Anda dalam antrean',
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
 
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}
 
module.exports = ExportsHandler;