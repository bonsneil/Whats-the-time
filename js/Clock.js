function Clock(cId, h, m, imgP) {
    this.clockId = cId;
    this.hour = h;
    this.minute = m;
    this.imgPath = imgP;
    this.srcImgElement = {};
    this.widthDigital = 150;
    this.heightDigital = 80;
}
