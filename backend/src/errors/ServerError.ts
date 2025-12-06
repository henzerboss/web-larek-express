// src/errors/ServerError.ts

export default class ServerError extends Error {
  statusCode: number;

  constructor(message = 'Внутренняя ошибка сервера') {
    super(message);
    this.statusCode = 500;
  }
}
