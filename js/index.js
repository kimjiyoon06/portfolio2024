window.onload = function(){
    document.addEventListener("scroll",function(){
        let scrollPosition = window.scrollY;
        let sectionItem = document.querySelectorAll("section");
        sectionItem.forEach(function(item){
            let sectionTop = item.offsetTop - 100;
            let sectionHeight = item.clientHeight;

            if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight){
                let sectionId = item.id
                document.querySelector("header ul li.active").classList.remove("active")
                document.querySelector("header ul li a[href = '#"+sectionId+"']").parentNode.classList.add("active")
            }
        })
    })
    

        
    
            let header = document.querySelector(".header")
            window.addEventListener("scroll", function() {
                let scrollPosition = window.scrollY;
                let aobutSection = document.querySelector(".about").offsetTop;
                if (scrollPosition > aobutSection) {
                    header.classList.add("active")
                }else{
                    header.classList.remove("active")
                }
            });

            //모바일 메뉴 버튼
            let moMenuBtn = document.querySelector(".mo-menu-btn")
            let sideMenu = document.querySelector(".side-menu")
            moMenuBtn.addEventListener("click", function(){
                sideMenu.classList.toggle("active")
                this.classList.toggle("active")
            })
            window.addEventListener("resize",function(){
                let winWidth = window.innerWidth
                if(winWidth > 768){
                    sideMenu.classList.remove("active")
                    moMenuBtn.classList.remove("active")
                }
            })
}


// window.onload = function(){}는 1번만 사용가능 
// script파일 2개이상일때
// window.addEventListener('load', function(){});