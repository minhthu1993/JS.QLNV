/** Thực hiện các chức năng quản lí nhân viên
 * - Tạo ra một array nhân viên giúp lưu trữ các đối tượng nhân viên từ người dùng tạo ra
 *
 */

// -------- Thêm nhân viên -------------
/**
 * Đầu tiên B1: lấy tất cả các thông tin của người dùng được nhập vào
 * B2: tạo ra một đối tượng có từ lớp đối tượng được định nghĩa và gán các giá trị người dùng nhập vào đối tượng đó
 * B3: dùng mảng tạo ra bên trên để push đối tượng vào và lưu trữ
 * B4: hiển thị dữ liệu ra cho người dùng có thể xem, chạy vòng lặp với mảng và tạo ra các chuỗi nội dung, sau khi tạo xong gọi dom tới thẻ cần hiển thị và gán nội dung vào
 */

let ARR_NHAN_VIEN = [];
const DATA_NHAN_VIEN = [
    TAI_KHOAN = {
        INPUT : "tknv",
        NOTIFY : "tbTKNV"
    },
    NAME = {
        INPUT : "name",
        NOTIFY : "tbTen"
    },
    EMAIL = {
        INPUT : "email",
        NOTIFY : "tbEmail"
    },
    PASSWORD = {
        INPUT : "password",
        NOTIFY : "tbMatKhau"
    },
    DATE = {
        INPUT : "datepicker",
        NOTIFY : "tbNgay"
    },
    LUONG = {
        INPUT : "luongCB",
        NOTIFY : "tbLuongCB"
    },
    CHUC_VU = {
        INPUT : "chucvu",
        NOTIFY : "tbChucVu"
    },
    GIO_LAM = {
        INPUT : "gioLam",
        NOTIFY : "tbGiolam"
    },
];


const CHECK = [
    "CHECK_TAI_KHOAN",
    "CHECK_NAME",
    "CHECK_EMAIL",
    "CHECK_PASSWORD",
    "CHECK_DATE",
    "CHECK_LUONG",
    "CHECK_CHUC_VU",
    "CHECK_GIO_LAM",
]
const ARR_INPUT = ['tknv', 'name', 'email', 'password', 'datepicker', 'luongCB', 'chucvu', 'gioLam'];
const ARR_NOTIFY = ['tbTKNV', 'tbTen', 'tbEmail', 'tbMatKhau', 'tbNgay', 'tbLuongCB', 'tbChucVu', 'tbGiolam'];

document.getElementById('btnThem').onclick = function(){
    document.getElementById("tknv").readOnly = false;
    document.getElementById("btnCapNhat").style.display = "none";
    document.getElementById("btnThemNV").style.display = "inline-block";
    for (let i = 0; i < DATA_NHAN_VIEN.length; i++) {
        document.getElementById(DATA_NHAN_VIEN[i].INPUT).value = "";
        document.getElementById(DATA_NHAN_VIEN[i].NOTIFY).value = "";
        document.getElementById(DATA_NHAN_VIEN[i].NOTIFY).style.display = "none";
    }
}

document.getElementById('btnThemNV').onclick = themNhanVien;
document.getElementById('btnCapNhat').onclick = capNhatNhanVien;
document.getElementById('btnTimNV').onclick = findNhanVien;

function themNhanVien() {
    event.preventDefault();
    const nhanVien = new NhanVien();
    let isValid = true;
    let isValidation = true;
    for (let i = 0; i < DATA_NHAN_VIEN.length; i++) {
        isValidation = checkValidation(DATA_NHAN_VIEN[i].INPUT, DATA_NHAN_VIEN[i].NOTIFY, CHECK[i]);
        if(!isValidation) isValid = false;
        nhanVien[DATA_NHAN_VIEN[i].INPUT] = document.getElementById(DATA_NHAN_VIEN[i].INPUT).value;
    }
    if(isValid) {
        ARR_NHAN_VIEN.push(nhanVien);
        renderNhanVien(ARR_NHAN_VIEN);
        luuLocal();
    }
}

function renderNhanVien(arrNhanVien) {
    let content = '';
    for (let i = 0; i < arrNhanVien.length; i++) {
        const nhanVien = arrNhanVien[i];
        const newNhanVien = new NhanVien();
        Object.assign(newNhanVien, nhanVien);
        "password",
          "datepicker",
          "luongCB",
          "",
          "gioLam",
          (content += `
          <tr>
            <td>${newNhanVien.tknv}</td>
            <td>${newNhanVien.name}</td>
            <td>${newNhanVien.email}</td>
            <td>${newNhanVien.datepicker}</td>
            <td>${newNhanVien.chucvu}</td>
            <td>${newNhanVien.tinhTongLuong()}</td>
            <td>${newNhanVien.xepLoaiNhanVien()}</td>
            <td>
                <button onclick="xoaNhanVien(${newNhanVien.tknv})" class="btn btn-danger">Xoá</button>
                <button data-toggle="modal" data-target="#myModal" onclick="layThongTinNhanVien(${newNhanVien.tknv})" class="btn btn-warning">Sửa</button>
            </td>
          </tr>
          `);
      }
      document.getElementById("tableDanhSach").innerHTML = content;
}

function xoaNhanVien(taiKhoan) {
    let index = -1;
    for (let i = 0; i < ARR_NHAN_VIEN.length; i++) {
        if (ARR_NHAN_VIEN[i].tknv == taiKhoan) {
            index = i;
        }
    }
    ARR_NHAN_VIEN.splice(index, 1);
    renderNhanVien(ARR_NHAN_VIEN);
    luuLocal()
}

function layThongTinNhanVien(taiKhoan) {
    let nhanVien;
    for (let i = 0; i < ARR_NHAN_VIEN.length; i++) {
      if (ARR_NHAN_VIEN[i].tknv == taiKhoan) {
        nhanVien = ARR_NHAN_VIEN[i];
      }
    }
    for (let i = 0; i < DATA_NHAN_VIEN.length; i++) {
      document.getElementById(DATA_NHAN_VIEN[i].INPUT).value = nhanVien[DATA_NHAN_VIEN[i].INPUT];
    }
    document.getElementById("btnCapNhat").style.display = "inline-block";
    document.getElementById("btnThemNV").style.display = "none";
    document.getElementById("tknv").readOnly = true;
}

function capNhatNhanVien() {
    const nhanVien = new NhanVien();
    for (var i = 0; i < DATA_NHAN_VIEN.length; i++) {
      nhanVien[DATA_NHAN_VIEN[i].INPUT] = document.getElementById(DATA_NHAN_VIEN[i].INPUT).value;
    }

    let index = -1;
    for (let i = 0; i < ARR_NHAN_VIEN.length; i++) {
      if (ARR_NHAN_VIEN[i].tknv == nhanVien.tknv) {
        index = i;
      }
    }
    ARR_NHAN_VIEN[index] = nhanVien;
    renderNhanVien(ARR_NHAN_VIEN);
    luuLocal();
}

function findNhanVien() {
   const typeNhanVien = document.getElementById("searchName").value
   const arrFind = ARR_NHAN_VIEN.filter(elm => {
        const newNhanVien = new NhanVien();
        Object.assign(newNhanVien, elm);
        return newNhanVien.xepLoaiNhanVien() == typeNhanVien;
   })
   renderNhanVien(arrFind);
}

function luuLocal() {
    localStorage.setItem('ARR_NHAN_VIEN', JSON.stringify(ARR_NHAN_VIEN));
}

function layLocal() {
    const data = localStorage.getItem('ARR_NHAN_VIEN');
    if (data) {
      ARR_NHAN_VIEN = JSON.parse(data);
      renderNhanVien(ARR_NHAN_VIEN);
    }
}
layLocal();