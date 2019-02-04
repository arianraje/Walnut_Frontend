
    function openEditor() {
  _("Home").innerHTML = "";
  _("editor").style.visibility = 'visible';
}

function uploadText() {
  axios.post('http://localhost:3000/upload', {
    foo: 'bar'
  }).catch(error => {
    console.log(error);
  })
}

function _(el) {
  return document.getElementById(el);
}

function uploadFile(e) {
  //e.preventDefault();
  uploadUsingAJAX();
  // makeCorsRequest();
}

function uploadUsingAJAX() {
  console.log(12);
  var file = _("file1").files[0];
  var url = 'http://ec2-18-224-29-149.us-east-2.compute.amazonaws.com:3000/upload';
  // var url = 'http://localhost:3000/upload';

   // alert(file.name+" | "+file.size+" | "+file.type);
  var formdata = new FormData();
  formdata.append("file1", file);
  var ajax = new XMLHttpRequest();
  ajax.upload.addEventListener("progress", progressHandler, false);
  ajax.addEventListener("load", completeHandler, false);
  ajax.addEventListener("error", errorHandler, false);
  ajax.addEventListener("abort", abortHandler, false);
  ajax.open("POST", url);

  ajax.setRequestHeader("Access-Control-Allow-Origin","*, http://");
  ajax.setRequestHeader("Access-Control-Allow-Credentials", "true");
  ajax.setRequestHeader("Access-Control-Allow-Methods", "POST");
  ajax.setRequestHeader("Access-Control-Allow-Headers", "Content-Type");
  ajax.send(formdata);
}

// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  // var url = 'http://ec2-13-59-67-128.us-east-2.compute.amazonaws.com/upload';
  var url = 'http://localhost:3000/upload';

  var xhr = createCORSRequest('POST', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    // var title = text
    alert('Response from CORS request to ' + url + ': title');
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}

// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

function uploadUsingAXIOS2() {
  var config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: function(progressEvent) {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    }
  }

  axios(config);
  axios.post('http://www.walnutai.io/upload', formdata, config).then(function(response) {
    console.log('reponse: ' + response);
  }).catch(function(error) {
    console.log(error);
  });
}

function progressHandler(event) {
  console.log('progressHandler');
  _('action-panel-container-2').innerHTML = '<div class="loading"><img class="loading-gif" src="./assets/rocket.gif"><p>Loading...<br>This might take a while.</p></div>';

  // _("start").parentNode.removeChild(_("start"));
  // _("progressBar").style.visibility = "visible";
  // _("progressC").style.visibility = "visible";
  // _("loaded_n_total").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
  // var percent = (event.loaded / event.total) * 100;
  // _("progressBar").value = Math.round(percent);
  // _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
}

function completeHandler(event) {
  console.log('completeHandler');
  _('action-panel-container-2').innerHTML = '<div class="summary"><p>'+JSON.parse(event.srcElement.response).preview+'</p></div>';
  console.log(event.srcElement.response);
}

function errorHandler(event) {
  alert("upload failed")
}

function abortHandler(event) {
  _("status").innerHTML = "Upload Aborted";
}

function openUploadFile() {
  window.location.replace("./upload.html");
}
