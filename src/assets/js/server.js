
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3000;

// 创建MySQL连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // 修改为你的MySQL用户名
  password: '1234', // 修改为你的MySQL密码
  database: 'finished', // 修改为你的数据库名称
  connectionLimit: 10,
});

// 解析请求体
app.use(bodyParser.json());

// 用户注册路由
app.post('/api/register', (req, res) => {
  const { username, email } = req.body;
  pool.query('INSERT INTO users (username, email) VALUES (?, ?)', [username, email], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: '用户注册失败' });
    } else {
      res.status(201).json({ message: '用户注册成功' });
    }
  });
});


// 获取用户信息路由
app.get('/api/userinfo/:id', (req, res) => {
  const userId = req.params.id;
  pool.query('SELECT * FROM users WHERE id = ?', [userId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: '获取用户信息失败' });
    } else {
      const user = results[0];
      res.json(user);
    }
  });
});

// 启动服务器
app.listen(PORT, () => console.log(`服务器运行在 http://localhost:${PORT}`));
