class ValidationError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}

const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err instanceof ValidationError) {
        return res.status(err.code).json({ message: err.message });
    }

    res.status(500).json({ message: "Внутренняя ошибка сервера" });
};

module.exports = { ValidationError };
