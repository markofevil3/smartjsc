var routes = require('../routes');
var fs = require('fs');
var Path= require('path');
var Util = require('../lib/Util');
var Email   = require('emailjs/email');

var User = require('../models/models').User;
var Article = require('../models/models').Article;
var Gallery = require('../models/models').Gallery;

var EMAIL = "bpquan205@gmail.com";

var EMAIL_SERVER  = Email.server.connect({
  user:     EMAIL, 
  password: "Strawberry205", 
  host:     "smtp.gmail.com", 
  ssl:      true
});

var ARTICLE_QUESTION = 1;
var ARTICLE_NEWS = 2;
var ARTICLE_STUDYING = 3;
var ARTICLE_GO_ABROAD = 4;
var GALLERY = 1;
var CAMPING = 2;

function removeTempFiles() {
  fs.readdir('public/temp/', function(err, files) {
    files.forEach(function(file) {
      fs.unlinkSync(__dirname + "/../public/temp/" + file);
    });
  });
};

setInterval(removeTempFiles, 86400000 * 2);

//client side
var imageFiles = [];

function getFiles(dir, type, variable) {
  fs.readdir(dir, function (err, files) {
    if (err) {
      console.log(err);
      return;
    }
    var returnFiles = [];
    for (var i = 0; i < files.length; i++) {
      var fileExtends = files[i].split('.');
      if (fileExtends[1] == type) {
        returnFiles.push(files[i]);
      }
    }
    switch(variable) {
      case 0:
        returnFiles.push('background.jpg');
        imageFiles = imageFiles.concat(returnFiles);
        break;
    }
  });
};

getFiles('public/img/icons/', 'png', 0);
getFiles('public/img/icons/', 'gif', 0);

exports.index = function(req, res) {
  if (!req.session.lang) {
    req.session.lang = 'en';
  } else {
    if (req.query.lang) {
      req.session.lang = req.query.lang;
    }
  }
  Gallery.find({'type': GALLERY}).sort({ 'uploadDate': -1 }).exec(function(err, galleries) {
    res.render('index', {
      title: 'SmartJSC',
      lang: req.session.lang,
      galleries: galleries,
      imageFiles: imageFiles
    });
  });
};

exports.news = function(req, res) {
  Article.find({'type': ARTICLE_NEWS}).sort({ 'uploadDate': -1 }).exec(function(err, news) {
    if (err) {
      console.log(err);
    }
    res.json({ 'data': news });
  });
};

exports.studying = function(req, res) {
  Article.findOne({ $and: [{'type': ARTICLE_STUDYING}, {'subType': parseInt(req.query.subType)}]}, function(err, studying) {    
    if (err) {
      console.log(err);
    }
    res.json({ 'data': studying });
  });
}

exports.questions = function(req, res) {
  Article.find({'type': ARTICLE_QUESTION}).sort({ 'uploadDate': -1 }).exec(function(err, questions) {
    if (err) {
      console.log(err);
    }
    res.json({ 'data': questions });
  });
}

exports.contact = function(req, res) {
  var message = "Name: " + req.body.name + "\nEmail: " + req.body.email + "\nMessage: " + req.body.message;
  EMAIL_SERVER.send({
    text:    message, 
    from:    EMAIL,
    to:      "yen@smartjsc.com",
    subject: "Message from website"
  }, function(err, message) { 
    if (err) {
      console.log(err);
      res.json({ 'data': 'fail' });
    } else {
      res.json({ 'data': 'success' });
    }
  });
};

exports.campingImages = function(req, res) {
  fs.readdir('public/img/camping/', function(err, files) {
    var returnFiles = [];
    for (var i = 0; i < files.length; i++) {
      var extension = files[i].split('.')[1];
      if (extension.toUpperCase() == 'JPG' || extension.toUpperCase() == 'PNG' || extension.toUpperCase() == 'JPEG') {
        returnFiles.push('/img/camping/' + files[i]);
      }
    }
    res.json({'data': returnFiles});
  });
};

exports.login = function(req, res) {
  if (req.session.authenticated) {
    if (req.session.user.admin) {
      routes.adminPanel(req, res);
    } else {
      routes.userPanel(req, res);
    }
  } else {
    res.render('login', {
      title: 'SmartJSC | Login'
    });
  }
};

exports.logout = function(req, res) {
  delete req.session.authenticated;
  delete req.session.user;
  res.redirect("/login");
};

exports.adminPanel = function(req, res) {
  if (req.session.user.admin) {
    User.find({ $and: [{ 'admin': false }, { 'superior': false }] }, 'username displayName admin superior', function(err, teachers) {
      res.render('admin', {
        title: 'SmartJSC | User',
        displayName: req.session.user.displayName,
        teachers: teachers,
        superior: req.session.user.superior
      });
    });
  } else {
    res.render('admin', {
      title: 'SmartJSC | Admin',
      displayName: req.session.user.displayName,
      error: 'You are not admin!'
    });
  }
};

exports.userPanel = function(req, res) {
  res.render('user', {
    title: 'SmartJSC | User',
    displayName: req.session.user.displayName
  });
};

exports.authenticate = function(req, res) {
  User.findOne({ '$and': [{ username: req.body.username }, { password: req.body.password }] }, function (err, user) {
    if (err) {
      console.log(err);
    }
    if (user != null) {
      req.session.authenticated = true;
      req.session.user = user;
      if (user.admin) {
        routes.adminPanel(req, res);
      } else {
        routes.userPanel(req, res);
      }
    } else {
      res.render('login', {
        title: 'SmartJSC | Login',
        error: 'Wrong username or password!'
      });
    }
  });
};

function checkFolderExist(path, callback) {
  fs.exists(path, function (exists) {
    if (!exists) {
      fs.mkdir(path, 0777, function(err) {
        callback(path);
        return;
      });
    } else {
      callback(path);
      return;
    }
  });
};

exports.uploadLecture = function(req, res) {
  User.findOne({ $and: [{ 'username': req.session.user.username }, { 'password': req.session.user.password }] }, function(err, user) {
    if (err) {
      console.log('find user error');
    }
    if (user == null) {
      console.log('no user!');
    }
    var note = req.body.note;
    var uploadFile = req.files['lectureFile'];
    var lectureFolder = __dirname + "/../public/lectures/";
    checkFolderExist(lectureFolder + req.session.user.username + '/', function(path) {
      var dateFolder = Util.formatDate(Date.now());
      checkFolderExist(path + dateFolder + '/', function(finalPath) {
        moveFileNoRename(uploadFile, finalPath, function(result) {
          if (result == 'error') {
            deleteFile(uploadFile);
            res.render('user', {
              title: 'SmartJSC | User',
              displayName: req.session.user.displayName,
              status: 'error'
            });
          } else {
            user.files.push({
              uploadDate: Date.now(),
              name: uploadFile.name,
              path: result,
              note: note
            });
            user.save(function() {
              res.render('user', {
                title: 'SmartJSC | User',
                displayName: req.session.user.displayName,
                status: 'success'
              });
            });
          }
        });
      });
    });
  });
};

function moveFileNoRename(file, newPath, callback) {
  if (file.size > 0) {
    newPath += file.name;
    fs.rename(file.path, newPath, function(err) {
      if (err) {
        console.log(err);
        callback('error');
      }
      callback(newPath);
    });
  } else {
    callback('error');
  }
}

exports.showFiles = function(req, res) {
  if (req.session.user.admin || req.session.user.superior) {
    getLectureFiles(req, res, req.query.username, true);
  } else {
    if (req.query.username && req.query.username != req.session.user.username) {
      renderShowFile(req, res, {error: 'You can\'t see other people files!'});
    } else {
      getLectureFiles(req, res, req.session.user.username, false);
    }
  }
};

function getLectureFiles(req, res, username, showDownload) {
  User.findOne({ 'username': username }, function(err, user) {
    if (err) {
      renderShowFile(req, res, {error: 'Please retry!'});
      return;
    }
    if (user == null) {
      renderShowFile(req, res, {error: 'Can\'t find user!'});
      return;
    }
    renderShowFile(req, res, {'files': user.files, 'downloadable': showDownload});
  });
}

function renderShowFile(req, res, option) {
  var error;
  if (option.error) {
    error = option.error
  }
  res.render('showFile', {
    title: 'SmartJSC | User',
    error: option.error,
    files: option.files.sort(Util.sortByProperties(['uploadDate'], 'desc')),
    downloadable: option.downloadable
  });
}

exports.download = function(req, res) {
  if (req.session.user.admin || req.session.user.superior) {
    var downloadPath = req.query.path.substring(req.query.path.indexOf('public/lectures/'), req.query.path.length);
    res.download(downloadPath, req.query.fileName);
  } else {
    routes.showFiles(req, res);
  }
};

function incorrecUsername(text) {
  re = /[`~!@#$%^&*()_|+\-=?;:'",.\s<>\{\}\[\]\\\/]/gi;
  return re.test(text);
}

exports.createAccount = function(req, res) {
  if (req.session.user.admin || req.session.user.superior) {
    if (req.body.submit) {
      if (req.body.username == '' || req.body.password == '' || req.body.repeatPassword == '' || req.body.displayName == '') {
        renderCreateAccount(req, res, {warning: 'Please fill all information!'});
        return;
      }
      if (incorrecUsername(req.body.username) || incorrecUsername(req.body.password)) {
        renderCreateAccount(req, res, {warning: 'Special characters are NOT allowed!'});
        return;
      }
      if (req.body.password != req.body.repeatPassword) {
        renderCreateAccount(req, res, {warning: 'Repeat password does not match password!'});
        return;
      }
      if (req.body.username.length < 4 || req.body.username.length > 20) {
        renderCreateAccount(req, res, {warning: 'Username\'s length must from 4 to 20 characters!'});
        return;
      }
      User.findOne({ 'username': req.body.username }, function(err, user) {
        if (err) {
          renderCreateAccount(req, res, {warning: 'Please retry!'});
          return;
        }
        if (user != null) {
          renderCreateAccount(req, res, {warning: 'Username already exist!'});
          return;
        }
        user = new User({});
        user.username = req.body.username;
        user.password = req.body.password;
        user.displayName = req.body.displayName;
        user.save(function() {
          renderCreateAccount(req, res, {status: 'Created account: ' + req.body.username});
          return;
        });
      });
    } else {
      renderCreateAccount(req, res, {});
    }
  } else {
    renderCreateAccount(req, res, {error: 'You are not admin!'});
  }
};

function renderCreateAccount(req, res, option) {
  res.render('createAccount', {
    title: 'SmartJSC | Create Account',
    error: option.error,
    warning: option.warning,
    status: option.status
  });
};

exports.changePassword = function(req, res) {
  if (req.body.submit == 'Change') {
    if (req.body.oldPassword == '' || req.body.password == '' || req.body.repeatPassword == '') {
      renderChangePassword(req, res, {warning: 'Please fill all information!', back: req.body.back});
      return;
    }
    if (req.body.oldPassword != req.session.user.password) {
      renderChangePassword(req, res, {warning: 'Old password does not match!', back: req.body.back});
      return;
    }
    if (incorrecUsername(req.body.password)) {
      renderChangePassword(req, res, {warning: 'Special characters are NOT allowed!', back: req.body.back});
      return;
    }
    if (req.body.password != req.body.repeatPassword) {
      renderChangePassword(req, res, {warning: 'Repeat password does not match password!', back: req.body.back});
      return;
    }
    User.findOne({ 'username': req.session.user.username }, function(err, user) {
      if (err) {
        renderChangePassword(req, res, {warning: 'Please retry!', back: req.body.back});
        return;
      }
      if (user == null) {
        renderChangePassword(req, res, {warning: 'Can\'t find user!', back: req.body.back});
        return;
      }
      user.password = req.body.password;
      user.save(function(err) {
        if (err) {
          renderChangePassword(req, res, {warning: 'Please retry!', back: req.body.back});
          return;
        }
        renderChangePassword(req, res, {'status': 'Password has been changed!', back: req.body.back});
      });
    });
  } else {
    renderChangePassword(req, res, {'back': req.query.back});
  }
};

function renderChangePassword(req, res, option) {
  res.render('changePassword', {
    title: 'SmartJSC | Change Password',
    error: option.error,
    warning: option.warning,
    status: option.status,
    back: option.back
  });
};

function renderAddGallery(req, res, option) {
  Gallery.find({'type': GALLERY}).sort({ 'uploadDate': -1 }).exec(function(err, galleries) {
    res.render('addGallery', {
      title: 'SmartJSC | Add Gallery',
      displayName: req.session.user.displayName,
      error: option.error,
      warning: option.warning,
      status: option.status,
      galleries: galleries
    });
  });
};

function uploadGalleryImages(images, folder, returnFiles, callback) {
  var image = images.shift();
  if (image.size > 0) {
    moveFile(image, folder, image.name, function(fileName) {
      if (images.length == 0) {
        returnFiles.push(folder + '/' + fileName);
        callback(returnFiles);
      } else {
        returnFiles.push(folder + '/' + fileName);
        uploadGalleryImages(images, folder, returnFiles, callback);
      }
    });
  } else {
    if (images.length == 0) {
      callback(returnFiles);
    } else {
      uploadGalleryImages(images, folder, returnFiles, callback);
    }
  }
};

exports.addGallery = function(req, res) {
  if (req.body.submitForm == "Submit") {
    var newGallery = false;
    if (req.body.chosenGallery == 'null' || req.body.chosenGallery == undefined) {
      if (req.files.articleThumbnail.size <= 0) {
        renderAddGallery(req, res, {warning: 'Choose Thumbnail'});
        return;
      }
      if (req.body.articleTitle == '' || req.body.articleTitle == null) {
        renderAddGallery(req, res, {warning: 'Title is missing!'});
        return;
      }
      newGallery = true;
    }
    if (req.body.articleType == CAMPING) {
      
    } else {
      var images = req.files.images;
      var folder = 'galleries';
      if (newGallery) {
        var uploadDate = Date.now();
        var thumbnail = req.files.articleThumbnail;
        if (thumbnail.type.indexOf('png') != -1 || thumbnail.type.indexOf('jpg') != -1 || thumbnail.type.indexOf('jpeg') != -1) {
          thumbnailFileName = 'thumbnail.' + thumbnail.type.split('/')[1];
        } else {
          renderAddGallery(req, res, {warning: 'Wrong file type'});
        }
        var galleryFolder = __dirname + "/../public/img/galleries/";
        checkFolderExist(galleryFolder + req.body.articleTitle.replace(/\s/g, '') + '/', function(path) {
          var newFolder = folder + '/' + req.body.articleTitle.replace(/\s/g, '');
          moveFile(thumbnail, newFolder, thumbnailFileName, function(thumbnailFileName) {
            var gallery = new Gallery({});
            gallery.title = req.body.articleTitle;
            gallery.uploadDate = uploadDate;
            gallery.type = parseInt(req.body.articleType);
            gallery.thumbnailUrl = newFolder + '/' + thumbnailFileName;
            gallery.save(function() {
              if (!Array.isArray(images)) {
                images = [images];
              }
              uploadGalleryImages(images, newFolder, [], function(fileLinks) {
                gallery.images = gallery.images.concat(fileLinks);
                gallery.save(function() {
                  renderAddGallery(req, res, {status: "New gallery added"});
                });
              });
            });
          });
        });
      } else {
        Gallery.findOne({'_id': req.body.chosenGallery}, function(err, gallery) {
          if (err) {
            renderAddGallery(req, res, {warning: "Some error. Please retry!"});
            return;
          }
          if (gallery == null) {
            renderAddGallery(req, res, {warning: "Can\'t find gallery. Retry!"});
          }
          if (!Array.isArray(images)) {
            images = [images];
          }
          var newFolder = folder + '/' + gallery.title.replace(/\s/g, '');
          uploadGalleryImages(images, newFolder, [], function(fileLinks) {
            gallery.images = gallery.images.concat(fileLinks);
            gallery.save(function() {
              renderAddGallery(req, res, {status: "Gallery updated"});
            });
          });
        });
      }
    }
  } else {
    if (req.session.user.superior) {
      renderAddGallery(req, res, {});
      return;
    } else {
      renderAddGallery(req, res, {error: 'You are not Superior!'});
    }
  }
};

exports.addArticle = function(req, res) {
  if (req.body.submitForm == "Submit") {
    if (parseInt(req.body.articleType) != ARTICLE_STUDYING && req.files.articleThumbnail.size <= 0) {
      renderAddArtile(req, res, {warning: 'Choose Thumbnail'});
      return;
    }
    if (req.body.articleTitle == '' || req.body.articleTitle == null) {
      renderAddArtile(req, res, {warning: 'Title is missing!'});
      return;
    }
    if (req.body.msgpost == '' || req.body.msgpost == null) {
      renderAddArtile(req, res, {warning: 'Content is missing!'});
      return;
    }
    var uploadDate = Date.now();
    var folder;
    switch(parseInt(req.body.articleType)) {
      case ARTICLE_QUESTION:
        folder = 'questions';
        break;
      case ARTICLE_NEWS:
        folder = 'news';
        break;
    }
    if (parseInt(req.body.articleType) != ARTICLE_STUDYING) {
      var file = req.files.articleThumbnail;
      if (file.type.indexOf('png') != -1 || file.type.indexOf('jpg') != -1 || file.type.indexOf('jpeg') != -1) {
        fileName = uploadDate + '.' + file.type.split('/')[1];
      }
      moveFile(file, folder, fileName, function(newFileName) {
        var article = new Article({});
        article.title = req.body.articleTitle;
        article.uploadDate = uploadDate;
        article.shortDes = req.body.articleShortDest;
        article.content = req.body.msgpost;
        article.type = parseInt(req.body.articleType);
        article.thumbnailUrl = folder + '/' + newFileName;
        article.save(function() {
          renderAddArtile(req, res, {status: "New article added"});
        });
      });
    } else {
      var article = new Article({});
      article.title = req.body.articleTitle;
      article.uploadDate = uploadDate;
      article.shortDes = req.body.articleShortDest;
      article.content = req.body.msgpost;
      article.type = parseInt(req.body.articleType);
      article.subType = parseInt(req.body.articleSubType);
      article.save(function() {
        renderAddArtile(req, res, {status: "New article added"});
      });
    }
  } else {
    if (req.session.user.superior) {
      renderAddArtile(req, res, {});
    } else {
      renderAddArtile(req, res, {error: 'You are not Superior!'});
    }
  }
};

function renderAddArtile(req, res, option) {
  res.render('addArticle', {
    title: 'SmartJSC | Add Article',
    displayName: req.session.user.displayName,
    error: option.error,
    warning: option.warning,
    status: option.status
  });
};

function moveFile(uploadFile, folder, newFileName, callback) {
  var uploadDir = __dirname + "/../public/img/";
  if (newFileName == null) {
    newFileName = Util.createUUID() + '.' + uploadFile.type.split('/')[1];
  }
  if (uploadFile.size > 0) {
    var newPath = uploadDir + folder + '/' + newFileName;
    fs.rename(uploadFile.path, newPath, function(err) {
      if (err) {
        console.log(err);
        callback('error');
      }
      callback(newFileName);
    });
  } else {
    callback('error');
  }
};


// exports.text = function(req, res) {
//   res.render('admin/text', {
//     title: 'Test TextEditor',
//     returnValue: ''
//   });
// };

// exports.add = function(req, res) {
//   res.render('admin/text', {
//     title: 'Test TextEditor',
//     returnValue: req.body.msgpost
//   });
// };

exports.upload = function(req, res) {
  var uploadFile = req.files['image'];
  if (uploadFile.type.indexOf('png') != -1 || uploadFile.type.indexOf('jpg') != -1 || uploadFile.type.indexOf('jpeg') != -1) {
    moveFile(uploadFile, 'upload', null, function(fileName) {
      if (fileName == 'error') {
        deleteFile(uploadFile);
        res.json({status:'We only allow JPEG/JPG/PNG Images.'});
      } else {
        res.json({status:'UPLOADED', image_url:'img/upload/' + fileName});
      }
      
    });
  } else {
    deleteFile(uploadFile);
    res.json({status:'We only allow JPEG/JPG/PNG Images.'});
  }
};

function deleteFile(uploadFile) {
  fs.unlink(uploadFile.path, function (err) {
    if (err) throw err;
    console.log('successfully deleted ' + uploadFile.path);
  });
};