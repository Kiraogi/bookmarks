const siteUrl = '//127.0.0.1:8000/';
const styleUrl = siteUrl + 'static/css/bookmarklet.css';
const minWidth = 250;
const minHeight = 250;

// Загрузка CSS
var head = document.getElementsByTagName('head')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = styleUrl + '?r=' + Math.floor(Math.random()*9999999999999999);
head.appendChild(link);

// Загрузка HTML
var body = document.getElementsByTagName('body')[0];
boxHtml = `
<div id="bookmarklet">
<a href="#" id="close">&times;</a>
<h1>Select an image to bookmark:</h1>
<div class="images"></div>
</div>`;
body.innerHTML += boxHtml;

function bookmarkletLaunch() {
    bookmarklet = document.getElementById('bookmarklet');
    var imagesFound = bookmarklet.querySelector('.images');

    // Очистить найденные изображения
    imagesFound.innerHTML = '';
    // Показать букмарклет
    bookmarklet.style.display = 'block';
    // Событие закрытия
    bookmarklet.querySelector('#close').addEventListener('click', function(){
        bookmarklet.style.display = 'none'
    });

    // Найти изображение в DOM с минимальными размерами
    images = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]');
    images.forEach(image => {
        if(image.naturalWidth >= minWidth 
            && image.naturalHeight >= minHeight)
            {
                var imageFound = document.createElement('img');
                imageFound.src = image.src;
                imagesFound.append(imageFound);
            }
        })
    
    // Событие выбора изображения
    imagesFound.querySelectorAll('img').forEach(image => {
        image.addEventListener('click', function(event){
            imageSelected = event.target;
            bookmarklet.style.display = 'none';
            window.open(siteUrl + 'images/create/?url='
                + encodeURIComponent(imageSelected.src)
                + '&title='
                + encodeURIComponent(document.title),
                '_blank');
        })
    })
}

// Запустить букмарклет
bookmarkletLaunch();
