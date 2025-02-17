require('dotenv').config();
const express = require('express');  
const cors = require('cors');  

const app = express();  

app.use(express.json()); 
app.use(cors()); 

const PORT = process.env.PORT || 3000;  

app.get('/', (req, res) => {  
    res.json({ message: 'Сервер работает! 🚀' });  
});

app.listen(PORT, () => {  
    console.log(`Сервер запущен на http://localhost:${PORT}`);  
}).on('error', (err) => {  
    console.error('Ошибка запуска сервера:', err.message);  
});

