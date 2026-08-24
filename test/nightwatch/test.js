module.exports = {
  'Test Load Page': function (browser) {
    browser
      .url('http://localhost:8189')
      .waitForElementVisible('body')
      .assert.titleContains('Dithertron')
      // make sure there's a pulldown that says "C-64"
      .assert.visible('select')
      .assert.textContains('select', 'C-64 Multi')
      // make sure there's a button that says "PNG"
      .assert.visible('button[id="downloadImageBtn"]')
      .assert.textContains('button[id="downloadImageBtn"]', 'PNG')
      // make sure there's a button that says "BIN"
      .assert.textContains('button[id="downloadNativeBtn"]', 'BIN')
      // make sure there's a button that says "Open in 8bitworkshop"
      .assert.textContains('button[id="gotoIDE"]', 'Open in 8bitworkshop')
      // make sure there's an Examples dropdown button
      .assert.visible('button[id="dropdownMenuLink"]')
      .assert.textContains('button[id="dropdownMenuLink"]', 'Examples')
      // make sure there's an Open Image button
      .assert.visible('button[id="openImageBtn"]')
      // hidden file input should still exist in the DOM
      .assert.hidden('input[id="imageUpload"]')
      //
      .end();
  }
};
