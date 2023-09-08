const express = require("express");
const router = express.Router();
const passport = require("passport");
const path = require("path");
const multer = require("multer");
const postModel = require("./post");
const userModel = require("./users");
const commentModel = require('./comment');
const { ftruncateSync } = require("fs");
const { log } = require("console");
const localStretegy = require("passport-local");

passport.use(new localStretegy(userModel.authenticate()));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads");
  },
  filename: function (req, file, cb) {
    var dt = new Date();
    var fn =
      Math.floor(Math.random() * 100000000) +
      dt.getTime() +
      path.extname(file.originalname);
    cb(null, fn);
  },
});

function fileFilter(req, file, cb) {
  if (
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/svg" ||
    file.mimetype == "image/gif" ||
    file.mimetype == "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("I don't have a clue!"));
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("signin");
});

router.get("/signup", function (req, res, next) {
  userModel.find();
  res.render("signup");
});

router.post("/register", function (req, res, next) {
  var newUser = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
  });
  userModel
    .register(newUser, req.body.password)
    .then(function (u) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/feed");
      });
    })
    .catch(function (err) {
      res.send(err);
    });
});

router.get("/createpost",isLoggedIn,function (req, res, next) {

  res.render("createpost",{user:req.user});
});

router.post( "/createpost", isLoggedIn, upload.single("image"),  async function (req, res, next) {
    var loggedInUser = req.user;
    var createdPost = await postModel.create({
      caption: req.body.caption,
      image: req.file.filename,
      userId: loggedInUser._id,
    });
    loggedInUser.posts.push(createdPost._id);
   
    await loggedInUser.save();
    res.redirect('/feed');
  }
);

router.get("/profile/:id", isLoggedIn,async function (req, res, next) {
  var loggedInUser = await userModel.findOne({username:req.session.passport.user}).populate('posts').populate('saved');
  var anyuser = await userModel.findOne({_id:req.params.id}).populate('posts');
  console.log(loggedInUser);
  res.render("profile",{loggedInUser,anyuser});
});



// router.get("/feed", isLoggedIn, async function (req, res, next) {
 
//   var allUsers = await userModel.find().limit(4);
//   var user= await userModel.findOne({_id:req.user._id}).populate({path:'following',populate:{
//     path:'posts',
//     populate:{
//       path:'userId'
//     }
//    }}).populate({
//     path:'posts',
//     populate:{
//       path:'userId'
//     }
//   })
  
//    var arr = [];
//     arr.push(user.posts);
//     console.log();
//    (user.following).forEach(function(val){
//      arr.push(val.posts);
//     })
//     var posts = arr.flat();
//   // console.log(posts);
//   var loggedInUser = await userModel.findOne({username:req.session.passport.user}).populate('posts');

//   res.render("index",{loggedInUser,allUsers,posts});

// });

router.get("/feed", isLoggedIn, async function (req, res, next) {
 
  var allUsers = await userModel.find().limit(4);
    var posts = await postModel.find().populate('userId').limit(1).exec();
  // console.log(posts);
  var loggedInUser = await userModel.findOne({username:req.session.passport.user}).populate('posts');

  res.render("index",{loggedInUser,allUsers,posts});

});




router.get('/posts', async (req, res) => {
  const perPage = 1;
  const page = req.query.page || 1;

  try {
    const posts = await postModel.find().populate('userId') 
     .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec();

    res.json(posts);
    // console.log(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



router.get('/comment/:id',isLoggedIn,async function(req,res,next){
  var post = await postModel.findOne({_id:req.params.id}).populate('userId').populate({
    path:'comments',
    populate:{
      path:'userId'
    }
  });
  var allUsers = await userModel.find();  
  var loggedInUser = await userModel.findOne({username:req.session.passport.user});
  res.render('comment',{loggedInUser,post,allUsers});
})


router.post('/createcomment/:postid',isLoggedIn,async function(req,res){
  var post = await postModel.findOne({_id:req.params.postid});
  var loggedInUser = await userModel.findOne({username:req.session.passport.user});
  var comment = await commentModel.create({
    comment:req.body.comment,
    postId:post._id,
    userId:loggedInUser._id
  })
   post.comments.push(comment._id);
   loggedInUser.comments.push(comment._id);
   await post.save();
   await loggedInUser.save();
   res.redirect('back');

 
})


router.get('/delete/comment/:commentId', isLoggedIn ,async function(req,res){
  await commentModel.findOneAndDelete({_id:req.params.commentId});
  res.redirect('back');
})

router.get('/like/comment/:commentId',isLoggedIn, async function(req,res){
  var loggedInUser = await userModel.findOne({username:req.session.passport.user});
  var comment = await commentModel.findOne({_id:req.params.commentId})
  if(comment.like.indexOf(loggedInUser._id)===-1){

    comment.like.push(loggedInUser._id);
  }else{
    comment.like.splice(comment.like.indexOf(loggedInUser._id),1);
  }
  await comment.save();
  res.redirect('back');
})


router.get('/morePost',async function(req,res,next){
 
 var postData = await postModel.find().populate('userId').limit(3);

 res.json({postData});
})

router.get("/post/like/:id",isLoggedIn,async function(req,res,next){
    post = await postModel.findOne({_id:req.params.id});
    loggedInUser = await userModel.findOne({username:req.session.passport.user});

    if(post.likes.indexOf(loggedInUser._id) === -1){
      post.likes.push(loggedInUser._id);
    }
    else{
      (post.likes).splice(loggedInUser._id,1);
    }
    
    await post.save();

    res.redirect('back');

})

router.get('/follow/:id',isLoggedIn,async function(req,res,next){
  try{
   var loggedInUser = await userModel.findOne({username:req.session.passport.user});
  var anyuser = await userModel.findOne({_id:req.params.id});

  if(loggedInUser.following.indexOf(anyuser._id) === -1){

    loggedInUser.following.push(anyuser._id);
    anyuser.followers.push(loggedInUser._id);

  }else{
    loggedInUser.following.splice(loggedInUser.following.indexOf(anyuser._id),1);
    anyuser.followers.splice(anyuser.followers.indexOf(loggedInUser._id),1);
  }
 
  }catch(err){
    console.log(err);
  }
  console.log(anyuser,loggedInUser);
  await loggedInUser.save();
  await anyuser.save();
  res.redirect("back")
})

router.get("/post/save/:id",isLoggedIn,async function(req,res,next){
  post = await postModel.findOne({_id:req.params.id});
  loggedInUser = await userModel.findOne({username:req.session.passport.user});

  if(loggedInUser.saved.indexOf(post._id) === -1){
    loggedInUser.saved.push(post._id);
  }
  else{
    (loggedInUser.saved).splice(post._id,1);
  }
  
  await loggedInUser.save();

  res.redirect('back');

})


router.post('/search/:username',async function(req,res,next){
  var regexp = new RegExp("^"+ req.params.username);
    var users = await userModel.find({ username: regexp});
    res.json({users});
})

router.get('/allusers',async function(req,res,next){
 var allUsers = await userModel.find()
  res.send(allUsers);
})

router.get("/found/:username", async function (req, res, next) {
  var foundUser = await userModel.findOne({ username: req.params.username });
  if (foundUser) {
    res.json({ found: true });
  } else {
    res.json({ found: false });
  }
});


router.get('/message',isLoggedIn,function(req,res,next){
  res.render('message',{loggedInUser:req.user});
})

router.post("/login",passport.authenticate("local", {
    successRedirect: "/feed",
    failureRedirect: "/sigin",
  }),
  function () {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
}

router.get('/test',isLoggedIn,async function(req,res){
   var user= await userModel.findOne({_id:req.user._id}).populate({path:'following',populate:{
    path:'posts'
   }});

   var arr = [];
   (user.following).forEach(function(val){
     arr.push(val.posts);
    })
    var posts = arr.flat();
   res.send(posts);

})

module.exports = router;










