function ScreenNews(){}ScreenNews.screen=document.createElement("div");ScreenNews.screen.id="screen-news";ScreenNews.screen.className="article-screens";ScreenNews.items=null;ScreenNews.currentItem=null;ScreenNews.itemsPerPage=5;ScreenNews.prevButton=null;ScreenNews.nextButton=null;ScreenNews.hamlScreen=Haml.compile('div(id="news-menu" class="separate-menu" style="background-color: #fbc488")','  div(id="top-bar")','    div(id="close-icon" class="icon leaf")','    div(id="close-text") Click to close','  div(id="bottom-bar")','    div(class="icon leaf")','    div(class="text") News','div(id="content")','  div(id="content-wrap")','    div(id="content-wrapper")',"      | #{rows}",'  div(id="paging")','    div(id="prev" class="paging-button" style="color: #e8cfbc") Previous','    div(id="next" class="paging-button" style="color: #e8cfbc") Next','div(id="item-content" style="background-color: #fbc488")','  div(id="main-content") ','    div(id="item-title")','    div(id="item-full-des")','  div(id="close-button" style="background-color: #fbc487")','    div(id="close-icon")');ScreenNews.hamlRow=Haml.compile('div(class="row" style="background-color: #fbc488" data-index="#{index}")','  div(class="thumbnail-wrapper" style="background-color: #fde98a")','    img(class="thumbnail" src="#{image}")','  div(class="right-content")','    div(class="title" style="color: #3c3c3c") #{title}','    div(class="short-des" style="color: #7c6852") #{shortDes}');ScreenNews.start=function(){ajax("/news",{timeStamp:Date.now()},function(a){var b=JSON.parse(a);ScreenNews.items=b.data;ScreenNews.screen.innerHTML=ScreenNews.hamlScreen({rows:ScreenNews.createRows(ScreenNews.paging(0))});ScreenNews.enableRows(ScreenNews.screen.getElementsByClassName("row"));ScreenNews.prevButton=ScreenNews.screen.querySelector("#prev");ScreenNews.nextButton=ScreenNews.screen.querySelector("#next");ScreenNews.initPagingButtons();ScreenNews.currentItem=ScreenNews.screen.querySelector("#content-wrapper");Button.enable(ScreenNews.prevButton,ScreenNews.prev);Button.enable(ScreenNews.nextButton,ScreenNews.next);Button.enable(ScreenNews.screen.querySelector("#news-menu"),function(){ScreenManager.setScreen("main")})},function(a){alert("There was a problem connecting to the server. Please refresh and try again later.")})};ScreenNews.paging=function(a){return ScreenNews.items.slice(a*ScreenNews.itemsPerPage,(a+1)*ScreenNews.itemsPerPage)};ScreenNews.prev=function(b){var a=b.getAttribute("data-page");if(a!=-1){$(ScreenNews.currentItem).html(ScreenNews.createRows(ScreenNews.paging(parseInt(a)))).hide().slideDown(700,function(){var c=ScreenNews.currentItem.getElementsByClassName("row");ScreenNews.enableRows(c)});if(a==0){ScreenNews.prevButton.setAttribute("data-page",-1)}else{ScreenNews.prevButton.setAttribute("data-page",parseInt(a)-1)}ScreenNews.nextButton.setAttribute("data-page",parseInt(a)+1)}};ScreenNews.next=function(b){var a=b.getAttribute("data-page");if(a!=-1){$(ScreenNews.currentItem).html(ScreenNews.createRows(ScreenNews.paging(parseInt(a)))).hide().slideDown(700,function(){var c=ScreenNews.currentItem.getElementsByClassName("row");ScreenNews.enableRows(c)});if(ScreenNews.prevButton.getAttribute("data-page")!=-1){ScreenNews.prevButton.setAttribute("data-page",parseInt(a)-1)}else{ScreenNews.prevButton.setAttribute("data-page","0")}if(a>=ScreenNews.maxPage-1){ScreenNews.nextButton.setAttribute("data-page",-1)}else{ScreenNews.nextButton.setAttribute("data-page",parseInt(a)+1)}}};ScreenNews.initPagingButtons=function(){ScreenNews.maxPage=Math.ceil(ScreenNews.items.length/ScreenNews.itemsPerPage);ScreenNews.prevButton.setAttribute("data-page",-1);if(ScreenNews.maxPage>1){ScreenNews.nextButton.setAttribute("data-page",1)}else{ScreenNews.nextButton.setAttribute("data-page",-1)}};ScreenNews.createRows=function(a){var c="";for(var b=0;b<a.length;b++){c+=ScreenNews.hamlRow({image:"img/"+a[b].thumbnailUrl,title:a[b].title,shortDes:ScreenNews.trimContent(a[b].shortDes),index:a[b]._id})}return c};ScreenNews.enableRows=function(a){for(var b=0;b<a.length;b++){Button.enable(a[b],function(f){var d;for(var c=0;c<ScreenNews.items.length;c++){if(ScreenNews.items[c]._id.toString()==f.getAttribute("data-index")){a=ScreenNews.items[c]}}$("#item-title").html(a.title);$("#item-full-des").html(a.content);$("#content").hide(300);$("#item-content").show(300);Button.enable(ScreenNews.screen.querySelector("#close-button"),function(){$("#item-content").hide(300);$("#content").show(300)})})}};ScreenNews.trimContent=function(a){var b=false;a=stripHTML(a);while(a.length>175){b=true;a=a.substring(0,a.lastIndexOf(" "))}if(b){a+='... <span style="font-style:italic; font-size: 0.8em">see more >></span>'}return a};