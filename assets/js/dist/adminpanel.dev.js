"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UploadImage =
/*#__PURE__*/
function () {
  function UploadImage(file) {
    _classCallCheck(this, UploadImage);

    this.file = file;
  }

  _createClass(UploadImage, [{
    key: "handelUpload",
    value: function handelUpload() {
      document.querySelector('.preview-content').classList.remove('d-none');
      document.querySelector('.special-input-file').classList.add('d-none');
      document.querySelector('.special-input-file').previousElementSibling.classList.add('d-none');
    }
  }, {
    key: "previewImage",
    value: function previewImage() {
      var reader = new FileReader();
      this.handelUpload();
      reader.addEventListener("load", function () {
        document.querySelector('.preview-book-image').src = reader.result;
      });
      reader.readAsDataURL(this.file);
    }
  }, {
    key: "readImage",
    value: function readImage() {
      this.file ? this.previewImage() : false;
    }
  }], [{
    key: "getImage",
    value: function getImage() {
      var file = this.files[0];
      var uploadImage = new UploadImage(file);
      uploadImage.readImage();
    }
  }]);

  return UploadImage;
}();

document.querySelector('#file-upload').addEventListener('change', UploadImage.getImage);
document.querySelector('.layer-button-file').addEventListener('click', function () {
  document.querySelector('.preview-content').classList.add('d-none');
  document.querySelector('.special-input-file').classList.remove('d-none');
  document.querySelector('.special-input-file').previousElementSibling.classList.remove('d-none');
});