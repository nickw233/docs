document.addEventListener('DOMContentLoaded', () => {
  const imageLoader = document.getElementById('imageLoader');
  const sheetMusicImage = document.getElementById('sheetMusicImage');
  const zoomInButton = document.getElementById('zoomIn');
  const zoomOutButton = document.getElementById('zoomOut');
  const scrollSpeedInput = document.getElementById('scrollSpeed');
  const startScrollButton = document.getElementById('startScroll');
  const stopScrollButton = document.getElementById('stopScroll');
  const speedValueDisplay = document.getElementById('speedValueDisplay'); // 获取新增的span元素
  const imageContainer = document.querySelector('.image-container');

  let currentScale = 1;
  let scrollInterval;
  let isScrolling = false;

  // 更新速度显示函数
  function updateSpeedDisplay() {
    if (speedValueDisplay) {
      speedValueDisplay.textContent = scrollSpeedInput.value;
    }
  }

  // 初始化速度显示
  updateSpeedDisplay();

  // 监听滚动速度输入变化
  scrollSpeedInput.addEventListener('input', updateSpeedDisplay);

  imageLoader.addEventListener('change', event => {
    console.log('imageLoader change event triggered');
    const file = event.target.files[0];
    if (file) {
      console.log('文件已选择:', file.name, file.type, file.size);
      const reader = new FileReader();

      reader.onload = e => {
        console.log('FileReader onload 事件触发');
        if (e.target.result) {
          console.log('Data URL 长度:', e.target.result.length);
          sheetMusicImage.src = e.target.result;
          console.log('sheetMusicImage.src 已设置');
          sheetMusicImage.style.display = 'block'; // Ensure visibility

          setTimeout(() => {
            if (sheetMusicImage.src === e.target.result) {
              console.log('src 属性成功更新。');
            } else {
              console.error('src 属性未能更新。当前 src:', sheetMusicImage.src);
            }
          }, 0);

          sheetMusicImage.style.transform = 'scale(1)';
          currentScale = 1;
          imageContainer.scrollTop = 0;
        } else {
          console.error('FileReader onload: e.target.result 为空。');
        }
      };

      reader.onerror = errorEvent => {
        console.error('FileReader onerror 事件触发', errorEvent);
        if (errorEvent.target && errorEvent.target.error) {
          console.error('FileReader 错误详情:', errorEvent.target.error);
        }
        const errorMessage =
          errorEvent.target && errorEvent.target.error
            ? errorEvent.target.error.message
            : '未知错误';
        alert('读取文件时发生错误: ' + errorMessage);
      };

      reader.onprogress = progressEvent => {
        if (progressEvent.lengthComputable) {
          const percentLoaded = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          console.log(`FileReader onprogress: 已加载 ${percentLoaded}%`);
        }
      };

      console.log('调用 reader.readAsDataURL(file)');
      reader.readAsDataURL(file);
    } else {
      console.log('未选择文件或 event.target.files 为空。');
    }
  });

  zoomInButton.addEventListener('click', () => {
    currentScale += 0.1;
    sheetMusicImage.style.transform = `scale(${currentScale})`;
  });

  zoomOutButton.addEventListener('click', () => {
    if (currentScale > 0.2) {
      // Prevent zooming out too much
      currentScale -= 0.1;
      sheetMusicImage.style.transform = `scale(${currentScale})`;
    }
  });

  startScrollButton.addEventListener('click', () => {
    if (isScrolling || sheetMusicImage.src === '#' || sheetMusicImage.src === '') return;
    isScrolling = true;
    const speed = parseInt(scrollSpeedInput.value, 10);
    scrollInterval = setInterval(() => {
      imageContainer.scrollTop += 1; // Scroll 1 pixel at a time
      // Stop scrolling if it reaches the bottom
      if (imageContainer.scrollTop + imageContainer.clientHeight >= imageContainer.scrollHeight) {
        clearInterval(scrollInterval);
        isScrolling = false;
      }
    }, 100 / speed); // Adjust interval based on speed (lower is faster)
  });

  // scrollSpeedInput.addEventListener('input', updateSpeedDisplay); // 这行已经移到上面了，避免重复

  stopScrollButton.addEventListener('click', () => {
    clearInterval(scrollInterval);
    isScrolling = false;
  });
});
