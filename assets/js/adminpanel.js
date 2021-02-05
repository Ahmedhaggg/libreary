class UploadImage {
    constructor (file) {
        this.file = file
    } 
    handelUpload() {
        document.querySelector('.preview-content').classList.remove('d-none')
        document.querySelector('.special-input-file').classList.add('d-none')
        document.querySelector('.special-input-file').previousElementSibling.classList.add('d-none')
    }
    previewImage() {
        const reader = new FileReader()
        this.handelUpload()
        reader.addEventListener("load", function () {
            document.querySelector('.preview-book-image').src = reader.result;
        });
        reader.readAsDataURL(this.file)
    }
    readImage () {
        this.file ? this.previewImage() : false
    }
    static getImage() {
        const file = this.files[0];
        const uploadImage = new UploadImage(file)
        uploadImage.readImage();
    }
}
document.querySelector('#file-upload').addEventListener('change', UploadImage.getImage)
document.querySelector('.layer-button-file').addEventListener('click', function () {
    document.querySelector('.preview-content').classList.add('d-none')
    document.querySelector('.special-input-file').classList.remove('d-none')
    document.querySelector('.special-input-file').previousElementSibling.classList.remove('d-none')
})