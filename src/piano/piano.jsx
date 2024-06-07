import React, { useState, useEffect } from 'react';
import '../assets/css/piano.css';
import Music from '../music/music';

function Piano() {
    const [hideText, setHideText] = useState(false); // 控制按键提示的显示与隐藏
    const [hideTips, setHideTips] = useState(false); // 控制音节提示的显示与隐藏

    const handleHideText = () => {
        setHideText(!hideText); // 切换状态，实现按键提示的隐藏或显示
    };

    const handleHideTips = () => {
        setHideTips(!hideTips); // 切换状态，实现音节提示的隐藏或显示
    };

    // 定义播放音符的函数
    const playNote = async (note) => {
        const audio = new Audio(note); // 使用导入的音频文件
        await audio.play();
    };
    function handleClick(event) {
        const soundId = event.target.textContent.trim();
        playSound(soundId);
    }

    // 在组件加载完成后为每个键添加点击事件处理程序
    useEffect(() => {
        const addEventListeners = async () => {
            const keyMappings = {
                'C2': '0', 'D2': '1', 'E2': '2', 'F2': '3', 'G2': '4', 'A2': '5', 'B2': '6',
                'C3': '7', 'D3': '8', 'E3': '9',
                'F3': 'Q', 'G3': 'W', 'A3': 'E', 'B3': 'R', 'C4': 'T', 'D4': 'Y', 'E4': 'U',
                'F4': 'I', 'G4': 'O', 'A4': 'P', 'B4': 'A', 'C5': 'S', 'D5': 'D', 'E5': 'F',
                'F5': 'G', 'G5': 'H', 'A5': 'J', 'B5': 'K', 'C6': 'L', 'D6': 'Z', 'E6': 'X',
                'F6': 'C', 'G6': 'V', 'A6': 'B', 'B6': 'N', 'C7': 'M', 'b49': '!', 'b50': '@',
                'b52': '#', 'b53': '$', 'b54': '%', 'b56': '^', 'b57': '&', 'b81': '*', 'b87': '(', 'b69': ')',
                'b84': '_', 'b89': '+', 'b73': '-', 'b79': '=', 'b80': '{', 'b83': '}', 'b68': ';', 'b71': ':',
                'b72': '\'', 'b74': '[', 'b76': ']', 'b90': '|', 'b67': ',', 'b86': '.', 'b66': '/'

            };

            // 动态导入所有音符的音频文件
            const audioFiles = await Promise.all(
                Object.keys(keyMappings).map(async (note) => {
                    const { default: audio } = await import(`../assets/audio/${note}.mp3`);
                    return { note, audio };
                })
            );
            // 为每个键添加点击事件处理程序
            const pianoKeys = document.querySelectorAll('.piano li div');
            pianoKeys.forEach((key, index) => {
                key.addEventListener('click', async () => {
                    await playNote(audioFiles[index].audio); // 播放对应音符的音频文件
                })
            });

            // 添加键盘事件监听器
            document.addEventListener('keydown', (event) => {
                if (event.key) {
                    const keyName = event.key.toUpperCase();
                    const note = Object.keys(keyMappings).find(note => keyMappings[note] === keyName);
                    if (note) {
                        const index = Object.values(keyMappings).indexOf(keyName);
                        playNote(audioFiles[index].audio); // 播放对应音符的音频文件

                        // 设置对应的 div 元素的样式
                        const pianoKey = document.querySelector(`.piano li:contains(${note})`);
                        if (pianoKey) {
                            pianoKey.style.background = 'linear-gradient(45deg, #4c4c4c, #444444)';
                        }
                    }
                }
            });
        };

        addEventListeners(); // 调用添加事件处理程序的函数
    }, []); // 传递空数组作为第二个参数，确保 useEffect 只在组件加载完成后执行一次

    return (
        <div>
            <div>
                <Music />
            </div>
            <div className="piano-container">
                <div className='key-tips'>
                    {/* 定义隐藏/显示按键提示的按钮 */}
                    <div className="toggle checkcross" >
                        <input id="checkcross" type="checkbox" onClick={handleHideText} />
                        <label className="toggle-item" htmlFor="checkcross">
                            <div className="check"></div>
                        </label>
                    </div>
                    <p>显示/隐藏按键提示</p>
                    <div className='key-tips'>
                        {/* 定义隐藏/显示按键提示的按钮 */}
                        <div className="toggle checkcross" >
                            <input id="checkcross2" type="checkbox" onClick={handleHideTips} />
                            <label className="toggle-item" htmlFor="checkcross2">
                                <div className="check"></div>
                            </label>
                        </div>
                        <p>显示/隐藏音节提示</p>
                    </div>
                </div>
                <div className={`piano ${hideText ? 'hide-text' : ''} ${hideTips ? 'hide-text-btn' : ''}`} >
                    <ul>
                        <li>
                            <div>
                                <p>0</p>
                                <p>C2</p>
                            </div>
                            <span>b49</span>
                        </li>
                        <li>
                            <div>
                                <p>1</p>
                                <p>D2</p>
                            </div>
                            <span>b50</span>
                        </li>
                        <li>
                            <div>
                                <p>2</p>
                                <p>E2</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>3</p>
                                <p>F2</p>
                            </div>
                            <span>b52</span>
                        </li>
                        <li>
                            <div>
                                <p>4</p>
                                <p>G2</p>
                            </div>
                            <span>b53</span>
                        </li>
                        <li>
                            <div>
                                <p>5</p>
                                <p>A2</p>
                            </div>
                            <span>b54</span>
                        </li>
                        <li>
                            <div>
                                <p>6</p>
                                <p>B2</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>7</p>
                                <p>C3</p>
                            </div>
                            <span>b56</span>
                        </li>
                        <li>
                            <div>
                                <p>8</p>
                                <p>D3</p>
                            </div>
                            <span>b57</span>
                        </li>
                        <li>
                            <div>
                                <p>9</p>
                                <p>E3</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>Q</p>
                                <p>F3</p>
                            </div>
                            <span>b81</span>
                        </li>
                        <li>
                            <div>
                                <p>W</p>
                                <p>G3</p>
                            </div>
                            <span>b87</span>
                        </li>
                        <li>
                            <div>
                                <p>E</p>
                                <p>A3</p>
                            </div>
                            <span>b69</span>
                        </li>
                        <li>
                            <div>
                                <p>R</p>
                                <p>B3</p>
                            </div>

                        </li>
                        <li>
                            <div>
                                <p>T</p>
                                <p>C4</p>
                            </div>
                            <span>b84</span>
                        </li>
                        <li>
                            <div>
                                <p>Y</p>
                                <p>D4</p>
                            </div>
                            <span>b89</span>
                        </li>
                        <li>
                            <div>
                                <p>U</p>
                                <p>E4</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>I</p>
                                <p>F4</p>
                            </div>
                            <span>b73</span>
                        </li>
                        <li>
                            <div>
                                <p>O</p>
                                <p>G4</p>
                            </div>
                            <span>b79</span>
                        </li>
                        <li>
                            <div>
                                <p>P</p>
                                <p>A4</p>
                            </div>
                            <span>b80</span>
                        </li>
                        <li>
                            <div>
                                <p>A</p>
                                <p>B4</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>S</p>
                                <p>C5</p>
                            </div>
                            <span>b83</span>
                        </li>
                        <li>
                            <div>
                                <p>D</p>
                                <p>D5</p>
                            </div>
                            <span>b68</span>
                        </li>
                        <li>
                            <div>
                                <p>F</p>
                                <p>E5</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>G</p>
                                <p>F5</p>
                            </div>
                            <span>b71</span>
                        </li>
                        <li>
                            <div>
                                <p>H</p>
                                <p>G5</p>
                            </div>
                            <span>b72</span>
                        </li>
                        <li>
                            <div>
                                <p>J</p>
                                <p>A5</p>
                            </div>
                            <span>b74</span>
                        </li>
                        <li>
                            <div>
                                <p>K</p>
                                <p>B5</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>L</p>
                                <p>C6</p>
                            </div>
                            <span>b76</span>
                        </li>
                        <li>
                            <div>
                                <p>Z</p>
                                <p>D6</p>
                            </div>
                            <span>b90</span>
                        </li>
                        <li>
                            <div>
                                <p>X</p>
                                <p>E6</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>C</p>
                                <p>F6</p>
                            </div>
                            <span>b67</span>
                        </li>
                        <li>
                            <div>
                                <p>V</p>
                                <p>G6</p>
                            </div>
                            <span>b86</span>
                        </li>
                        <li>
                            <div>
                                <p>B</p>
                                <p>A6</p>
                            </div>
                            <span>b66</span>
                        </li>
                        <li>
                            <div>
                                <p>N</p>
                                <p>B6</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>M</p>
                                <p>C7</p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );



}

export default Piano;
