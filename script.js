// スクロール時のフェードイン効果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// スクロールで表示される要素を監視
document.querySelectorAll('.scroll-fade').forEach(el => {
    observer.observe(el);
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// カルーセル機能
class EventCarousel {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 4;
        this.carousel = document.querySelector('.carousel-wrapper');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicators = document.querySelectorAll('.carousel-indicator');
        this.isTransitioning = false;
        
        this.init();
    }

    init() {
        // ボタンイベント
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // インジケーターイベント
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // 自動スライド（オプション）
        this.autoSlide();
        
        this.updateCarousel();
    }

    nextSlide() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentSlide++;
        
        if (this.currentSlide >= this.totalSlides) {
            // 最後のスライドから最初へ：一旦次の位置まで移動してから瞬間移動
            this.updateCarouselPosition();
            
            setTimeout(() => {
                this.carousel.style.transition = 'none';
                this.currentSlide = 0;
                this.updateCarouselPosition();
                
                setTimeout(() => {
                    this.carousel.style.transition = 'transform 0.5s ease';
                    this.isTransitioning = false;
                }, 50);
            }, 500);
        } else {
            this.updateCarouselPosition();
            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        }
        
        this.updateIndicators();
    }

    prevSlide() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentSlide--;
        
        if (this.currentSlide < 0) {
            // 最初のスライドから最後へ：一旦前の位置まで移動してから瞬間移動
            this.carousel.style.transition = 'none';
            this.currentSlide = this.totalSlides - 1;
            this.updateCarouselPosition();
            
            setTimeout(() => {
                this.carousel.style.transition = 'transform 0.5s ease';
                this.isTransitioning = false;
            }, 50);
        } else {
            this.updateCarouselPosition();
            setTimeout(() => {
                this.isTransitioning = false;
            }, 500);
        }
        
        this.updateIndicators();
    }

    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        
        this.isTransitioning = true;
        this.currentSlide = index;
        this.updateCarousel();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }

    updateCarousel() {
        this.updateCarouselPosition();
        this.updateIndicators();
    }

    updateCarouselPosition() {
        const translateX = -this.currentSlide * 100;
        this.carousel.style.transform = `translateX(${translateX}%)`;
    }

    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    autoSlide() {
        setInterval(() => {
            if (!this.isTransitioning) {
                this.nextSlide();
            }
        }, 5000); // 5秒ごとに自動切り替え
    }
}

// DOMが読み込まれた後にカルーセルを初期化
document.addEventListener('DOMContentLoaded', () => {
    new EventCarousel();
});
