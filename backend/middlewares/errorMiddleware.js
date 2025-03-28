import { CustomError } from "../errors/customErrors.js";

function errorMiddleware(err, req, res, next) {
    console.error(err.stack);

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Внутренняя ошибка сервера';
    let errors = [];

    if (err instanceof CustomError) {
        statusCode = err.statusCode;
        message = err.message;
    }

    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Ошибка валидации данных';
        errors = Object.values(err.errors).map(val => val.message);
    }

    if (err.name === 'MongoError' && err.code === 11000) {
        statusCode = 409;
        message = 'Дублирующиеся данные';
        errors.push('Запись с такими данными уже существует.');
    }

    if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        message = 'Не авторизован';
    }

    res.status(statusCode).json({
        error: {
            message: message,
            errors: errors.length ? errors : undefined,
        },
    });
}

export default errorMiddleware;