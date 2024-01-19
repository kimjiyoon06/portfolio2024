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
    
    let workData;
    const eventXhttp = new XMLHttpRequest();
    eventXhttp.open("GET", "js/workdata.json");
    eventXhttp.send();
    eventXhttp.onreadystatechange = function(event){
        const req = event.target;
        if(req.readyState === XMLHttpRequest.DONE){
            workData = JSON.parse(req.response);
            workSection(workData)
        }
    }
    function workSection(_data){
        let tabList = document.querySelector(".tab-list")
        workData = _data;
        let tabHtml = ``;
        let dataArr = _data.work;
        for(let i = 0; i < dataArr.length; i++){
            let html = `<li>${dataArr[i].catename}</li>`
            tabHtml += html
         }
         tabList.innerHTML = tabHtml
         
         let tabItem = document.querySelectorAll(".tab-list li")
         for(let i = 0; i< dataArr.length; i++){
            tabItem[0].classList.add("active")
            tabItem[i].addEventListener("click", function(){
                for(let j = 0; j < tabItem.length; j++){
                    tabItem[j].classList.remove("active")
                }
                tabItem[i].classList.add("active")
                workSlide(i)
            })
         }
         workSlide(0)

    }
    let workswiper;
    function workSlide(_idx){
        let swWorkhtml = ``
        let listData = workData.work[_idx].list;
        for(let i = 0; i<listData.length; i++){
            let obj = listData[i];
            let html = `
                <li class="swiper-slide">
                    <div class="textbox">
                        <h1>${obj.title}</h1>
                        <h2>${obj.text}<h2>
                        <p>작업기간 : ${obj.period}</p>
                        
                    </div>
                    <div class="imgbox">
                        <img src="https://img.youtube.com/vi/${obj.vidoid}/maxresdefault.jpg" alt="${obj.alt}">
                    </div>
                    
                </li> 
            `;
            swWorkhtml += html 

        }
        let swWorkWrapper = document.querySelector(".sw-work ul")
        swWorkWrapper.innerHTML = swWorkhtml

        workswiper = new Swiper(".sw-work",{
            slidesPerView: 1,
            spaceBetween: 15,
            // effect:"fade"
        })

    }
}


// window.onload = function(){}는 1번만 사용가능 
// script파일 2개이상일때
// window.addEventListener('load', function(){});