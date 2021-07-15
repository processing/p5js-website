var examples = {
  init: function(file) {

    // Editor

    examples.editor = ace.edit('exampleEditor');
    //examples.editor.setTheme('ace/theme/monokai');
    examples.editor.getSession().setMode('ace/mode/javascript');
    examples.editor.getSession().setTabSize(2);

    examples.dims = [];

    // Button

    $('#runButton').click( function() {
      examples.runExample();
    });
    $('#resetButton').click( function() {
      examples.resetExample();
    });
    $('#copyButton').click( function() {
      // don't know why we need this twice, or the setTimeout
      // guessing it's some interaction with the editor..
      document.querySelector('textarea').select();
      $('textarea')[0].select();
      document.execCommand('copy');
      setTimeout(function() { document.execCommand('copy'); }, 200);
    });


    // Example Frame
    if($('#isMobile-displayButton').length !== 0) {
      //it mobile

      $('#isMobile-displayButton').click( function() {

         $('#exampleFrame').show();
         $('#exampleFrame').ready(function() {
            // alert('exampleFrame load')
            examples.loadExample(true);
          });
      });
    } else {
      $('#exampleFrame').load(function() {
          examples.loadExample(false);
      });
    }



  // Capture clicks

  $.ajax({
      url: file,
      dataType: 'text'
    })
    .done(function (data) {
      $('#exampleSelector').hide();

      // parse and set frame size
      var frameReg = /@frame (.*),(.*)/g;
      var arr = data.split(frameReg);
      if (arr.length > 2) {
        examples.dims[0] = arr[1];
        examples.dims[1] = arr[2];
      }

      // render?
      var norender = data.indexOf('@norender') !== -1;

      // parse and set name, aria label, and description
      var metaReg = new RegExp('\\* ', 'g');
      var spaceReg = new RegExp(' ', 'g');

      var startName = data.indexOf("@name")+6;
      var endName = data.indexOf("\n", startName);

      var name = startName !== 5 ? data.substring(startName, endName) : '';

      var startAriaLabel = data.indexOf("@arialabel")+11;
      var endAriaLabel = data.indexOf("\n", startAriaLabel);

      var ariaLabel = startAriaLabel !== 10 ? data.substring(startAriaLabel, endAriaLabel) : '';

      var startDesc = data.indexOf("@description")+13;
      var endDesc = data.indexOf("*/", startDesc);

      var desc = startDesc !== 12 ? data.substring(startDesc, endDesc) : '';
      desc = desc.replace(metaReg, '');

      $('#example-name').html(name);
      $('#example-desc').html(desc);
      $('#exampleFrame').attr("aria-label", ariaLabel);

      // strip description and set code
      var ind = data.indexOf('*/');
      data = data.substring(ind+3);
      examples.resetData = data;

      examples.showExample(norender);
    })
  },
  showExample: function(norender) {
    examples.editor.getSession().setValue(examples.resetData);

    //resize height of editor
    var rows = examples.editor.getSession().$rowLengthCache.length;
    var lineH = examples.editor.renderer.lineHeight;
    $('#exampleEditor').height(rows*lineH+'px');

    if (examples.resetData.indexOf('<!DOCTYPE html>') !== -1) {
      examples.editor.getSession().setMode('ace/mode/html');
    }

    if (norender) {
      $('iframe').hide();
      $('#resetButton').hide();
      $('#runButton').hide();
      $('#copyButton').hide();
    } else {
      examples.runExample();
      $('#exampleDisplay').show();
    }
  },
  // display iframe
  runExample: function() {
    $('#exampleFrame').attr('src', $('#exampleFrame').attr('src'));
  },
  resetExample: function() {
    examples.showExample();
  },
  // load script into iframe
  loadExample: function(isMobile) {

    var exampleCode = examples.editor.getSession().getValue();

    try {

      if (exampleCode.indexOf('new p5()') === -1) {
        exampleCode += '\nnew p5();';
      }

      if(isMobile) {

        $('#exampleFrame').css('position', 'fixed');
        $('#exampleFrame').css('top', '0px');
        $('#exampleFrame').css('left', '0px');
        $('#exampleFrame').css('right', '0px');
        $('#exampleFrame').css('bottom', '0px');
        $('#exampleFrame').css('z-index', '999');
        // var re = /createCanvas\((.*),(.*)\)/g;
        //   var arr = exampleCode.split(re);
        // var height = $(screen).height();
        // var width = $(screen).width()
        //   $('#exampleFrame').css('height', height+'px');
        //   $('#exampleFrame').css('width', width+'px');
        //   console.log(height + ' ,' + width);
        //exampleCode = exampleCode.replace(/windowWidth/, winWidth).replace(/windowHeight/, winHeight);

      // var userCSS = $('#exampleFrame')[0].contentWindow.document.createElement('style');
      // userCSS.type = 'text/css';
      // userCSS.innerHTML = 'html, body, canvas { width: 100% !important; height: 100% !important;}';
      //$('#exampleFrame')[0].contentWindow.document.head.appendChild(userCSS);

      } else {
        if (examples.dims.length < 2) {
          var re = /createCanvas\((.*),(.*)\)/g;
          var arr = exampleCode.split(re);
          $('#exampleFrame').height(arr[2]+'px');
        } else {
          $('#exampleFrame').height(examples.dims[1]+'px');
        }

      }

      var userScript = $('#exampleFrame')[0].contentWindow.document.createElement('script');
      userScript.type = 'text/javascript';
      userScript.text = exampleCode;
      userScript.async = false;
      $('#exampleFrame')[0].contentWindow.document.body.appendChild(userScript);

    } catch (e) {
      console.log(e.message);
    }
  }

}
if (typeof(window._p5jsExample) !== 'undefined') {
  examples.init(window._p5jsExample);
}

// if (typeof(window._p5jsLanguage) !== 'undefined') {
//   $('.example-link').each(function() {
//     var name = $(this).data(window._p5jsLanguage);
//     console.log(window._p5jsLanguage, name)
//     $(this).text(name);
//   });
// } else {
//   console.log('no language')
// }
