
  var length = 1;
      function isScrollbarAtBottom() {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var minHeightThreshold = 1 // Adjust the minimum height threshold as per your requirements
        return scrollTop + clientHeight >= scrollHeight - minHeightThreshold;
      }
     async function handleScroll() {
        if (isScrollbarAtBottom()) {
              if(length>0){

                loadPosts(); 
                console.log("You  have reached the bottom of the screen!",scrollY);
              }

        }
      }
      window.addEventListener('scroll', handleScroll);
  

       var clutter = '' ;
       const loadMoreButton = document.getElementById('load-more');
      const postContainer = document.querySelector('#posts-container');
      let page = 1;

      async function loadPosts() {

        document.addEventListener("DOMContentLoaded", function(event) { 
          var scrollpos = localStorage.getItem('scrollpos');
          if (scrollpos) window.scrollTo(0, scrollpos);
        
      });
  
      window.onbeforeunload = function(e) {
          localStorage.setItem('scrollpos', window.scrollY);
      };
  
        
        const response = await fetch(`/posts?page=${page}`);
        const data = await response.json();
            length = data.length;
     
       data.reverse().forEach(post => {
        console.log(loggedInUserSaved)
          clutter += ` <div class="post">
                <div class="post-nav">
                  <div class="pn-part1">
                      <img src="/images/uploads/${post.userId.image}" alt="">
                      <h4><a href='/profile/${post.userId._id}' >${post.userId.username}.</a></h4>
                  </div>
                  <svg aria-label="More options" class="_ab6-" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
              </div>
    
                <div class="post-content">
                    <div class="pc-img">
                      <img src="/images/uploads/${post.image}" alt="">
                     </div>
                     <div class="pc-img">
                      <img src="" alt="">
                     </div> 
                </div>
    
                <div class="post-bottom-nav">
                   <div class="post-icon">
                    <a id="like" href="/post/like/${post._id}">

                    ${post.likes.indexOf(loggedInUserId)=== -1?'<svg aria-label="white" class="x1lliihq x1n2onr6" color="rgb(255, 48, 64)" fill="rgb(255, 48, 64)" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>':'<svg aria-label="red" class="x1lliihq x1n2onr6" color="rgb(255, 48, 64)" fill="rgb(255, 48, 64)" height="24" role="img" viewBox="0 0 48 48" width="24" style="fill: red;"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>'}

                        <h6>${post.likes.length}</h6>
                    </a>
                       
                  <a href="/comment/${post._id}"> <div class="coment">
                    <svg aria-label="Comment" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>               
                      </div></a>
                   <div class="send">
                    <svg aria-label="Share Post" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Share Post</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                   </div>
                   </div>
                   <a href="/post/save/${post._id}">
                   ${ loggedInUserSaved.indexOf(post._id) === -1 ? '<svg aria-label="Save" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>': '<svg aria-label="Remove" class="x1lliihq x1n2onr6" color="rgb(245, 245, 245)" fill="rgb(245, 245, 245)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Remove</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg>'}
                    
                   </a>
                </div>
                <div class="caption">
                  <h5>${post.caption}</h5>
                </div>
           </div>`;

          postContainer.innerHTML = clutter;

        });
    

        console.log(page);
       
     
        page++;
      }
  
// _______________________________________________________________________________

let more = document.querySelector("#bottom-icon");
let swtch = document.querySelector("#switch");
let apper = document.querySelector("#apper");
let opn = document.querySelector("#open");
var flag = 0;
more.addEventListener("click", function () {
  if (flag===0) {
    console.log("hey");
    document.querySelector("#open").style.display = "initial";
    flag=1;
   
  } else {
    apper.style.display = "none";

    document.querySelector("#open").style.display = "none";
    flag=0;
   
  }
});
swtch.addEventListener("click", function () {
  if (document.querySelector("#open").style.display === "intial") {
    apper.style.display = "none";
   
  } else {
    apper.style.display = "initial";
    document.querySelector("#open").style.display = "none";
  
  }
});

var icon = document.querySelectorAll(".icon");
var search =  document.querySelector("#search");
var serchDiv = document.querySelector("#serch-div");
var lft =  document.querySelector("#left");
var mor = document.querySelector("#bottom-icon");
 var flag2 = 0;
 search.addEventListener("click",function(dets){
  console.log(dets.target);
  if(flag2===0){
    icon.forEach(function(i){
      i.children[1].style.display = 'none';
    })
    console.log("hey");
    document.querySelector("#bottom-icon").children[1].style.opacity = 0;
   serchDiv.style.width = "60vh";
   serchDiv.style.display = 'initial';
    lft.style.width = '10%'
    flag2=1;
   
   
  }else{
    icon.forEach(function(i){
      i.children[1].style.display = 'initial';
    })
    serchDiv.style.display = 'none';
    lft.style.width = '20%'
    serchDiv.style.width = "0vh";
    flag2=0;
    console.log("h");
    document.querySelector("#bottom-icon").children[1].style.opacity = 1;

   
  }
 })

 function close(){
  document.querySelector("#right").addEventListener('click',function(){
   
    if(flag===0 && flag2===0){
    }
    else{
      serchDiv.style.display = 'none';
      lft.style.width = '20%';
      icon.forEach(function(i){
        i.children[1].style.display = 'initial';
        apper.style.display = "none";
        document.querySelector("#open").style.display = "none";
        document.querySelector("#bottom-icon").children[1].style.opacity = 1;

        flag=0;
        flag2=0;

      })
    }

  })
 } 




 close();




 
 









