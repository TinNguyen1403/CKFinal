const admin = require('firebase-admin');
const serviceAccount = require('./shoppingapp-5e4b4-firebase-adminsdk-6aara-7aa4acf18f.json'); // Thay bằng đường dẫn đến tệp JSON khóa riêng tư của bạn

// Khởi tạo ứng dụng Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Lấy tham chiếu đến Firestore từ Firebase Admin
const firestore = admin.firestore();

// Hàm để thêm tài liệu vào Firestore
const addDocumentToFirestore = async (collectionName, documentData) => {
  try {
    // Kiểm tra xem trường NgayBatDau và NgayKetThuc có tồn tại không
    if (documentData.NgayBatDau && documentData.NgayKetThuc) {
      // Thêm tài liệu vào Firestore
      const docRef = await firestore.collection(collectionName).add(documentData);
      console.log("Document written with ID: ", docRef.id);
    } else {
      console.error("Error adding document: NgayBatDau or NgayKetThuc is undefined");
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Sử dụng hàm addDocumentToFirestore với collectionName và documentData tương ứng
addDocumentToFirestore("KHUYENMAI", {
  TenKM: "Khuyến mãi giảm giá",
  MoTaKM: "Giảm giá 20% cho tất cả sản phẩm",
  ThoiGianBD: "01/06/2024",
  ThoiGianKT: "30/06/2024",
  HinhAnhKM: "URL_HinhAnh",
  // Thêm các trường khác nếu cần
});
