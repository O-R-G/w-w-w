/*
    O-R-G inc.

    windowfull object
    screenfull.js shim for iOS safari
    see https://github.com/sindresorhus/screenfull.js/
*/
class ScreenfullExtended {
    constructor(screenfull, container, media = null, isGallery = false, displayCaption = false) {
        if(!screenfull || typeof screenfull === 'undefined' || !screenfull.isEnabled) {
            console.log('screenfull is not defined');
            return;
        }
        if (!container) {
            console.log('container passed to ScreefullExtended is not found');
            return;
        }

        this.screenfull = screenfull;
        this.container = container;
        this.media = media ? media : document.querySelectorAll('video:not(.prevent-screenfull), img:not(.prevent-screenfull)');
        if (!this.media?.length) return;

        this.currentIndex = false;
        this.isGallery = isGallery;
        this.displayCaption = displayCaption;
        this.timer = null;
        this.isMultiple = this.media.length !== 1;
        this.elements = {
            container: container,
            img: null,
            caption: null,
            closeBtn: null,
            nextBtn: null,
            prevBtn: null,
            captionBtn: null,
            triggers: []
        };

        this.assignImageIndexes();
        this.renderElements();
        this.getElements();
        this.addListeners();
        this.updateScreenfullState();
    }

    assignImageIndexes() {
        for (let i = 0; i < this.media.length; i++) {
            this.media[i].setAttribute('screenfull-index', i);
        }
    }
    renderElements() {
        this.elements.container.innerHTML += '<div id="screenfull-image-wrapper"><img id="screenfull-image" class="screenfull"></div><div id="screenfull-video-wrapper"><video id="screenfull-video" class="screenfull"></video></div>';
        if (this.isGallery) {
            this.elements.container.innerHTML += '<div id="screenfull-next-btn" class="screenfull-control-btn no-select"></div>';
            this.elements.container.innerHTML += '<div id="screenfull-prev-btn" class="screenfull-control-btn no-select"></div>';
        }
        this.elements.container.innerHTML += '<div id="screenfull-caption" class="white caption"></div>';
        this.elements.container.innerHTML += '<div id="close-screenfull-btn" class="screenfull-control-btn cross-btn"><img src="/media/svg/x-9-w.svg"></div>';

        if (this.displayCaption)
            this.elements.container.innerHTML += '<div id="screenfull-caption-btn" class="screenfull-control-btn">CAPTION</div>';
    }

    getElements() {
        this.elements.img = document.querySelector('#screenfull-image-wrapper img');
        this.elements.video = document.querySelector('#screenfull-video-wrapper video');
        this.elements.caption = document.querySelector('#screenfull-caption');
        this.elements.closeBtn = document.querySelector('#close-screenfull-btn');
        if (this.isGallery) {
            this.elements.nextBtn = document.querySelector('#screenfull-next-btn');
            this.elements.prevBtn = document.querySelector('#screenfull-prev-btn');
        }
        if (this.displayCaption)
            this.elements.captionBtn = document.querySelector('#screenfull-caption-btn');
    }

    addListeners() {
        for (let i = 0; i < this.media.length; i++) {
            const m = this.media[i];
            m.classList.add('screenfull-trigger');
            m.addEventListener('click', () => {
                this.extRequest(m);
            });
            this.elements.triggers.push(m);
        }

        if (this.elements.closeBtn) {
            this.elements.closeBtn.addEventListener('click', () => {
                this.screenfull.extWxit();
            });
        }
        if (this.isGallery && this.elements.nextBtn && this.elements.prevBtn) {
            this.elements.nextBtn.addEventListener('click', () => this.next());
            this.elements.prevBtn.addEventListener('click', () => this.prev());
            window.addEventListener('keydown', (e) => {
                if (!document.body.classList.contains('viewing-screenfull')) return;
                if (e.key == 'ArrowRight')
                    this.next();
                else if (e.key == 'ArrowLeft')
                    this.prev();
            });
        }
        if(!this.isGallery) {
            this.container.addEventListener('click', ()=>{
                this.extExit();
            });
            
        }

        this.screenfull.on('change', () => {
            if (!screenfull.isFullscreen) {
                if (this.timer) clearTimeout(this.timer);
                document.body.classList.remove('viewing-screenfull-caption');
                document.body.classList.remove('viewing-screenfull');
                if(this.container.dataset.type === 'video' && this.elements.video) {
                    this.elements.video.pause();
                    this.elements.video.currentTime = 0;
                }
            }
            this.updateScreenfullState();
        });

        if (this.displayCaption && this.elements.captionBtn) {
            this.elements.captionBtn.addEventListener('click', () => {
                document.body.classList.toggle('viewing-screenfull-caption');
            });
        }

        this.elements.container.addEventListener('mousemove', this.delayHidingControls.bind(this));
        this.elements.container.addEventListener('click', this.delayHidingControls.bind(this));
    }

    next() {
        if (!this.isMultiple && this.currentIndex === this.media.length - 1) {
            this.extExit();
            return;
        }
        this.currentIndex = this.currentIndex === this.media.length - 1 ? 0 : this.currentIndex + 1;
        this.updateBtnStates();
        this.extRequest(this.media[this.currentIndex]);
    }

    prev() {
        if (!this.isMultiple && this.currentIndex == 0) {
            this.extExit();
            return;
        }
        this.currentIndex = this.currentIndex === 0 ? this.media.length - 1 : this.currentIndex - 1;
        this.updateBtnStates();
        this.extRequest(this.media[this.currentIndex]);
    }

    updateBtnStates() {
        if (!this.elements.prevBtn || !this.elements.nextBtn) return;
        if (this.currentIndex == 0) this.elements.prevBtn.classList.add('disabled');
        else this.elements.prevBtn.classList.remove('disabled');
        if (this.currentIndex == this.media.length - 1) this.elements.nextBtn.classList.add('disabled');
        else this.elements.nextBtn.classList.remove('disabled');
    }

    extRequest(element) {
        // console.log('extRequest', element);
        if (!element || (element.tagName.toLowerCase() !== 'img' && element.tagName.toLowerCase() !== 'video') || !this.elements.img || !this.elements.video || !this.elements.caption) return;
        if (element.tagName.toLowerCase() === 'img') {
            this.elements.img.src = element.dataset.screenfullSrc ? element.dataset.screenfullSrc : element.src;
            this.container.dataset.type = 'image';
        } else if (element.tagName.toLowerCase() === 'video') {
            this.elements.video.src = element.dataset.screenfullSrc ? element.dataset.screenfullSrc : element.src;
            this.container.dataset.type = 'video';
            const video = this.elements.video;
            if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
                console.log('already can play--');
                video.play();
                
            } else {
                video.addEventListener('canplay', () => {
                    console.log('canplay--');
                    video.play()
                }, { once: true });
            }
            window.addEventListener('keydown', (e) => {
                if (e.key == 'Space'){
                    if(!video.paused) {
                        video.pause();
                    } else {
                        video.play();
                    }
                }
            });
        }
        this.currentIndex = parseInt(element.getAttribute('screenfull-index'));
        if (this.displayCaption && this.elements.caption && this.elements.captionBtn) {
            if (element.getAttribute('caption')) {
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
        this.screenfull.request(this.container);
        this.updateScreenfullState();
    }

    extExit() {
        if (this.timer) clearTimeout(this.timer);
        document.body.classList.remove('viewing-screenfull-caption');
        document.body.classList.remove('viewing-screenfull');
        if(this.container.dataset.type === 'video' && this.elements.video) {
            this.elements.video.pause();
            this.elements.video.currentTime = 0;
        }
        this.screenfull.exit();
        this.updateScreenfullState();
    }

    delayHidingControls() {
        this.elements.container.classList.remove('hiding-controls');
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.elements.container.classList.add('hiding-controls');
            this.timer = null;
            this.updateScreenfullState();
        }, 1500);
        this.updateScreenfullState();
    }

    updateScreenfullState() {
        this.screenfull.currentIndex = this.currentIndex;
        this.screenfull.elements = this.elements;
        this.screenfull.isGallery = this.isGallery;
        this.screenfull.displayCaption = this.displayCaption;
        this.screenfull.timer = this.timer;
        this.screenfull.images = this.media;
        this.screenfull.isMultiple = this.isMultiple;
        this.screenfull.extInstance = this;
    }
};
