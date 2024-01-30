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

        let modal = document.querySelector(".modal")
        let modalCont = document.querySelector(".modal-cont")
        let body = document.querySelector("body")
        let workData;
        const workXttp = new XMLHttpRequest();
        workXttp.open("GET", "js/workdata.json");
        workXttp.send();
        workXttp.onreadystatechange = function(event){
            const req = event.target;
            if(req.readyState === XMLHttpRequest.DONE){
                workData = JSON.parse(req.response);
                parseWork(workData);
            }
        };

        function parseWork(_data){
            let workCate = document.querySelector(".portfolio .tab-list");
            workData = _data;
            let tabHtml = ``;
            let dataArr = _data.work;
            for(let i = 0; i < dataArr.length; i++){
                let html = `<li><a href="#">${dataArr[i].catename}</a></li>`;
                tabHtml += html;
            }
            workCate.innerHTML = tabHtml;

            let tabs = document.querySelectorAll(".portfolio .tab-list li");
            for(let i = 0; i < dataArr.length; i++){
                tabs[0].classList.add("active");
                console.log(tabs[i]);
                tabs[i].addEventListener("click",function(event){
                    event.preventDefault();
                    workSlide(i)
                    for(let j = 0; j<tabs.length; j++){
                        tabs[j].classList.remove("active");
                    }
                    this.classList.add("active")
                    
                })
                
            }
            workSlide(0)
            
        }
        let workSwiper;
        function workSlide(_idx){
            let swworkHtml = ``;
            let listData = workData.work[_idx].list;
            for(let i = 0; i < listData.length; i++){
                let obj = listData[i];
                let html = `
                    <li class="swiper-slide">
                        
                        <div class="txtbox">
                            <h1 class="title">${obj.title}</h1>
                            <h2 class="text">${obj.text}</h2>
                            <p class="period" 
                                ${obj.period ? "style='display:block'" : "style='display:none'"}>
                                ${obj.period}<br><span>${obj.period2}</span>
                            </p>
                            <div class="skills">
                                <h3>사용툴</h3>
                                <ul class="skill-wrap">
                                    <li ${obj.afterEffect ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/Adobe-After-Effects.png" alt="">
                                    </li>
                                    <li ${obj.premiere ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/Adobe-Premiere-img.png" alt="">
                                    </li>
                                    <li ${obj.css ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/CSS-img.png" alt="">
                                    </li>
                                    <li ${obj.html ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/HTML-img.png" alt="">
                                    </li>
                                    <li ${obj.illust ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/Adobe-Illustrator-img.png" alt="">
                                    </li>
                                    <li ${obj.photoshop ? "style='display:block'" : "style='display:none'"}>
                                        <img src="img/Adobe-Photoshop-img.png" alt="">
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="right-cont">
                            <div class="imgbox">
                                <img src="https://img.youtube.com/vi/${obj.videoid}/maxresdefault.jpg" alt="${obj.alt}" ${obj.videoid ? "style='display:block'" : "style='display:none'"}>
                                <img src="img/${obj.imgurl}" alt="${obj.alt}" ${obj.imgurl ? "style='display:block'" : "style='display:none'"}>
                            </div>
                            <div class="view-btn">
                                <p>VIEW</p>
                            </div>
                        </div>
                        <div class="modal-view">
                            <div class="view-img" ${obj.imgurl ? "style='display:block'" : "style='display:none'"}>
                                <img src="img/${obj.imgurl}" alt="">
                            </div>
                            <div class="view-player" ${obj.videoid ? "style='display:block'" : "style='display:none'"}>
                                <iframe src="https://www.youtube.com/embed/${obj.videoid}" allowfullscreen></iframe>
                            </div>
                        </div>
                    </li>
                `;
                swworkHtml += html;
            }
            let swworkWrapper = document.querySelector(".sw-work .swiper-wrapper");
            swworkWrapper.innerHTML = swworkHtml;
            
            if(workSwiper){
                workSwiper.destroy();
            }
            workSwiper = new Swiper(".sw-work", {
                slidesPerView: 1,
            })

            // 썸네일 클릭 > 모달 오픈
            
            let workItem = document.querySelectorAll(".sw-work li")
            workItem.forEach(function(item, index){
                item.addEventListener("click", function(){
                    let obj = workData.work[_idx].list[index];
                    modal.classList.add("active")
                    modalCont.innerHTML = item.querySelector(".modal-view").innerHTML;
                    setTimeout(function(){
                        modalCont.classList.add("active")
                    },500)
                    body.classList.add("scrollfix")
                })
            })
            modal.addEventListener("click", function(){
                modal.classList.remove("active")
                modalCont.classList.remove("active")
                body.classList.remove("scrollfix")
                modalCont.innerHTML = ``
            })
        }
    
    
}


// window.onload = function(){}는 1번만 사용가능 
// script파일 2개이상일때
// window.addEventListener('load', function(){});