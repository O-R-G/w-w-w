/*
    O-R-G inc.

    windowfull object
    screenfull.js shim for iOS safari
    see https://github.com/sindresorhus/screenfull.js/
*/

(function () {
    'use strict';
    if(!screenfull || typeof screenfull === 'undefined') {
        console.log('screenfull is not defined');
        return;
    }
    document.body.style.position = 'relative';  /* reqd ios overflow: hidden */
    screenfull.extInit = function(container, images = null, isGallery=false, displayCaption=false){
        if(!container) return;
        this.container = container;
        screenfull.currentIndex = false;
        screenfull.elements = {
            container: null,
            img: null,
            caption: null,
            triggers: []
        };
        screenfull.elements.container = container;
        screenfull.isGallery = isGallery;
        screenfull.displayCaption = displayCaption;
        screenfull.timer = null;
        screenfull.images = images ? images : document.querySelectorAll('img:not(.prevent-screenfull)');
        if(!screenfull.images.length) return;
        screenfull.isMultiple = screenfull.images.length !== 1;
        for(let i = 0; i < screenfull.images.length; i++) 
            screenfull.images[i].setAttribute('screenfull-index', i);
        screenfull.renderElements();
        screenfull.getElements();
        screenfull.addListeners();
    };
    screenfull.renderElements = function(){
        this.elements.container.innerHTML += '<div id="screenfull-image-wrapper"><img id="screenfull-image" class="screenfull"></div>';
        if(this.isGallery) {
            this.elements.container.innerHTML += '<div id="screenfull-next-btn" class="screenfull-control-btn no-select"></div>';
            this.elements.container.innerHTML += '<div id="screenfull-prev-btn" class="screenfull-control-btn no-select"></div>';
        }
        this.elements.container.innerHTML += '<div id="screenfull-caption" class="white caption"></div>';
        this.elements.container.innerHTML += '<div id="close-screenfull-btn" class="screenfull-control-btn cross-btn"><img src="/media/svg/x-9-w.svg"></div>';

        if(this.displayCaption)
            this.elements.container.innerHTML += '<div id="screenfull-caption-btn" class="screenfull-control-btn">CAPTION</div>';
        
    };
    screenfull.getElements = function(){
        this.elements.img = document.querySelector('#screenfull-image-wrapper img');
        this.elements.caption = document.querySelector('#screenfull-caption');
        this.elements.closeBtn = document.querySelector('#close-screenfull-btn');
        if(this.isGallery) {
            this.elements.nextBtn = document.querySelector('#screenfull-next-btn');
            this.elements.prevBtn = document.querySelector('#screenfull-prev-btn');
            // this.elements.cursorWrapper = document.querySelector('#screenfull-cursor-wrapper');
        }
        if(this.displayCaption)
            this.elements.captionBtn = document.querySelector('#screenfull-caption-btn');
        // if(this.screenfull && this.screenfull.isEnabled)
        // this.elements.screenfullBtn = document.querySelector('#enter-screenfull-btn');
    };
    screenfull.addListeners = function(){
        for(let i = 0; i < this.images.length; i++ ){
            this.images[i].classList.add('screenfull-trigger');
            this.images[i].addEventListener('click', function () {
                // this.container.style.display = 'block';
                this.extRequest(this.images[i])
                // console.log(this.container);
            }.bind(this));
        }
        if(this.elements.closeBtn) this.elements.closeBtn.addEventListener('click', this.exit.bind(this));
        if(this.isGallery) {
            this.elements.nextBtn.addEventListener('click', this.next.bind(this));
            this.elements.prevBtn.addEventListener('click', this.prev.bind(this));
            window.addEventListener('keydown', function(e){
                if(!document.body.classList.contains('viewing-screenfull')) return;
                if(e.keyCode == 39) 
                    this.next();
                else if(e.keyCode == 37)
                    this.prev();
            }.bind(this));
        }   
        this.on('change', () => {
            console.log(screenfull.isFullscreen);
            if(!screenfull.isFullscreen){
                if(this.timer) clearTimeout(this.timer);
                document.body.classList.remove('viewing-screenfull-caption');
                document.body.classList.remove('viewing-screenfull');
            }
        });
        if(this.displayCaption) {
            this.elements.captionBtn.addEventListener('click', function(){
                document.body.classList.toggle('viewing-screenfull-caption');
            });
        }
        this.elements.container.addEventListener('mousemove', this.delayHidingControls.bind(this));
        this.elements.container.addEventListener('click', this.delayHidingControls.bind(this));
    }
    screenfull.next = function(){
        if(!this.isMultiple && this.currentIndex === this.images.length - 1) {
            this.extExit();
            return;
        }
        this.currentIndex = this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
        this.updateBtnStates();
        this.extRequest(this.images[this.currentIndex]);
    },
    screenfull.prev = function(){
        if(!this.isMultiple && this.currentIndex == 0) {
            this.extExit();
            return;
        }
        this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
        this.updateBtnStates();
        this.extRequest(this.images[this.currentIndex]);
    }
    screenfull.updateBtnStates = function(){
        if(this.currentIndex == 0) this.elements.prevBtn.classList.add('disabled');
        else this.elements.prevBtn.classList.remove('disabled');
        if(this.currentIndex == this.images.length - 1) this.elements.nextBtn.classList.add('disabled');
        else this.elements.nextBtn.classList.remove('disabled');
    }
    screenfull.extRequest = function(element){
        if(element.tagName.toLowerCase() !== 'img' || !this.elements.img || !this.elements.caption) return;
        this.elements.img.src = element.src;
        this.currentIndex = parseInt(element.getAttribute('screenfull-index'));
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
        document.body.classList.add('viewing-screenfull');
        document.body.classList.add('viewing-screenfull-caption');
        this.request(this.container);
    }
    screenfull.extExit = function(element){
        console.log('extExit');
        if(this.timer) clearTimeout(this.timer);
        document.body.classList.remove('viewing-screenfull-caption');
        document.body.classList.remove('viewing-screenfull');
        this.exit();
    }
    screenfull.delayHidingControls = function(){
        this.elements.container.classList.remove('hiding-controls');
        clearTimeout(this.timer);
        this.timer = setTimeout(function(){
            this.elements.container.classList.add('hiding-controls');
            this.timer = null;
        }.bind(this), 1500);
    }
})();
