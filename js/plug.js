function Plug(c1, c2, p1, p2) {
    this.move1 = false;
    this.move2 = false;
    this.point1 = p1;
    this.point2 = p2;
    this.conn1 = c1;
    this.conn2 = c2;

    this.setPlugPoint = function(plugPointNo, newPoint, connNo) {
        newPoint.occupied = true;
        if (connNo == 1) {
            this.point1 = newPoint;
            this.conn1 = plugPointNo;
        } else if (connNo == 2) {
            this.point2 = newPoint;
            this.conn2 = plugPointNo;
        }
    }

    this.showLines = function() {
        stroke(100, 100, 200, 150);
        strokeWeight(3);

        if (this.move1) {
            line(mouseX, mouseY, this.point2.pos.x, this.point2.pos.y + 15);
        } else if (this.move2) {
            line(this.point1.pos.x, this.point1.pos.y + 15, mouseX, mouseY);
        } else {
            line(this.point1.pos.x, this.point1.pos.y + 15, this.point2.pos.x, this.point2.pos.y + 15);
        }
        // if (!this.move1 && !this.move2) {
        //     line(this.point1.pos.x, this.point1.pos.y + 15, this.point2.pos.x, this.point2.pos.y + 15);
        // }
    }

    this.showPlugs = function() {
        stroke(200);
        fill(40);
        rectMode(CENTER);

        if (this.move1) {
            rect(mouseX, mouseY, 30, 70);
            rect(this.point2.pos.x, this.point2.pos.y + 15, 30, 70);
        } else if (this.move2) {
            rect(this.point1.pos.x, this.point1.pos.y + 15, 30, 70);
            rect(mouseX, mouseY, 30, 70);
        } else {
            rect(this.point1.pos.x, this.point1.pos.y + 15, 30, 70);
            rect(this.point2.pos.x, this.point2.pos.y + 15, 30, 70);
            fill(255);
            textSize(10);
            text(this.point2.letter, this.point1.pos.x, this.point1.pos.y + 15);
            text(this.point1.letter, this.point2.pos.x, this.point2.pos.y + 15);
        }

        // if (!this.move1 && !this.move2) {
        //     rect(this.point1.pos.x, this.point1.pos.y + 15, 30, 70);
        //     rect(this.point2.pos.x, this.point2.pos.y + 15, 30, 70);
        //     fill(255);
        //     textSize(10);
        //     text(this.point2.letter, this.point1.pos.x, this.point1.pos.y + 15);
        //     text(this.point1.letter, this.point2.pos.x, this.point2.pos.y + 15);
        // }
    }

    this.click = function(x, y) {
        if (x < this.point1.pos.x +15 && x > this.point1.pos.x - 15 && y < this.point1.pos.y + 50 && y > this.point1.pos.y - 20) {
            this.move1 = true;
            this.point1.occupied = false;
            return true;
        } else if (x < this.point2.pos.x +15 && x > this.point2.pos.x - 15 && y < this.point2.pos.y + 50 && y > this.point2.pos.y - 20) {
            this.move2 = true;
            this.point2.occupied = false;
            return true;
        }
        return false;
    }
}