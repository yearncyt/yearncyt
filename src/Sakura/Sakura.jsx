
import React, { useEffect } from 'react';  // 导入 React 库中的 useEffect 方法
import sakuraImage from '../assets/images/sakura.png'; // 导入樱花图片
import '../assets/css/Sakura.css';  // 导入主页样式表

const Sakura = () => {
  const sakuraNum = 1;  // 设置樱花数量为 1

  useEffect(() => {
    // 设置定时器，每隔3秒创建一次樱花
    const interval = setInterval(() => {
      for (let i = 0; i < sakuraNum; i++) {
        createSakura();  // 调用创建樱花的函数
      }
    }, 600);

    // 清除定时器
    return () => clearInterval(interval);
  }, []);

  
  const createSakura = () => {
    // 创建 img 元素作为樱花
    const sakura = document.createElement('img');
    sakura.src = sakuraImage; // 使用导入的樱花图片
    sakura.className = 'sakura';  // 设置类名为 'sakura'
    document.body.appendChild(sakura);  // 将樱花元素添加到文档中
  
    // 随机生成樱花的位置、动画持续时间和延迟时间
    const randomX = Math.random() * window.innerWidth;  //在浏览器窗口的宽度范围内生成一个随机的水平位置值
    const randomAnimationDuration = 4 + Math.random() * 4;  //生成一个范围在4到8之间的随机数，用来设置樱花的动画持续时间
    const randomDelay = Math.random() * 4; //生成一个范围在0到4之间的随机数，用来设置樱花的延迟时间
  
    sakura.style.left = `${randomX}px`;  // 设置樱花的水平位置
    sakura.style.animationDuration = `${randomAnimationDuration}s`;  // 设置动画持续时间
    sakura.style.animationDelay = `${randomDelay}s`;  // 设置动画延迟时间
  
    // 添加斜着飘落的动画效果
    sakura.style.animationName = 'falling'; // 使用名为 falling 的动画效果
    sakura.style.animationTimingFunction = 'ease-in'; // 设置动画缓动函数为 ease-in
  
    // 定时删除樱花元素，避免内存泄漏
    setTimeout(() => {
      sakura.remove();  // 删除樱花元素
    }, (randomAnimationDuration + randomDelay) * 1000);  // 计算延迟时间并转换成毫秒
  };
  

  return null;  // 返回空值
};


export default Sakura;  
