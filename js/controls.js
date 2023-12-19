/*
 * This is a javascript file used for implementing the various control associated with our canvas
 */

$(document).ready(function () {

  function packUi() {
    // cho độ dày lề của các phần tử là 20. 
    var padding = 20;

    // tính toán chiều rộng của canvas
    var canvasWidth = Math.floor($(window).width() - (padding * 2));
    //  (padding * 2): tổng lề bên trái và lề bên phải
    // Math.floor(): làm tròn giá trị xuống thành số nguyên gần nhất


    // tính toán chiều cao của canvas:
    var canvasHeight = (Math.floor($(window).height() / 2) - (padding * 5));
    //  chiều cao bằng một nửa chiều cao của cửa sổ trình duyệt trừ cho 
    // (padding * 5): tổng lề trên, lề dưới và khoảng cách giữa hai canvas

    // đặt giá trị của thuộc tính width của tất cả các phần tử <canvas> thành giá trị của biến canvasWidth
    $('canvas').attr('width', canvasWidth);
    // đặt giá trị của thuộc tính height của tất cả các phần tử <canvas> thành giá trị của biến canvasHeight
    $('canvas').attr('height', canvasHeight);

    // đặt giá trị width của tất cả các phần tử có lớp CSS là .page thành giá trị của biến canvasWidth + 2
    $('.page').width(canvasWidth + 2);
    // để thay đổi kích thước của các phần tử .page cho phù hợp với kích thước của canvas.

    // đặt giá trị của height và width của tất cả các phần tử có lớp CSS là .bounds
    $('.bounds').height((canvasHeight * 2) + 40).width(canvasWidth);
    // height = kích thước chiều cao của canva * 2, sau đó cộng thêm 40.
    //  width = giá trị của biến canvasWidth.


    // lưu trữ giá trị chiều cao được tính toán cho phần tử .bounds bằng cách:
    // đặt giá trị expanded-height của tất cả các phần tử có lớp CSS là .bounds 
    // thành giá trị của thuộc tính height hiện tại của phần tử .bounds.
    $('.bounds').attr('expanded-height', $('.bounds').height());
  }


  // mô phỏng việc tung đồng xu và trả về kết quả "mặt trước" (giá trị true) hoặc "mặt sau" (giá trị false).
  function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0);
    // Math.floor(): làm tròn số xuống thành số nguyên gần nhất.
    // Math.random(): trả về một số ngẫu nhiên từ 0 đến 1 
    // (Math.random() * 2): nhân một số ngẫu nhiên trong khoảng từ 0 đến 1 với 2.
    // Math.floor(Math.random() * 2): làm tròn số ngẫu nhiên được tính toán trong bước (Math.random() * 2):
    // thành một số nguyên gần nhất, có thể là 0 hoặc 1.
    // Math.floor(Math.random() * 2) == 0: so sánh kết quả với 0 
    // nếu = 0 thì kết quả trả về true còn ngược lại là false.
  }


  // tạo hiệu ứng vẽ hay tô một pixel cụ thể trong hình ảnh. 
  function paintPixel(imageData, i) {
    // imageData: chứa dữ liệu hình ảnh
    // i: chỉ số của pixel trong mảng imageData.data

    imageData.data[i + 3] = 100;
    // imageData.data: lưu trữ các giá trị màu của các pixel theo thứ tự RGBA (Red, Green, Blue, Alpha)
    // i + 3 tương ứng với thành phần Alpha (độ trong suốt) của pixel đó
    // 255: pixel sẽ không trong suốt và sẽ hiển thị đầy đủ màu sắc.

  }

  // lấy phần tử đầu tiên có id là "source" 
  // và lưu nó vào biến source:
  var source = $('#source').get(0);

  // kiểm tra trình duyệt có hỗ trợ ngữ cảnh vẽ 2D hay không bằng cách:
  var ctx = source.getContext ? source.getContext('2d') : null;
  // kiểm tra xem source có phương thức getContext() không?
  // Nếu có: gọi phương thức getContext('2d') để lấy một đối tượng ngữ cảnh vẽ 2D và gán cho biến ctx
  // Nếu không: giá trị của ctx sẽ là null

  var share1 = $('#share-1').get(0);
  // chọn phần tử có id là "share-1" trong php và gán nó cho biến share1.
  var share2 = $('#share-2').get(0);
  // chọn phần tử có id là "share-2" trong php và gán nó cho biến share2.

  var ctx1 = share1.getContext('2d');
  // trên phần tử share1: lấy một đối tượng ngữ cảnh vẽ 2D và gán cho biến ctx1.

  var ctx2 = share2.getContext('2d');
  // trên phần tử share2: lấy một đối tượng ngữ cảnh vẽ 2D và gán cho biến ctx2.


  packUi();
  // click vào reset:
  $(document).on('click', '.reset', function () {
    $('#source').show(); // hiển thị phần tử trên giao diện.
    $('.bounds').hide().height($('.bounds').attr('expanded-height'));
    // ẩn các phần tử có lớp "bounds" bằng  phương thức hide() của jQuery 
    // và đặt lại chiều cao của các phần tử "bounds" sẽ được ẩn đi 
    // bằng cách lấy giá trị của thuộc tính "expanded-height" 
    // và đặt nó bằng phương thức height() của jQuery.

    $('.decrypt').hide(); // ẩn các phần tử có lớp "decrypt"
    $('.encrypt').show(); // hiển thị các phần tử có lớp "encrypt"

    ctx.clearRect(0, 0, source.width, source.height);
    // xóa bỏ nội dung đã vẽ trong ngữ cảnh vẽ 2D (ctx) của"source"
    // bằng cách chỉ định tọa độ x, y của góc trái trên cùng 
    // và chiều rộng, chiều cao của hình chữ nhật

    ctx1.clearRect(0, 0, source.width, source.height);
    // xóa bỏ nội dung đã vẽ trong ngữ cảnh vẽ 2D (ctx1) của "share-1".

    ctx2.clearRect(0, 0, source.width, source.height);
    // xóa bỏ nội dung đã vẽ trong ngữ cảnh vẽ 2D (ctx1) của "share-2".
  });


  // click vào encrypt:
  $(document).on('click', '.encrypt', function () {
    $('#source').hide(); // ẩn phần tử có id là "source" khỏi giao diện.
    $('.bounds').show(); // hiển thị các phần tử có lớp "bounds"

    ctx1.clearRect(0, 0, ctx1.width, ctx1.height); // xóa nội dung đã vẽ của "share-1"
    ctx2.clearRect(0, 0, ctx2.width, ctx2.height); // xóa nội dung đã vẽ của "share-2"


    var srcData = ctx.getImageData(0, 0, source.width, source.height);
    // lấy dữ liệu hình ảnh từ ngữ cảnh vẽ 2D (ctx) của phần tử có id là "source".
    // và dữ liệu hình ảnh được lưu trữ trong biến srcData.

    var share1Data = ctx1.getImageData(0, 0, share1.width, share1.height);
    // lấy dữ liệu hình ảnh từ ngữ cảnh vẽ 2D (ctx1) của phần tử có id là "share-1". 
    // và dữ liệu hình ảnh được lưu trữ trong biến share1Data.

    var share2Data = ctx2.getImageData(0, 0, share2.width, share2.height);
    // lấy dữ liệu hình ảnh từ ngữ cảnh vẽ 2D (ctx1) của phần tử có id là "share-2". 
    // và dữ liệu hình ảnh được lưu trữ trong biến share2Data.

    // duyệt qua từng pixel trong srcData bằng vòng lặp for:
    for (var x = 0; x < srcData.width; x += 2)
    //  x tăng lên 2 sau mỗi vòng lặp để nhảy qua mỗi pixel thứ hai trên hàng ngang
    {
      for (var y = 0; y < srcData.height; y++) {
        var i = ((y * srcData.width * 4) + (x * 4));
        // chỉ mục i của pixel hiện tại trong mảng dữ liệu hình ảnh
        // được lưu trữ dưới dạng 4 giá trị (RGBA) trong mảng dữ liệu.

        var isBlack = srcData.data[i + 3] == 255;
        // kiểm tra xem pixel hiện tại có màu đen hay không.
        // nếu (srcData.data[i + 3]) bằng 255 có nghĩa là pixel đó có màu đen.

        // thực hiện mã hóa pixel
        if (isBlack) {
          if (coinFlip()) // true ( đồng xu mặt ngửa )
          {
            // Gọi hàm paintPixel(share1Data, i) để vẽ pixel tại vị trí i trong share1Data.
            paintPixel(share1Data, i);
            // Gọi hàm paintPixel(share2Data, i + 4) để vẽ pixel tại vị trí i + 4 trong share2Data. 
            paintPixel(share2Data, i + 4);
            // chú thích: Việc tăng i lên 4 đảm bảo rằng các pixel được vẽ trong share1Data và share2Data không trùng nhau.
          } else {
            // Gọi hàm paintPixel(share1Data, i + 4) để vẽ pixel tại vị trí i + 4 trong share1Data.
            paintPixel(share1Data, i + 4);
            // Gọi hàm paintPixel(share2Data, i) để vẽ pixel tại vị trí i trong share2Data. 
            paintPixel(share2Data, i);
          }
        } else // pixel hiện tại ko phải màu đen: 
        {
          if (coinFlip()) // nếu đúng (đồng xu mặt ngửa )
          {
            // Gọi hàm paintPixel(share1Data, i) để vẽ pixel tại vị trí i trong share1Data.
            paintPixel(share1Data, i);
            // Gọi hàm paintPixel(share2Data, i) để vẽ pixel tại vị trí i trong share2Data.
            paintPixel(share2Data, i);
            // chú thích: Việc vẽ cùng một giá trị i trong cả share1Data và share2Data đảm bảo rằng các pixel được vẽ là giống nhau.
          } else {
            // Gọi hàm paintPixel(share1Data, i + 4) để vẽ pixel tại vị trí i + 4 trong share1Data.
            paintPixel(share1Data, i + 4);
            // Gọi hàm paintPixel(share2Data, i + 4) để vẽ pixel tại vị trí i + 4 trong share2Data.
            paintPixel(share2Data, i + 4);
          }
        }
      }
    }

    ctx1.putImageData(share1Data, 50, 0); 
    // vẽ dữ liệu hình ảnh từ share1Data lên ngữ cảnh vẽ 2D(ctx1) của phần tử có id là "share-1"
    ctx2.putImageData(share2Data, 50, 0);
    // vẽ dữ liệu hình ảnh từ share1Data lên ngữ cảnh vẽ 2D(ctx1) của phần tử có id là "share-2"

    $('.encrypt').hide(); // ẩn các phần tử của lớp "encrypt"
    $('.decrypt').show(); // hiển thị các phần tử của lớp "decrypt"

  });

  // click vào decrypt để thực hiện hiệu ứng chuyển động 
  $(document).on('click', '.decrypt', function () {
    // tạo hiệu ứng chuyển động cho thuộc tính được thay đổi.
    $('.bounds').animate({ height: $('#share-1').height() + 4 }, { duration: 5000 });
    //  ẩn các phần tử của lớp "decrypt"
    $('.decrypt').hide();
  });

});