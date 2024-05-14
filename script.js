document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    const display = document.getElementById('display');
    const calculator = document.querySelector('.calculator');
    const container = document.querySelector('.container');
    let currentInput = '';

    function getRandomSize() {
        return 0.5 + Math.random(); // 0.5배에서 1.5배 사이의 랜덤 크기
    }

    function makeElementDraggable(element) {
        element.onmousedown = function(event) {
            let shiftX = event.clientX - element.getBoundingClientRect().left;
            let shiftY = event.clientY - element.getBoundingClientRect().top;

            element.style.position = 'absolute';
            element.style.zIndex = 1000;

            function moveAt(pageX, pageY) {
                element.style.left = pageX - shiftX + 'px';
                element.style.top = pageY - shiftY + 'px';
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            element.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                element.onmouseup = null;
            };
        };

        element.ondragstart = function() {
            return false;
        };
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.textContent === '=') {
                display.textContent = "loading...";
                setTimeout(() => {
                    display.textContent = "it's okay, don't worry.";
                    
                    // 유튜브 영상 추가
                    const videoContainer = document.createElement('div');
                    videoContainer.classList.add('video-container');
                    videoContainer.style.opacity = 0;
                    videoContainer.style.transition = 'opacity 1s';
                    
                    const iframe = document.createElement('iframe');
                    iframe.width = "560";
                    iframe.height = "315";
                    iframe.src = "https://www.youtube.com/embed/kqPwR39VMh0?si=2scMEElLnFlukXNg&autoplay=1";
                    iframe.title = "YouTube video player";
                    iframe.frameBorder = "0";
                    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                    iframe.referrerPolicy = "strict-origin-when-cross-origin";
                    iframe.allowFullscreen = true;
                    
                    videoContainer.appendChild(iframe);
                    container.appendChild(videoContainer);

                    setTimeout(() => {
                        videoContainer.style.opacity = 1;
                    }, 10);
                    
                    // 이미지 불러오기 및 배치
                    const imageContainer = document.createElement('div');
                    imageContainer.classList.add('image-container');
                    container.appendChild(imageContainer);

                    // 이미지 파일 불러오기 (IMG_0001.JPG ~ IMG_9999.JPG)
                    for (let i = 1; i <= 9999; i++) {
                        const num = String(i).padStart(4, '0');
                        const imgFile = `img/IMG_${num}.JPG`;

                        const frame = document.createElement('div');
                        frame.classList.add('image-frame');

                        const img = new Image();
                        img.src = imgFile;
                        img.alt = `Image ${num}`;
                        img.classList.add('framed-image');
                        img.onload = () => {
                            const sizeFactor = getRandomSize();
                            const elementWidth = 260 * sizeFactor;
                            const elementHeight = img.naturalHeight * (elementWidth / img.naturalWidth);

                            img.style.width = `${elementWidth}px`;
                            img.style.height = `${elementHeight}px`;
                            frame.style.width = `${elementWidth}px`;
                            frame.style.height = `${elementHeight}px`;
                            frame.style.position = 'absolute';
                            frame.style.left = `${Math.random() * (window.innerWidth - elementWidth)}px`;
                            frame.style.top = `${Math.random() * (window.innerHeight - elementHeight)}px`;

                            frame.appendChild(img);
                            imageContainer.appendChild(frame);
                            makeElementDraggable(frame);

                            setTimeout(() => {
                                frame.style.opacity = 1;
                            }, 10);
                        };
                        img.onerror = (e) => {
                            console.error(`Failed to load image: ${imgFile}`, e);
                            frame.remove(); // 이미지 로드 실패 시 요소 제거
                        };
                    }

                }, 2000);
            } else if (button.textContent === 'ON/AC') {
                location.reload(); // 페이지 새로고침
            } else {
                if (display.textContent === "0" || display.textContent === "it's okay, don't worry." || display.textContent === "loading...") {
                    currentInput = button.textContent;
                } else {
                    currentInput += button.textContent;
                }
                display.textContent = currentInput;
            }
        });
    });
});
