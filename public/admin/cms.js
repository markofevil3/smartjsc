$("document").ready(function(){
  changeFakeFileValue($("#fake-text"), $("#lectureFile"));
});

function changeFakeFileValue(textDiv, fileInput) {
  fileInput.change(function() {
    // console.log(fileInput.val());
    console.log(document.getElementById('lectureFile').files[0].name);
    textDiv.text(document.getElementById('lectureFile').files[0].name);
  });
}