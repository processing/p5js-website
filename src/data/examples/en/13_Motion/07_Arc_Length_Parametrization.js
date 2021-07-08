/*
 * @name Arc Length Parametrization
 * @frame 710,400
 * @description based on code from Jakub Valtar.<br><br>
 * This class represents a cubic Bézier curve.<br><br>
 * getPointAtParameter() method works the same as bezierPoint().
 * Points returned from this method are closer to each other
 * at places where the curve bends and farther apart where the
 * curve runs straight.<br><br>
 * On the other hand, getPointAtFraction() and getPointAtLength()
 * return points at fixed distances. This is useful in many scenarios:
 * you may want to move an object along the curve at some speed
 * or you may want to draw dashed Bézier curves.
 */


 class BezierCurve {

   constructor(a, b, c, d){
     // Constants
     this.SEGMENT_COUNT = 100;
     // properties
     // these should be of type P5.Vector
     this.v0 = a;
     this.v1 = b;
     this.v2 = c;
     this.v3 = d;
     this.arcLengths = [];
     this.curveLength = 0;
     this.prev = this.v0.copy();
     this.arcLength = 0;

     // i goes from 0 to SEGMENT_COUNT
     for (let i = 0; i <= this.SEGMENT_COUNT; i++) {
       // map index from range (0, SEGMENT_COUNT) to parameter in range (0.0, 1.0)
       let t = i / this.SEGMENT_COUNT;

       // get point on the curve at this parameter value
       let point = this.pointAtParameter(t);

       // get distance from previous point
       let distanceFromPrev = p5.Vector.dist(this.prev, point);

       // add arc length of last segment to total length
       this.arcLength += distanceFromPrev;

       // save current arc length to the look up table
       this.arcLengths[i] = this.arcLength;

       // keep this point to compute length of next segment
       this.prev.set(point);

       // Here we have sum of all segment lengths, which should be
       // very close to the actual length of the curve. The more
       // segments we use, the more accurate it becomes.
       this.curveLength = this.arcLength;
     }
   }

   // Returns a point along the curve at a specified parameter value.
   pointAtParameter(t) {
     let result = createVector(0, 0);
     result.x = bezierPoint(this.v0.x, this.v1.x, this.v2.x, this.v3.x, t);
     result.y = bezierPoint(this.v0.y, this.v1.y, this.v2.y, this.v3.y, t);
     return result;
   };

   // Returns the length of this curve
   length() {
     return this.curveLength;
   };

   // Returns a point at a fraction of curve's length.
   // Example: pointAtFraction(0.25) returns point at one quarter of curve's length.
   pointAtFraction(r) {
     let wantedLength = this.curveLength * r;
     return this.pointAtLength(wantedLength);
   };

   // Returns a point at a specified arc length along the curve.
   pointAtLength(wantedLength) {
     wantedLength = constrain(wantedLength, 0.0, this.curveLength);

     // look up the length in our look up table
     // binarySearch requires a sorted array
     // JS defaults to sorting by string so provide a function for sorting numbers
     // let sortedArray = array.sort(function(a, b){return a-b});
     let index = binarySearch(this.arcLengths, wantedLength);

     let mappedIndex;

     if (index < 0) {
       // if the index is negative, exact length is not in the table,
       // but it tells us where it should be in the table

       // interpolate two surrounding indexes
       let nextIndex = -(index + 1);
       let prevIndex = nextIndex - 1;
       let prevLength = arcLengths[prevIndex];
       let nextLength = arcLengths[nextIndex];
       mappedIndex = map(
         wantedLength,
         prevLength,
         nextLength,
         prevIndex,
         nextIndex
       );
     } else {
       // wanted length is in the table, we know the index right away
       mappedIndex = index;
     }

     // map index from range (0, SEGMENT_COUNT) to parameter in range (0.0, 1.0)
     let parameter = mappedIndex / this.SEGMENT_COUNT;

     return this.pointAtParameter(parameter);
   };

   // Returns an array of equidistant p5.Vector points on the curve
   equidistantPoints(howMany) {
     let resultPoints = [];

     // we already know the beginning and the end of the curve
     resultPoints[0] = this.v0.copy();
     resultPoints[howMany - 1] = this.v3.copy();

     let arcLengthIndex = 1;
     for (let i = 1; i < howMany - 1; i++) {
       // compute wanted arc length
       let fraction = i / (howMany - 1);
       let wantedLength = fraction * this.curveLength;

       // move through the look up table until we find greater length
       while (
         wantedLength > this.arcLengths[arcLengthIndex] &&
         arcLengthIndex < this.arcLengths.length
       ) {
         arcLengthIndex++;
       }

       // interpolate two surrounding indexes
       let nextIndex = arcLengthIndex;
       let prevIndex = arcLengthIndex - 1;
       let prevLength = this.arcLengths[prevIndex];
       let nextLength = this.arcLengths[nextIndex];
       let mappedIndex = map(
         wantedLength,
         prevLength,
         nextLength,
         prevIndex,
         nextIndex
       );

       // map index from range (0, SEGMENT_COUNT) to parameter in range (0.0, 1.0)
       let parameter = mappedIndex / this.SEGMENT_COUNT;

       resultPoints[i] = this.pointAtParameter(parameter);
     }

     return resultPoints;
   };

   // Returns an array of points on the curve.
   points(howMany) {
     let resultPoints = [];

     // we already know the first and the last point of the curve
     resultPoints[0] = this.v0.copy();
     resultPoints[howMany - 1] = this.v3.copy();

     for (let i = 1; i < howMany - 1; i++) {
       // map index to parameter in range (0.0, 1.0)
       let parameter = i / (howMany - 1);

       resultPoints[i] = this.pointAtParameter(parameter);
     }

     return resultPoints;
   };
 }

 // a built-in Binary Search function is available in Java but not in Javascript
 function binarySearch(sortedArray, elt) {
   let lowIndex = 0;
   let highIndex = sortedArray.length - 1;

   while (lowIndex <= highIndex) {
     let midIndex = Math.floor((lowIndex + highIndex) / 2);
     if (sortedArray[midIndex] == elt) {
       return midIndex;
     } else if (sortedArray[midIndex] < elt) {
       lowIndex = midIndex + 1;
     } else {
       highIndex = midIndex - 1;
     }
   }
   return -(lowIndex + 1);
 }

 // variables
 let curve;
 let equidistant_points = [];
 let index;
 let pointsCount;
 let movement_points;
 let a = { x: 100, y: 200 };
 let b = { x: 250, y: 100 };
 let c = { x: 450, y: 300 };
 let d = { x: 600, y: 200 };
 let vector_a;
 let vector_b;
 let vector_c;
 let vector_d;

 function setup() {
   createCanvas(710, 400);
   background(200);

   // create a BezierCurve boject
   vector_a = createVector(a.x, a.y);
   vector_b = createVector(b.x, b.y);
   vector_c = createVector(c.x, c.y);
   vector_d = createVector(d.x, d.y);

   curve = new BezierCurve(vector_a,
                           vector_b,
                           vector_c,
                           vector_d);

   equidistant_points = curve.equidistantPoints(10);
   movement_points = curve.equidistantPoints(200);
   index = 0;
 }

 function draw() {
   background(200);
   // draw the bezier curve with the regular p5 function
   noFill();
   stroke(255);
   strokeWeight(5);
   bezier(a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y);

   // draw circles at the equally spaced points
   fill(100);
   for (vector of equidistant_points) {
     ellipse(vector.x, vector.y, 10, 10);
   }

   // draw a circle moving at a constant speed
   if (index < movement_points.length) {
     let pos = movement_points[index];
     fill(255);
     stroke(0, 200, 255);

     ellipse(pos.x, pos.y, 10, 10);
   } else {
     index = 0;
   }
   index += 1;
 }
