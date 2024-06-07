import React, { useState } from 'react';
import songs from '../assets/js/song';
import '../assets/css/music.css';

const Music = () => { // 定义音乐组件
  const [selectedSong, setSelectedSong] = useState(null); // 使用useState钩子来管理选定的歌曲
  const [showOptions, setShowOptions] = useState(true); // 使用useState钩子来管理是否显示选项

  const handleSongClick = (index) => { // 定义处理歌曲点击事件的函数
    setSelectedSong(songs[index]); // 设置选定的歌曲
    setShowOptions(false); // 将选项设置为不显示
  };

  const handleReturnClick = () => { // 定义处理返回点击事件的函数
    setSelectedSong(null); // 清空选定的歌曲
    setShowOptions(true); // 将选项设置为显示
  };

  return (
    <div className='music-container'>
      <div className='music'>
        {showOptions ? ( // 如果显示选项
          <div>
            <h2>歌曲列表</h2> {/* 显示歌曲列表标题 */}
            <ul>
              {songs.map((song, index) => ( // 映射歌曲数据列表，为每首歌曲创建一个<li>元素
                <li key={index} onClick={() => handleSongClick(index)} style={{ cursor: 'pointer' }}> {/* 设置每个<li>元素的点击事件 */}
                  {song.name} {/* 显示歌曲名称 */}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <button onClick={handleReturnClick}>返回</button> {/* 显示返回按钮，并设置点击事件 */}
            {selectedSong && ( // 如果有选定的歌曲
              <div className='song-details'>
                <h2>{selectedSong.name}</h2> {/* 显示选定的歌曲名称 */}
                <p style={{ whiteSpace: 'pre-line' }}>{selectedSong.content}</p> {/* 显示选定的歌曲内容 */}
                {/* 其他歌曲信息 */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Music; // 导出音乐组件
