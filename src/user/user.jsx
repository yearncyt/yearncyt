
import React, { useState } from 'react';
import '../assets/css/user.css';

function User() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); // 阻止默认表单提交行为

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email }),
      });

      if (response.ok) {
        console.log('用户注册成功');
      } else {
        console.error('用户注册失败');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-center">
      <h2>用户中心</h2>
      <form onSubmit={handleRegister}>
        <label>用户名:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>邮箱:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">注册</button>
      </form>
    </div>
  );
}

export default User;
