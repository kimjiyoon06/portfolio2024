window.onload = function(){
    document.addEventListener("scroll",function(){
        let scrollPosition = window.scrollY;
        let sectionItem = document.querySelectorAll("section");
        sectionItem.forEach(function(item){
            let sectionTop = item.offsetTop - 100;
            let sectionHeight = item.clientHeight;

            if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight){
                let sectionId = item.id
                document.querySelector("header ul li.active").
                classList.remove("active")
                document.querySelector("header ul li a[href = '#"+sectionId+"']").parentNode.classList.add("active")
            }
        })
    })
}


// window.onload = function(){}는 1번만 사용가능 
// script파일 2개이상일때
// window.addEventListener('load', function(){});