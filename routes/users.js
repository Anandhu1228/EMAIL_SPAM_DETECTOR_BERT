var express = require('express');
var router = express.Router();
const { spawn } = require('child_process');

router.get('/', function(req, res, next) {
  res.render("user/testpage");
  return;
});

router.post('/get_mail', function(req, res, next) {
  let mail_content = req.body.Email_content.trim();

  const python = spawn('python', ['classifier/classifier_file.py', mail_content]);

  let result = '';

  python.stdout.on('data', function (data) {
    result += data.toString();
    console.log(`Python script output (stream): ${data.toString()}`);
  });
  
  python.stderr.on('data', function (data) {
    console.error(`stderr: ${data}`);
  });
  
  python.on('exit', function (code) {
    if (code === 0) {
      const resultTrimmed = result.trim().toLowerCase();
      console.log("RESULT : ", resultTrimmed);
      
      if (resultTrimmed === 'not spam') {
        res.send('not spam');
      } else if (resultTrimmed === 'spam') {
        res.send('spam');
      } else {
        res.status(500).send('Unexpected result from Python script');
      }
    } else {
      console.error('Error in Python script execution');
      res.status(500).send('Error processing the email content');
    }
  });  
});

module.exports = router;
