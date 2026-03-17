export default function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';
  const payload = { status: 'error', message };

  if (process.env.NODE_ENV === 'development') {
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
}
