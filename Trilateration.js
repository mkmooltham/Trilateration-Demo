//Trilateration editer: Jack Mooltham
var height = 1.05;
var width_pixel = 311, depth_pixel =400; //in pixel
var width_meter = 10.5, depth_meter = 13.5; //in meter
var mToPiRatio = (width_pixel/width_meter+depth_pixel/depth_meter)/2; // meter to pixel ratio
var movingRange_A = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var movingRange_B = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var movingRange_C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var idKey = { 
	'0': { x:0, y:0 }, 
	'1': { x:0, y:depth_pixel },
	'2': { x:width_pixel, y:depth_pixel/2 },
    '0117C5314649': { x:311, y:200 }, //Simon
    '0117C533BAC6': { x:0, y:400 }, //Jack
    '0117C5310411': { x:0, y:0 }, //O gor
    '0117C596DBEE': { x:0, y:0 } //YunZi
};


//Main Function
function userPosition(aid='0',ar=15,bid='1',br=15,cid='2',cr=15){
	ar = netRadius(ar, movingRange_A);
	br = netRadius(br, movingRange_B);
	cr = netRadius(cr, movingRange_C);

	var circ_A = new Circ("a",idKey[aid]['x'],idKey[aid]['y'],ar);
	var circ_B = new Circ("b",idKey[bid]['x'],idKey[bid]['y'],br);
	var circ_C = new Circ("c",idKey[cid]['x'],idKey[cid]['y'],cr);

	var Bisec_AB = calBisectPoint(circ_A, circ_B);
	var Bisec_BC = calBisectPoint(circ_B, circ_C);
	var Bisec_AC = calBisectPoint(circ_A, circ_C);
	
	var cal_V = calOrthocentre(Bisec_AB, Bisec_BC, Bisec_AC);
	return cal_V;
}


//Point
function Point(name="", x=0, y=0){
	this.name = name;
	this.x = x;
	this.y = y;
}

Point.prototype.getInfo = function() {
    return this.name+" ( "+this.x+", "+this.y+" )";
};

//Circle
function Circ(name="", x=0, y=0, r=0){
	this.name = name;
	this.x = x;
	this.y = y;
	this.r = r;
	this.center = new Point(name, x, y);
}

Circ.prototype.getCenter = function(){
		return this.point;
};

Circ.prototype.getInfo = function() {
    return this.name+" ( "+this.x+", "+this.y+", "+this.r+", ( "+this.center.x+","+this.center.y+" ) )";
};

//Math
function sq(a){
	return Math.pow(a,2);
}

function sqrt(a){
	return Math.sqrt(a);
}

function solveQuadEqua(a,b,c,ans){
	var ans_1=0;
	var ans_2=0;

	var delta = sq(b) - 4 * a * c;

	if (delta > 0){
		ans_1 = (-b+sqrt(delta))/(2*a);
		ans_2 = (-b-sqrt(delta))/(2*a);
	} else if(delta ==0){
		ans_1 = ans_2 = (-b+sqrt(delta))/(2*a);
	} else{
		ans_1 = ans_2 = "no solutions"
	}

	if(ans == 1){
			return ans_1;
		} else {
			return ans_2;
		}
}

function calBisectPoint(circA, circB){
	var circleBisectPoint = new Point("Bisect"+circA.name+circB.name);

	var ax = circA.x;
	var ay = circA.y;
	var ar = circA.r;
	var bx = circB.x;
	var by = circB.y;
	var br = circB.r;

	if(ax-bx == 0) ax=bx+0.1;
	var a = (sq(ay)-2*ay*by+sq(by))/sq(ax-bx) + 1;
	var b = (-2*ax*sq(ay)+4*ax*ay*by-2*ax*sq(by))/sq(ax-bx) - 2*ax;
	var c = (sq(ax*ay)-2*sq(ax)*ay*by+sq(ax*by))/sq(ax-bx) - sq(ar/(ar+br))*(sq(ay-by)+sq(ax-bx)) + sq(ax);
	var m_1 = solveQuadEqua(a,b,c,1);
	var m_2 = solveQuadEqua(a,b,c,2);

	if(ax>bx){ var l_circ_x =bx, r_circ_x = ax; }else{var l_circ_x =ax, r_circ_x = bx; }
	if(l_circ_x<m_1 && m_1 < r_circ_x){circleBisectPoint.x = m_1; }else{circleBisectPoint.x = m_2;}

	circleBisectPoint.y = (ay-by)/(ax-bx)*(circleBisectPoint.x-ax)+ay;

	return circleBisectPoint;
}

function calOrthocentre(Bisect1, Bisect2, Bisect3){
	var orthocentre = new Point("Orthocentre");
	var a, b;
	a = (Bisect2.x-Bisect1.x)/(Bisect1.y-Bisect2.y);
	b = (Bisect3.x-Bisect1.x)/(Bisect1.y-Bisect3.y);
	orthocentre.x = (Bisect3.x*a-Bisect2.x*b-Bisect3.y+Bisect2.y)/(a-b);
	orthocentre.y = (orthocentre.x-Bisect3.x)*a+Bisect3.y;
	return orthocentre;
}

//Preporcessing
function netRadius(a, movingRange){
	a = removeHeightVector(a);
	a = meterToPixel(a);
	a = rangeAverage(a, movingRange);
	return a;
}

function removeHeightVector(a){
	if(a <= height){
		return a;
	} else{
		return sqrt(sq(a)-sq(height));
	}
}

function meterToPixel(a){
	return mToPiRatio*a;
}

function rangeAverage(a, movingRange){
	for (var i = 0; i < movingRange.length; i++) {
		if(i != movingRange.length-1){
			movingRange[i]=movingRange[i+1];
		} else{
			movingRange[i]=a;
		}
	};

	var sum=0, counter=0, averge=0;

	for (var i = 0; i < movingRange.length; i++) {
		if(movingRange[i] != 0){
 			counter += 1;
 			sum += movingRange[i];
		}
	};

	averge = sum/counter;
	return averge;
}

//ID matching
function idMatching(id){

}


//Calibration
function changeHeight(a){
 height = a;
}

function clearRange(){
	movingRange_A = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	movingRange_B = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	movingRange_C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
}
