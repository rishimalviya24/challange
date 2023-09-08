// Function to check if the scrollbar is at the bottom of the visible screen
function isScrollbarAtBottom() {
  var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  var clientHeight = document.documentElement.clientHeight || window.innerHeight;
  var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
  var minHeightThreshold = 1 // Adjust the minimum height threshold as per your requirements
  return scrollTop + clientHeight >= scrollHeight - minHeightThreshold;
}

// Function to handle the scroll event
function handleScroll() {
  if (isScrollbarAtBottom()) {
    // Display an alert when scrollbar reaches the bottom of the screen with minimum height threshold
    console.log("You have reached the bottom of the screen!");
  }
}

// Add scroll event listener to the window
window.addEventListener('scroll', handleScroll);
  
  
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
  
   function saved(){
    document.querySelector("#saved").addEventListener('click',function(){
      console.log("hey");
      document.querySelector("#saved").style.opacity = 1;
      document.querySelector("#post").style.opacity = .5;
        document.querySelector("#saved-container").style.display = `grid`;
        document.querySelector("#post-container").style.display = 'none';
  
    })
    document.querySelector("#post").addEventListener('click',function(){
      document.querySelector("#post").style.opacity = 1;
      document.querySelector("#saved").style.opacity = .5;
      document.querySelector("#saved-container").style.display = 'none';
      document.querySelector("#post-container").style.display = 'grid';
  
  })
        
   }
  
  saved()
  
  
   close();
  
  