function Enigma() {
    this.rotor1;
    this.rotor2;
    this.rotor3;
    this.showPlugs = false;
    this.end = new EndThing();
    this.plugBoard = new PlugBoard();

    this.setRotors = function(first, second, third) {
        if (first != second && second != third && third != first) {
            this.rotor1 = new Rotor(first, 1);
            this.rotor2 = new Rotor(second, 2);
            this.rotor3 = new Rotor(third, 3);
        }
    }

    this.runMachine = function(inputChar) {
        if (this.rotor1.rotorNo == this.rotor2.rotorNo || this.rotor3.rotorNo == this.rotor2.rotorNo  || this.rotor1.rotorNo == this.rotor3.rotorNo ) {
            console.log("Error rotors cannot have the same number");
            return '1';
        }
        let inputNo = letterOrderLowerCase.indexOf(inputChar);

        let currentNo = inputNo;
        currentNo = this.plugBoard.runThrough(currentNo);
        currentNo = this.rotor1.runThrough(currentNo, true);
        currentNo = this.rotor2.runThrough(currentNo, true);
        currentNo = this.rotor3.runThrough(currentNo, true);
        currentNo = this.end.runThrough(currentNo, true);
        currentNo = this.rotor3.runThrough(currentNo, false);
        currentNo = this.rotor2.runThrough(currentNo, false);
        currentNo = this.rotor1.runThrough(currentNo, false);
        currentNo = this.plugBoard.runThrough(currentNo);

        if (currentNo == -1) {
            console.log(this.rotor1.position, this.rotor2.position, this.rotor3.position);
        }
        if (currentNo == inputNo) {
            console.log(inputNo, this.rotor1.position, this.rotor2.position, this.rotor3.position);
        }
        this.moveRotor();

        return letterOrderLowerCase[currentNo];
    }

    this.moveRotor = function() {
        this.rotor1.position += 1;
        if (this.rotor1.position == 26) {
            this.rotor1.position = 0;
            this.rotor2.position+=1;
            if (this.rotor2.position == 26) {
                this.rotor2.position = 0;
                this.rotor3.position+=1;
                if (this.rotor3.position == 26) {
                    this.rotor3.position = 0;
                }
            }
        }
    }

    this.setRotorPositions = function(first, second, third) {
        this.rotor1.position = first;
        this.rotor2.position = second;
        this.rotor1.position = third;
    }

    this.show = function() {
        if (!this.showPlugs) {
            stroke(0);
            for (let i = 0; i < 26; i++) {
                letters[i].show();
            }

            this.rotor1.show();
            this.rotor2.show();
            this.rotor3.show();
            if (this.rotor1.rotorNo == this.rotor2.rotorNo || this.rotor1.rotorNo == this.rotor3.rotorNo || this.rotor2.rotorNo == this.rotor3.rotorNo) {
                fill(255, 0, 0);
                text("Cannot use the same rotor twice", width / 2, 50);
            }
        } else {
            this.plugBoard.show();
        }
    }

    this.randomRotor = function() {
        let rand1 = floor(random(5));
        let rand2 = floor(random(5));
        while (rand1 == rand2) {
            rand2 = floor(random(5));
        }
        let rand3 = floor(random(5));
        while (rand1 == rand3 || rand2 == rand3) {
            rand3 = floor(random(5));
        }
        this.setRotors(rand1, rand2, rand3);
    }

    this.randomPosition = function() {
        this.setRotorPositions(floor(random(26)), floor(random(26)), floor(random(26)));
    }

    this.click = function(x, y) {
        if (y > height*(9.0/10.0) && !this.plugBoard.movingPlug) {
            this.showPlugs = !this.showPlugs;
        } else {
            this.rotor1.click(x, y);
            this.rotor2.click(x, y);
            this.rotor3.click(x, y);
            this.plugBoard.click(x, y);
        }
    }

    this.processWord = function(input) {
        let output = [];

        for (let i = 0; i < input.length; i++) {
            let o = this.runMachine(input[i]);
            output.push(o);
        }
        return output;
    }
}