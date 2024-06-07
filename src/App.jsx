import React from 'react';
import { NavLink, useRoutes } from 'react-router-dom';
import routes from './routes';
import './assets/css/App.css';
import Sakura from './Sakura/Sakura'; 

function App() {
  return (
    <div>
    <div className="navbar"> {/* 添加导航栏的容器，并应用样式 */}
      <div>
        <div>
          <ul>
            <li>
              <NavLink to="/" activeClassName="active">首页</NavLink>
            </li>
            <li>
              <NavLink to="/piano" activeClassName="active">弹钢琴</NavLink>
            </li>
            <li>
              <NavLink to="/user" activeClassName="active">我的</NavLink>
            </li>
          </ul>
        </div>
      </div>
     
      <Sakura sakuraNum={3} />  {/* 传递樱花数量作为 props */}
      </div>
      {useRoutes(routes)}
        {/* 设置路由链接 */}
      </div>
  );
}

export default App;
