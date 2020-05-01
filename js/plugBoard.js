function PlugBoard() {
    this.plugs = [];
    this.plugPoints = [];
    this.showing = false;
    this.movingPlug = false;
    this.movingPlugNo = 0;

    for (let i = 0; i < 26; i++) {
        let p = new PlugPoint(i);
        this.plugPoints.push(p);
    }
    
    this.randomisePlugs = function() {
        let choosen = [];
        for (let i = 0; i < 10; i++) {
            let rand1 = floor(random(26));
            while (choosen.includes(rand1)) {
                rand1 = floor(random(26));
            }
            choosen.push(rand1);
            let rand2 = floor(random(26));
            while (choosen.includes(rand2)) {
                rand2 = floor(random(26));
            }
            choosen.push(rand2);
            let p = new Plug(rand1, rand2, this.plugPoints[rand1], this.plugPoints[rand2]);
            this.plugs.push(p);
            this.plugPoints[rand1].occupied = true;
            this.plugPoints[rand2].occupied = true;
        }
    }
    this.randomisePlugs();
    
    this.show = function() {
        for (let i = 0; i < 26; i++) {
            this.plugPoints[i].show();
        }
        for (let i = 0; i < 10; i++) {
            this.plugs[i].showPlugs();
        }
        for (let i = 0; i < 10; i++) {
            this.plugs[i].showLines();
        }
    }

    this.runThrough = function(input) {
        for (let i = 0; i < 10; i++) {
            if (this.plugs[i].conn1 == input) {
                return this.plugs[i].conn2;
            } else if (this.plugs[i].conn2 == input) {
                return this.plugs[i].conn1;
            }
        }
        return input;
    }

    this.click = function(x, y) {
        if (!this.movingPlug) {
            for (let i = 0; i < 10; i++) {
                if (this.plugs[i].click(x, y)) {
                    this.movingPlug = true;
                    this.movingPlugNo = i;
                    return;
                }
            }
        } else {
            for (let i = 0; i < 26; i++) {
                if (this.plugPoints[i].click(x, y)) {
                    if (!this.plugPoints[i].occupied) {
                        this.movingPlug = false;
                        if (this.plugs[this.movingPlugNo].move1) {
                            this.plugs[this.movingPlugNo].setPlugPoint(i, this.plugPoints[i], 1);
                            this.plugs[this.movingPlugNo].move1 = false;
                        } else {
                            this.plugs[this.movingPlugNo].setPlugPoint(i, this.plugPoints[i], 2);
                            this.plugs[this.movingPlugNo].move2 = false;
                        }
                    }
                    return;
                }
            }
        }
    }
}