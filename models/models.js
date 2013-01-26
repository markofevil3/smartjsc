var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  order: { type: Number, default: 1 },
  title: String,
  uploadDate: Date,
  shortDes: String,
  content: String,
  type: Number,
  subType: Number,
  thumbnailUrl: String
});

var gallerySchema = new Schema({
  title: String,
  uploadDate: Date,
  images: [String],
  thumbnailUrl: String,
  type: Number
});

var uploadFileSchema = new Schema({
  uploadDate: Date,
  name: String,
  note: String,
  path: String
});

var userSchema = new Schema({
  username: String,
  displayName: String,
  password: String,
  files: [uploadFileSchema],
  admin: { type: Boolean, default: false },
  superior: { type: Boolean, default: false }
});

module.exports = {
  'User': mongoose.model('User', userSchema),
  'UploadFile': mongoose.model('UploadFile', uploadFileSchema),
  'Article': mongoose.model('Article', articleSchema),
  'Gallery': mongoose.model('Gallery', gallerySchema)
};
