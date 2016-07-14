
module.exports = {

  getImageSource(imageName) {
    switch (imageName) {
      case 'SachTiengViet_Icon': return require('./SachTiengViet_Icon.jpg');
      case 'VanHoaPham_Icon': return require('./VanHoaPham_Icon.jpg');
      case 'CatelogyIcon' : return require('./CatelogyIcon.jpg');
      case 'Do_Luu_Niem_Icon' : return require('./Do_Luu_Niem_Icon.jpg');
      case 'Fahasa' : return require('./Fahasa.png');
      case 'girl_icon' : return require('./girl_icon.jpg');
      case 'SachCuaToi' : return require('./SachCuaToi.png');
      case 'SearchIcon' : return require('./SearchIcon.png');
      case 'blackStar' : return require('./blackStar.png');
      case 'Star' : return require('./Star.png');
      case 'halfStar' : return require('./halfStar.png');
      case 'minus' : return require('./minus.png');
      case 'plus' : return require('./plus.png');
      //case 'ThanhChonIon' :
      //case 'TrangChu_Icon' :
      //case 'VanPhongPham_Icon' :
    }
  }
};
