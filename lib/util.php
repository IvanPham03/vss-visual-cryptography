<?php

// tạo hàm g() nhận 3 tham số $array, $key, và $default
// kiểm tra xem $array có tồn tại khóa $key hay không
function g($array, $key, $default = false) {
  return array_key_exists($array, $key) ? $array[$key] : $default;
  // Nếu tồn tại, giá trị tương ứng của khóa $key trong $array được trả về.
  // Nếu không tồn tại, giá trị mặc định $default được trả về.
}

// tạo hàm app_url() nhận hai tham số tùy chọn: $path và $params
function app_url($path = '', $params = []) {
  // Biến $host lưu trữ tên máy chủ từ biến toàn cục $_SERVER['SERVER_NAME'].
  $host = $_SERVER['SERVER_NAME'];

  // Sau đó, hàm trả về URL bằng cách nối chuỗi 
  // và các tham số $params (nếu có) được mã hóa thành chuỗi truy vấn bằng http_build_query().
  return "http://$host/visual-cryptography/$path" . ($params ? '?'. http_build_query($params, false, '&') : '');
}

// tạo hàm resource_url() nhận hai tham số: $path và $params
function resource_url($path, $params = []) {
  // hàm này tính toán phiên bản của tệp $path
  // bằng cách sử dụng filemtime() để lấy thời gian sửa đổi của tệp
  $version = filemtime(__DIR__ . "/../$path");

  // Sau đó, hàm trả về URL của tệp $path kết hợp với phiên bản (ver) 
  // và các tham số $params bằng cách gọi hàm app_url().
  return app_url($path, ['ver' => $version] + $params);
}

?>