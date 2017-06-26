function Clock(cId, h, m, imgP) {
    this.clockId = cId;
    this.hour = h;
    this.minute = m;
    this.imgPath = imgP;
    this.srcImgElement = {};
    this.x = 0; //top left for canvas
    this.y = 0; //top left for canvas
    this.width = 150; //defaulte digital width
    this.height = 80; //default digial height
    this.timeString = function () {
        return this.hour + ":" + this.minute
    }
}
