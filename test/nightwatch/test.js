module.exports = {
  'Test Load Page': function (browser) {
    browser
      .url('http://localhost:8189')
      .waitForElementVisible('body')
      .assert.titleContains('Dithertron')
      // make sure there's a pulldown that says "C-64"
      .assert.visible('select')
      .assert.containsText('select', 'C-64 Multi')
      // make sure there's a button that says "PNG"
      .assert.visible('button[id="downloadImageBtn"]') 
      .assert.containsText('button[id="downloadImageBtn"]', 'PNG')
      // make sure there's a button that says "BIN"
      .assert.containsText('button[id="downloadNativeBtn"]', 'BIN')
      // make sure there's a button that says "Open in 8bitworkshop"
      .assert.containsText('button[id="gotoIDE"]', 'Open in 8bitworkshop')
      //
      .assert.containsText('a[id="dropdownMenuLink"]', 'Select an example')
      //
      .assert.visible('input[id="imageUpload"]')
      //
      .end();
  }
};
