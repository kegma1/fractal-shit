class Branch {
  constructor(begin, end, len, angel, opacity) {
    this.begin = begin;
    this.end = end;
    this.grown = false;
    this.len = len;
    this.shrink = 0.67;
    this.angel = angel;

    this.draw = () => {
      stroke(opacity);
      strokeWeight(this.len / TWO_PI);
      line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    };

    this.branch = () => {
      let dir = p5.Vector.sub(this.end, this.begin);
      dir.rotate(PI / this.angel);
      dir.mult(this.shrink);
      let newEndR = p5.Vector.add(this.end, dir);
      let right = new Branch(this.end, newEndR, len * this.shrink, this.angel, opacity);
      dir.rotate((-PI / this.angel) * 2);
      let newEndL = p5.Vector.add(this.end, dir);
      let left = new Branch(this.end, newEndL, len * this.shrink, this.angel, opacity);

      return [right, left];
    };


    this.branchThree = () => {
        let dir = p5.Vector.sub(this.end, this.begin);
        dir.rotate(PI / this.angel);
        dir.mult(this.shrink);
        let newEndR = p5.Vector.add(this.end, dir);
        let right = new Branch(this.end, newEndR, len * this.shrink, this.angel);
        dir.rotate((-PI / this.angel) * 2);
        let newEndL = p5.Vector.add(this.end, dir);
        let left = new Branch(this.end, newEndL, len * this.shrink, this.angel);
        dir.rotate(PI / this.angel);
        let newEndC = p5.Vector.add(this.end, dir);
        let center = new Branch(this.end, newEndC, len * this.shrink, this.angel);
  
        return [right, left, center];
      };
  }
}
