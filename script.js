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

// 桜の花びらアニメーション
class SakuraAnimation {
    constructor() {
        this.container = null;
        this.petals = [];
        this.maxPetals = 35; // 20から35に増加
        this.colors = [
            '#ffb6c1', // ライトピンク
            '#ffc0cb', // ピンク
            '#ff91a4', // ローズピンク
            '#ffffff', // 白
            '#ffe4e1', // ミスティローズ
            '#ffd1dc', // パウダーピンク
        ];
        this.init();
    }

    init() {
        this.createContainer();
        this.addStyles();
        this.startAnimation();
    }

    createContainer() {
        this.container = document.createElement('div');
        this.container.className = 'sakura-container';
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.appendChild(this.container);
        }
    }

    createPetal() {
        const petal = document.createElement('div');
        petal.className = 'sakura-petal';
        
        // ランダムな初期設定
        const startX = Math.random() * (window.innerWidth + 100) - 50;
        const size = Math.random() * 0.4 + 0.6; // 0.6 - 1.0
        const duration = Math.random() * 10 + 15; // 15 - 25秒（より遅く）
        const delay = Math.random() * 5; // 0-5秒の遅延
        const drift = (Math.random() - 0.5) * 250; // 左右の揺れ
        const rotationSpeed = Math.random() * 0.4 + 0.2; // 0.2 - 0.6（より遅い回転）
        const swayIntensity = Math.random() * 80 + 40; // 揺れの強さ 40-120px
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        petal.style.cssText = `
            position: absolute;
            left: ${startX}px;
            top: -30px;
            transform: scale(${size});
            animation: sakuraFall ${duration}s ease-in-out ${delay}s infinite;
            --drift: ${drift}px;
            --rotation-speed: ${rotationSpeed};
            --sway-intensity: ${swayIntensity}px;
            --petal-color: ${color};
        `;
        
        this.container.appendChild(petal);
        
        // 一定時間後に削除
        setTimeout(() => {
            if (petal.parentNode) {
                petal.parentNode.removeChild(petal);
            }
        }, (duration + delay + 1) * 1000);
    }

    startAnimation() {
        // 初期の花びらを生成（より多く）
        for (let i = 0; i < 15; i++) {
            setTimeout(() => this.createPetal(), i * 600);
        }

        // 継続的に花びらを生成（より頻繁に）
        setInterval(() => {
            if (document.querySelectorAll('.sakura-petal').length < this.maxPetals) {
                this.createPetal();
            }
        }, 1500); // 2000から1500に短縮
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .sakura-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                overflow: hidden;
                z-index: 10;
            }

            .sakura-petal {
                width: 14px;
                height: 14px;
                position: relative;
                opacity: 0.9;
                filter: drop-shadow(0 2px 4px rgba(255, 182, 193, 0.3));
            }

            /* 花びらの形状 - より自然な桜の花びら */
            .sakura-petal::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 14px;
                height: 14px;
                background: var(--petal-color, #ffb6c1);
                border-radius: 50% 10% 50% 10%;
                transform: rotate(0deg);
            }

            .sakura-petal::after {
                content: '';
                position: absolute;
                top: 2px;
                left: 2px;
                width: 10px;
                height: 10px;
                background: linear-gradient(45deg, rgba(255, 255, 255, 0.6) 0%, transparent 60%);
                border-radius: 50% 10% 50% 10%;
                transform: rotate(-20deg);
            }

            /* 流れるような滑らかな落下アニメーション */
            @keyframes sakuraFall {
                0% {
                    transform: translateY(-30px) 
                              translateX(0px) 
                              rotate(0deg) 
                              rotateY(0deg);
                    opacity: 0;
                }
                5% {
                    opacity: 0.9;
                }
                95% {
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(110vh) 
                              translateX(calc(var(--drift) + var(--sway-intensity) * sin(4 * 3.14159 * var(--rotation-speed)))) 
                              rotate(calc(360deg * var(--rotation-speed))) 
                              rotateY(180deg);
                    opacity: 0;
                }
            }

            /* 複数のアニメーションパターンを作成 */
            .sakura-petal:nth-child(3n+1) {
                animation-name: sakuraFallPattern1;
            }

            .sakura-petal:nth-child(3n+2) {
                animation-name: sakuraFallPattern2;
            }

            .sakura-petal:nth-child(3n+3) {
                animation-name: sakuraFallPattern3;
            }

            @keyframes sakuraFallPattern1 {
                0% {
                    transform: translateY(-30px) translateX(0px) rotate(0deg);
                    opacity: 0;
                }
                8% {
                    opacity: 0.9;
                }
                92% {
                    opacity: 0.4;
                }
                100% {
                    transform: translateY(110vh) 
                              translateX(calc(var(--drift) + var(--sway-intensity) * sin(2 * 3.14159))) 
                              rotate(calc(180deg * var(--rotation-speed)));
                    opacity: 0;
                }
            }

            @keyframes sakuraFallPattern2 {
                0% {
                    transform: translateY(-30px) translateX(0px) rotate(0deg) rotateY(0deg);
                    opacity: 0;
                }
                6% {
                    opacity: 0.9;
                }
                94% {
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(110vh) 
                              translateX(calc(var(--drift) + var(--sway-intensity) * cos(3 * 3.14159))) 
                              rotate(calc(270deg * var(--rotation-speed))) 
                              rotateY(90deg);
                    opacity: 0;
                }
            }

            @keyframes sakuraFallPattern3 {
                0% {
                    transform: translateY(-30px) translateX(0px) rotate(0deg);
                    opacity: 0;
                }
                7% {
                    opacity: 0.9;
                }
                93% {
                    opacity: 0.4;
                }
                100% {
                    transform: translateY(110vh) 
                              translateX(calc(var(--drift) + var(--sway-intensity) * sin(1.5 * 3.14159))) 
                              rotate(calc(225deg * var(--rotation-speed)));
                    opacity: 0;
                }
            }

            @media (max-width: 768px) {
                .sakura-petal {
                    width: 10px;
                    height: 10px;
                }
                
                .sakura-petal::before {
                    width: 10px;
                    height: 10px;
                }
                
                .sakura-petal::after {
                    width: 7px;
                    height: 7px;
                    top: 1.5px;
                    left: 1.5px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

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

// DOMが読み込まれた後にカルーセルと桜アニメーションを初期化
document.addEventListener('DOMContentLoaded', () => {
    new EventCarousel();
    new SakuraAnimation();
});
