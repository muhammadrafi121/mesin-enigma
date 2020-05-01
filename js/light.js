function Light(lett, numb) {
    this.lightUp = false;
    this.letter = lett;
    this.number = numb;
    this.level;
    this.rowPos;
    this.x;
    this.y;

    if (numb < 10) {
        this.level = 1;
        this.rowPos = numb;
        this.x = (this.rowPos + 1.0) * width / 11;
    } else if (numb < 19) {
        this.level = 2;
        this.rowPos = numb - 10;
        this.x = (this.rowPos + 1.5) * width / 11;
    } else {
        this.level = 3;
        this.rowPos = numb - 19;
        this.x = (this.rowPos + 2.0) * width / 11;
    }
    this.y = height / 3 + this.level * (height * 2/3) / 4;
    this.pos = createVector(this.x, this.y);

    this.show = function() {
        strokeWeight(5);
        fill(150);
        if (this.lightUp) {
            fill(200, 100, 0);
            ellipse(this.pos.x, this.pos.y, 80, 80);
        } else {
            ellipse(this.pos.x, this.pos.y, 80, 80);
            fill(50);
        }
        textAlign(CENTER, CENTER);
        textSize(20);
        text(this.letter, this.pos.x, this.pos.y);
    }
}