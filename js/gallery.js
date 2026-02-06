(function () {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox.querySelector('.lightbox-img');
  var lightboxCaption = lightbox.querySelector('.lightbox-caption');
  var lightboxCounter = lightbox.querySelector('.lightbox-counter');
  var btnClose = lightbox.querySelector('.lightbox-close');
  var btnPrev = lightbox.querySelector('.lightbox-prev');
  var btnNext = lightbox.querySelector('.lightbox-next');

  var images = [];
  var currentIndex = 0;

  function collectImages() {
    images = [];
    var links = document.querySelectorAll('.gallery-grid a');
    for (var i = 0; i < links.length; i++) {
      var img = links[i].querySelector('img');
      images.push({
        src: links[i].href,
        caption: img ? (img.getAttribute('alt') || '') : ''
      });
    }
  }

  function showImage(index) {
    if (index < 0 || index >= images.length) return;
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightboxImg.alt = images[index].caption;
    lightboxCaption.textContent = images[index].caption;
    lightboxCounter.textContent = (index + 1) + ' / ' + images.length;
    btnPrev.style.visibility = index === 0 ? 'hidden' : 'visible';
    btnNext.style.visibility = index === images.length - 1 ? 'hidden' : 'visible';
  }

  function openLightbox(index) {
    collectImages();
    showImage(index);
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  // Attach click handlers to gallery thumbnails
  document.addEventListener('click', function (e) {
    var link = e.target.closest('.gallery-grid a');
    if (link) {
      e.preventDefault();
      var links = document.querySelectorAll('.gallery-grid a');
      for (var i = 0; i < links.length; i++) {
        if (links[i] === link) {
          openLightbox(i);
          break;
        }
      }
    }
  });

  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', function () { showImage(currentIndex - 1); });
  btnNext.addEventListener('click', function () { showImage(currentIndex + 1); });

  // Close on background click
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.classList.contains('lightbox-img-wrap')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    if (lightbox.style.display !== 'block') return;
    if (e.key === 'Escape' || e.keyCode === 27) closeLightbox();
    if (e.key === 'ArrowLeft' || e.keyCode === 37) showImage(currentIndex - 1);
    if (e.key === 'ArrowRight' || e.keyCode === 39) showImage(currentIndex + 1);
  });
})();
