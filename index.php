<?php
/*
 * A PHP file for rendering our visual encryption demo.
 * Visual Encryption is described here:
 * https://en.wikipedia.org/wiki/Visual_cryptography	
 * https://cs.uwaterloo.ca/~dstinson/visual.html
 */
require_once('./lib/sitecofig.php');

?>
<!DOCTYPE html>
<html>

<head>
  <title>Visual Cryptography</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

  <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
  <!-- liên kết với file layout.css để tạo bố cục trang web  -->
  <link rel="stylesheet" href="./css/layout.css">
</head>

<body>
  <!-- page: trang web chính -->
  <div class="page">
    <!-- tạo một thẻ <canvas> với id="source" -->
    <!-- và kích thước là 400 pixel chiều rộng và 300 pixel chiều cao. -->
    <canvas id="source" width="400" height="300"></canvas>

    <!-- tạo một <div> được gán lớp bounds và hidden -->
    <div class="bounds hidden">
      <!-- chứa hai thẻ <canvas> với id="share-1" và id="share-2" -->
      <!-- Các canvas này có kích thước giống như canvas #source -->
      <canvas id="share-1" width="400" height="300"></canvas>
      <canvas id="share-2" width="400" height="300"></canvas>
    </div>

    <!-- tạo một <div> control chứa các nút điều khiển: -->
    <div class="controls">
      <!-- một nút <button> được gán lớp decrypt và hidden.
           Nút này được sử dụng để giải mã. -->
      <button class="decrypt hidden">Decrypt</button>
      <!-- một nút <button> được gán lớp encrypt. 
          Nút này được sử dụng để mã hóa. -->
      <button class="encrypt">Encrypt</button>
      <!-- một nút <button> được gán lớp reset. 
          Nút này được sử dụng để bắt đầu lại từ đầu. -->
      <button class="reset">Start Over</button>
    </div>
  </div>

  <!-- kết nối với file chứa code liên quan đến việc vẽ đường thẳng trên canvas. -->
  <script src="./js/draw.js"></script>
  <!-- kết nối với file chứa code liên quan đến các điều khiển và xử lý hành động trên trang web. -->
  <script src="./js/controls.js"></script>
</body>

</html>