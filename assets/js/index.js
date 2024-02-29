let targets = document.querySelectorAll('.column');

// Intersection Observerの設定
let options = {
    // ビューポートを基準にする
    root: null,
    // マージン不要
    rootMargin: '0px',
    // 目標の要素がビューポートの50%を超えたらコールバック実行
    threshold: 0.5
};

// コールバック forEachで分割していから呼び出されている
let callback = (entries, observer) => {
    entries.forEach(entry => {
        let h2 = entry.target.querySelector('h2');
        let p = entry.target.querySelector('p');
        if (entry.isIntersecting) {
            // classList.add
            // もしもtargetがビューポートに入ったら行う処理
            // divタグの処理
            entry.target.classList.add('visible');

            // h2,pタグの処理
            if (h2) h2.classList.add('slide-in');
            if (p) p.classList.add('slide-in');
        } else {
            // classList.remove
            entry.target.classList.remove('visible');
            // h2,pタグ
            if (h2) h2.classList.remove('slide-in');
            if (p) p.classList.remove('slide-in');
        }
    })
}

// Intersection Observerのインスタンス化
// 使う処理callback + 割り当てる値options
let observer = new IntersectionObserver(callback, options);

// 監視を開始(要素を指定) 要素が2つあるのでforEachで回す
targets.forEach(target => {
    observer.observe(target);
});

let button = document.querySelector('#back-to-top');
window.addEventListener('scroll', () => {
    let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition > 100) {
        button.style.display = 'block';
    }
    else {
        button.style.display = 'none';
    }
})

button.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
})

// 選択したらメニューを閉じる
let toggler = document.querySelector('.toggler');
let menu = document.querySelector('.menu');
menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        toggler.checked = false;
    }
});