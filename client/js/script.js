function updateUn(){
    const frame = document.querySelector('.frame');
    const width = frame.offsetWidth;
    document.documentElement.style.setProperty('--un', (width / 1440) + 'px')
  }
  window.addEventListener('resize', updateUn);
  window.addEventListener('load', updateUn);