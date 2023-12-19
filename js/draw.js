/*
 * This is a javascript file used for implementing basic canvas drawing
 */

$(document).ready(function () {
  // vẽ đường thằng: 
  // đối tượng DOM đại diện cho phần tử có id là "source" và gán cho biến canvas
  var canvas = $('#source').get(0);

  // kiểm tra xem phương thức getContext('2d')
  var ctx = canvas.getContext ? canvas.getContext('2d') : null;
  // nếu có,  trình duyệt hỗ trợ vẽ 2D trên canvas, và đối tượng ngữ cảnh vẽ 2D được gán cho biến ctx.
  // nếu không, ctx được gán giá trị null.

  //  vẽ đường thẳng từ điểm from đến điểm to trên canvas:
  function drawLine(from, to) {
    if (ctx) // nếu ctx tồn tại:
    {
      ctx.beginPath(); // Bắt đầu một đường vẽ mới.
      ctx.lineWidth = 20; //  Đặt độ dày của đường vẽ là 20 pixel.
      ctx.lineCap = 'round'; //  Đặt kiểu đầu mút của đường vẽ là "round", tức là đầu mút tròn.
      ctx.moveTo(from.x, from.y); // Di chuyển con trỏ vẽ đến điểm bắt đầu (from.x, from.y).
      ctx.lineTo(to.x, to.y); //  Vẽ một đoạn thẳng từ điểm bắt đầu đến điểm kết thúc (to.x, to.y).
      ctx.stroke(); // Vẽ đường thẳng trên canvas.
    }
  }

  // khởi tạo biến prev 
  // lưu trữ tọa độ x và y của điểm bắt đầu 
  // khi người dùng di chuyển chuột hoặc chạm vào phần tử canvas.
  var prev = { x: null, y: null };

  // hàm xử lý khi người dùng chạm vào phần tử và nhấn chuột xuống:
  // touchstart: khi người dùng chạm vào phần tử
  // mousedown: khi người dùng nhấn chuột xuống  
  // trên phần tử có id là "source"
  // khi hàm này xảy ra thì: hàm này nhận tham số evt và thực hiện các hành động:
  $(document).on('touchstart mousedown', '#source', function (evt) {
    
    evt.preventDefault(); // đảm bảo rằng không có hành động nào khác xảy ra khi người dùng chạm hoặc nhấn chuột xuống.
    prev.x = evt.clientX; // Gán giá trị tọa độ x của điểm bắt đầu (prev.x) bằng giá trị tọa độ x (evt.clientX).
    prev.y = evt.clientY; // Gán giá trị tọa độ y của điểm bắt đầu (prev.y) bằng giá trị tọa độ y (evt.clientY).
  });

  // hàm xử lý khi người dùng di chuyển chuột trên phần tử có id là "source"
  // khi hàm này xảy ra thì: hàm này nhận tham số evt và thực hiện các hành động:
  $(document).on('mousemove', '#source', function (evt) {
    // Kiểm tra xem người dùng có đang nhấn chuột trái không: evt.which
    // = 1 tương ứng với chuột trái.
    if (evt.which == 1) // nếu đúng: 
    {
      // Gán giá trị tọa độ x và y của điểm hiện tại (curr) 
      // bằng giá trị tọa độ x và y: (evt.clientX và evt.clientY).
      curr = { x: evt.clientX, y: evt.clientY };
      // Gọi hàm drawLine để vẽ đường thẳng từ điểm trước đó (prev) đến điểm hiện tại (curr).
      drawLine(prev, curr);
      // Cập nhật điểm trước đó (prev) thành điểm hiện tại (curr).
      prev = curr;
    }
  });

  // hàm xử lý khi người dùng di chuyển chạm trên phần tử có id là "source"
  // khi hàm này xảy ra thì: hàm này nhận tham số evt và thực hiện các hành động:
  $(document).on('touchmove', '#source', function (evt) {
    evt.preventDefault(); //  đảm bảo rằng không có hành động nào khác xảy ra khi người dùng di chuyển chạm.

    var touch = evt.originalEvent.touches[0] || evt.originalEvent.changedTouches[0];
    // Lấy đối tượng cảm ứng đầu tiên từ việc chạm. 
    //  evt.originalEvent.touches là một mảng các đối tượng cảm ứng liên quan đến việc người dùng thực hiện.
    // Nếu mảng này không có phần tử, ta sẽ sử dụng evt.originalEvent.changedTouches, 
    // một mảng chứa các đối tượng cảm ứng đã thay đổi.

    var elm = $(this).offset();
    // lấy vị trí tương đối của phần tử hiện tại ($(this))
    //  offset() trả về một đối tượng chứa 
    // thông tin về vị trí tương đối của phần tử, bao gồm các thuộc tính top và left.

    var x = touch.pageX - elm.left;
    // Tính toán tọa độ x của điểm chạm bằng cách lấy giá trị tọa độ x của chạm (touch.pageX) 
    // và trừ đi giá trị left của phần tử.

    var y = touch.pageY - elm.top;
    // Tính toán tọa độ y của điểm chạm bằng cách lấy giá trị tọa độ y của chạm (touch.pageY) 
    // và trừ đi giá trị top của phần tử.

    curr = { x: x, y: y };
    // Gán giá trị tọa độ x và y của điểm hiện tại (curr) bằng giá trị x và y tính toán được.
    drawLine(prev, curr);
    // Gọi hàm drawLine để vẽ đường thẳng từ điểm trước đó (prev) đến điểm hiện tại (curr).
    prev = curr;
    // Cập nhật điểm trước đó (prev) thành điểm hiện tại (curr).
  });

});