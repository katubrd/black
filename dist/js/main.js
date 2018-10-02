// Menu Animation Items
const menuBtn = document.querySelector('.menu-btn'),
    menu = document.querySelector('.menu'),
    menuNav = document.querySelector('.menu-nav'),
    navItems = document.querySelectorAll('.nav-item');

// Set Initial State of Menu
let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    if (!showMenu) {
        menuBtn.classList.add('close');
        menu.classList.add('show');
        menuNav.classList.add('show');
        navItems.forEach(item => item.classList.add('show'));

        showMenu = true;
    } else {
        menuBtn.classList.remove('close');
        menu.classList.remove('show');
        menuNav.classList.remove('show');
        navItems.forEach(item => item.classList.remove('show'));

        showMenu = false;
    }
}

// Fadeout Home Header Section

const homeHeader = document.querySelector('.description__container'),
    scrollTopBtn = document.querySelector('.scroll-top'),
    vH = document.documentElement.clientHeight || window.innerHeight;

window.addEventListener('scroll', fade);

function fade() {
    let bodyScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (bodyScrollTop >= 170) {
        homeHeader.classList.add('fade-out');
        scrollTopBtn.classList.add('fade-in');
    } else {
        homeHeader.classList.remove('fade-out');
        scrollTopBtn.classList.remove('fade-in');
    }
}

//------------------------------------------
//---------------COUNTER------------------
//------------------------------------------

window.addEventListener('scroll', countingItems);
let flag = false;

function countingItems() {
    const counter = document.querySelector('.facts').getBoundingClientRect();
    let bodyScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (bodyScrollTop + (document.documentElement.clientHeight || window.innerHeight) > counter.top) {
        let go = 0;
        countingUp(go);
    }
}

function countingUp(go) {

    if (flag == false && go == 0) {
        const facts = document.querySelectorAll(".facts__item"),
            ELEM = Object.freeze({
                PROJECTS: '150',
                AWARDS: '28',
                COFFEE: '350',
                CLIENTS: '285'
            });

        for (let i = 0; i < facts.length; i++) {
            let fact = facts[i].querySelector("p.number");
            fact.innerHTML = 0;
            setInterval(function() {
                if (fact.innerHTML < parseInt(Object.values(ELEM)[i])) {
                    fact.innerHTML++;
                }
            }, 17);
        }
        go++;
        flag = true;
    }
}

//--------------------------------
//------------ Smooth Scroll------
//--------------------------------
const links = document.links,

    //getting html
    html = document.documentElement,

    //getting body
    body = document.body;

for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
        //getting current scroll position
        var scrollTop = Math.round(body.scrollTop || html.scrollTop);
        if (this.hash !== "") {
            //preventing default anchor click behavior
            event.preventDefault();

            //getting element with id found in hash
            var hashElement = document.getElementById(this.hash.substring(1));

            var hashElementTop = 0;
            var obj = hashElement;
            while (obj.offsetParent) {
                hashElementTop += obj.offsetTop;
                obj = obj.offsetParent;
            }
            //getting element's position
            hashElementTop = Math.round(hashElementTop);

            scroll(scrollTop, hashElementTop, this.hash);
        }
    });
}

function scroll(from, to, hash) {
    var timeInterval = 7; //in ms
    var prevScrollTop;
    var increment = to > from ? 10 : -10;

    var scrollByPixel = setInterval(function() {
        //getting current scroll position
        var scrollTop = Math.round(body.scrollTop || html.scrollTop);

        if (
            prevScrollTop == scrollTop ||
            (to > from && scrollTop >= to) ||
            (to < from && scrollTop <= to)
        ) {
            clearInterval(scrollByPixel);
            //Add hash to the url after scrolling
            window.location.hash = hash;
        } else {
            body.scrollTop += increment;
            html.scrollTop += increment;

            prevScrollTop = scrollTop;
        }
    }, timeInterval);
}

//------------------------------------------
//---------------SLIDESHOW------------------
//------------------------------------------

const slides = document.querySelectorAll('.slides .slide'),
    slideInterval = setInterval(nextSlide, 5000);
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].className = 'slide showing';
}

//--------------------------------
//------------ GALLERY FILTER-----
//--------------------------------

const allBtn = document.getElementById('all'),
    brandingBtn = document.getElementById('branding'),
    identityBtn = document.getElementById('identity'),
    packingBtn = document.getElementById('packing'),
    printBtn = document.getElementById('print'),
    galleryItems = document.getElementsByClassName('gallery__item');

allBtn.addEventListener("click", function() {
    for (let item of galleryItems) {
        if (item.classList.contains("hide")) {
            item.classList.remove("hide");
        }
    }
});
brandingBtn.addEventListener("click", function() {
    filterImgs("branding");
}, false);
identityBtn.addEventListener("click", function() {
    filterImgs("identity");
}, false);
packingBtn.addEventListener("click", function() {
    filterImgs("packing");
}, false);
printBtn.addEventListener("click", function() {
    filterImgs("print");
}, false);

function filterImgs(type) {
    for (let item of galleryItems) {
        if (item.dataset.gallery === type) {
            item.classList.remove("hide");
        } else {
            item.classList.add("hide");
        }
    }
}