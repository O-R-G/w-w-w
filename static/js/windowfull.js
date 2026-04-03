/*
    O-R-G inc.

    windowfull object
    screenfull.js shim for iOS safari
    see https://github.com/sindresorhus/screenfull.js/
*/

(function () {
    'use strict';

    var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
    var isCommonjs = typeof module !== 'undefined' && module.exports;
    // var fullwindowImg = document.querySelector('#fullwindow img');
    // var fullwindowCaption = document.querySelector('#fullwindow-caption');    
    document.body.style.position = 'relative';  /* reqd ios overflow: hidden */
    
    var windowfull = {
        media: [],
        currentIndex: false,
        mediaType: '',
        elements: {
            container: null,
            img: null,
            video: null,
            caption: null,
            triggers: [],
            captionBtn: null
        },
        webkitEnterFullscreenEnabled: false,
        init: function(container, media=[], isGallery=false, displayCaption=false){
            if(!container) return;
            this.elements.container = container;
            this.isGallery = isGallery;
            this.displayCaption = displayCaption;
            this.elements.container.dataset.isGallry = this.isGallery ? '1' : '0';
            this.media = media && media.length ? media : document.querySelectorAll('img:not(.prevent-windowfull):not(.prevent-screenfull), video:not(.prevent-windowfull):not(.prevent-screenfull)');
            for(let i = 0; i < this.media.length; i++) 
                this.media[i].setAttribute('windowfull-index', i);
            this.webkitEnterFullscreenEnabled = this.checkWebkitEnterFullscreen();
            console.log('windowfull.webkitEnterFullscreenEnabled', this.webkitEnterFullscreenEnabled);
            this.renderElements();
            this.getElements();
            this.addListeners();
        },
        renderElements: function(){
            let html = '<div id="fullwindow-image-wrapper"><img id="fullwindow-image" class="prevent-windowfull fullwindow"></div><div id="fullwindow-video-wrapper"><video id="fullwindow-video" class="prevent-windowfull fullwindow" playsinline></video></div>';
            if(this.isGallery) {
                html += '<div id="fullwindow-next-btn" class="fullwindow-control-btn"></div>';
                html += '<div id="fullwindow-prev-btn" class="fullwindow-control-btn"></div>';
                html += '<div id="close-fullwindow-btn" class="fullwindow-control-btn cross-btn"><img src="/media/svg/x-6-w.svg"></div>';
            }
            html += '<div id="fullwindow-caption" class="small white"></div>';
            
            if(this.displayCaption)
                html += '<div id="fullwindow-caption-btn" class="fullwindow-control-btn">CAPTION</div>';
            this.elements.container.innerHTML += html;
        },
        getElements: function(){
            this.elements.img = document.querySelector('#fullwindow-image-wrapper img');
            this.elements.video = document.querySelector('#fullwindow-video-wrapper video');
            this.elements.caption = document.querySelector('#fullwindow-caption');
            
            if(this.isGallery) {
                this.elements.closeBtn = document.querySelector('#close-fullwindow-btn');
                this.elements.nextBtn = document.querySelector('#fullwindow-next-btn');
                this.elements.prevBtn = document.querySelector('#fullwindow-prev-btn');
            }
            if(this.displayCaption)
                this.elements.captionBtn = document.querySelector('#fullwindow-caption-btn');
        },
        addListeners: function(){
            for(let i = 0; i < this.media.length; i++ ){
                const type = this.media[i].tagName.toLowerCase();
                if(type !== 'img' && type !== 'video') continue;
                this.media[i].classList.add('fullwindow-trigger');
                this.media[i].addEventListener('click', function () {
                    this.launch(i);
                }.bind(this));
                // this.media[i].addEventListener('fullscreenchange', ()=>{
                //     console.log('fullscreenchange');
                // })
                // this.media[i].addEventListener('webkitfullscreenchange', ()=>{
                //     console.log('webkitfullscreenchange');
                // });
                if(type === 'video' && this.webkitEnterFullscreenEnabled) {
                    
                    this.media[i].addEventListener('webkitendfullscreen', () => {
                        console.log('Video exited fullscreen on iOS Safari.');
                        this.media[i].muted = true;
                        this.media[i].setAttribute('muted', '');
                        // this.media[i].autoplay = true;
                        this.media[i].currentTime = 0;
                        setTimeout(()=>{
                            this.media[i].play().catch(err => {
                                console.error('Play failed:', err);                        
                            });
                        }, 500)
                        
                        this.exit();
                    });
                }
            }
            if(this.elements.closeBtn) this.elements.closeBtn.addEventListener('click', this.exit);
            if(this.isGallery) {
                this.elements.nextBtn.addEventListener('click', this.next.bind(this));
                this.elements.prevBtn.addEventListener('click', this.prev.bind(this));
                window.addEventListener('keydown', function(e){
                    if(!document.body.classList.contains('viewing-fullwindow')) return;
                    if(e.keyCode == 27) 
                        this.exit();
                    else if(e.keyCode == 39) 
                        this.next();
                    else if(e.keyCode == 37)
                        this.prev();
                }.bind(this));
            } else {
                this.elements.container.addEventListener('click', ()=>this.exit());
            }
            if(this.displayCaption) {
                this.elements.captionBtn.addEventListener('click', function(){
                    document.body.classList.toggle('viewing-fullwindow-caption');
                });
            }
            
            
        },
        request: function (element) {
            const elementTag = element.tagName.toLowerCase();
            console.log(elementTag)
            if(
                (elementTag !== 'img' || !this.elements.img || !this.elements.caption) &&
                (elementTag !== 'video' || !this.elements.video || !this.elements.caption)
            ) 
                return;
            console.log(elementTag)
            if(elementTag === 'img') {
                this.elements.img.src = element.src;
                this.mediaType = 'image';
            } else {
                if(this.webkitEnterFullscreenEnabled) {
                    element.currentTime = 0;
                    element.muted = false;
                    element.removeAttribute('muted');
                    element.webkitEnterFullscreen();
                } else {
                    this.elements.video.src = element.src;
                    this.elements.video.play();
                    this.mediaType = 'video';
                }
                
            }
            this.elements.container.dataset.mediaType = this.mediaType;    
            if(this.displayCaption) {
                if(element.getAttribute('caption')) {
                    this.elements.caption.innerHTML = element.getAttribute('caption');
                    this.elements.caption.classList.remove('empty');
                    this.elements.captionBtn.classList.remove('disabled');
                } else {
                    this.elements.caption.innerHTML = '';
                    this.elements.caption.classList.add('empty');
                    this.elements.captionBtn.classList.add('disabled');
                }
            }
            document.body.classList.add('viewing-fullwindow');
        },
        exit: function () {
            document.body.classList.remove('viewing-fullwindow-caption');
            document.body.classList.remove('viewing-fullwindow');
            if(this.mediaType === 'video' && !this.webkitEnterFullscreenEnabled)
                this.elements.video.pause();
            this.mediaType = '';
            this.elements.container.dataset.mediaType = this.mediaType;
        },
        toggle: function (element) {
            if(element.tagName.toLowerCase() !== 'img' || !this.elements.img || !this.elements.caption) return;
            return this.isFullwindow ? this.exit(element) : this.request(element);
        },
        launch: function(i){
            this.currentIndex = i;
            if(this.isGallery)
                this.updateBtnStates();
            console.log('launching fullwindow for index', i);
            this.request(this.media[i]);
        },
        next: function(){
            if(this.currentIndex == this.media.length - 1) return;
            this.currentIndex ++;
            this.updateBtnStates();
            this.request(this.media[this.currentIndex]);
        },
        prev: function(){
            if(this.currentIndex == 0) return;
            this.currentIndex --;
            this.updateBtnStates();
            this.request(this.media[this.currentIndex]);
        },
        updateBtnStates: function(){
            if(this.currentIndex == 0) this.elements.prevBtn.classList.add('disabled');
            else this.elements.prevBtn.classList.remove('disabled');
            if(this.currentIndex == this.media.length - 1) this.elements.nextBtn.classList.add('disabled');
            else this.elements.nextBtn.classList.remove('disabled');
        },
        checkWebkitEnterFullscreen: function(){
            const video = document.createElement('video');
            return typeof video.webkitEnterFullscreen === 'function';
            // return false;
        }
    };

    Object.defineProperties(windowfull, {
        isFullwindow: {
            get: function () {
                // check if currently fullwindow
                // (by presence of class?
                // or presence of div)
                // return true;
                // return Boolean(document[fn.fullscreenElement]);
                // return Boolean(!(document.getElementById('fullwindow')));
                // return Boolean(document.getElementById('fullwindow'));
                return Boolean(document.body.classList.contains('block'));
            }
        }
    });

    if (isCommonjs) {
        module.exports = windowfull;
    } else {
        window.windowfull = windowfull;
    }
})();
