export class AppError extends Error {
  code: number

  constructor(code: number, message: string) {
    super(message)
    this.code = code
    this.name = 'AppError' // For differentiating error types
  }
}