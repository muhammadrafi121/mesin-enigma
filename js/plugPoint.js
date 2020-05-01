function PlugPoint(no) {
    this.occupied = false;
    this.letterNo = no;
    this.letter = letterOrder[no];
    this.level;
    this.rowPos;
    this.x;
    this.y;

    if (no < 10) {
        this.level = 1;
        this.rowPos = no;
        this.x = (this.rowPos + 1) * width / 11;
    } else if (no < 19) {
        this.level = 2;
        this.rowPos = no - 10;
        this.x = (this.rowPos + 1.5) * width / 11;
    } else {
        this.level = 3;
        this.rowPos = no - 19;
        this.x = (this.rowPos + 2) * width / 11;
    }
    this.y = height / 3 + this.level * (height * 2/3) / 4;

    if (no % 3 == 0) {
        this.y += 15;
    }
    this.pos = createVector(this.x, this.y);

    this.show = function() {
        textAlign(CENTER, CENTER);
        textSize(20);
        fill(255);
        text(this.letter, this.pos.x, this.pos.y - 40);
        fill(20);
        stroke(255);

        ellipse(this.pos.x, this.pos.y, 20, 20);
        ellipse(this.pos.x, this.pos.y+30, 20, 20);
    }

    this.click = function(x, y) {
        if (x < this.pos.x +15 && x > this.pos.x - 15 && y < this.pos.y +35 && y > this.pos.y - 35) {
            return true;
        }
        return false;
    }
}