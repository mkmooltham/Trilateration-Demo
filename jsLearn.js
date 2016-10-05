/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-09-12 19:15:38
 * @version $Id$
 */

var a_x = Number(document.getElementById("a_x").value);
var a_y = Number(document.getElementById("a_y").value);
var a_r = Number(document.getElementById("a_r").value);

var b_x = Number(document.getElementById("b_x").value);
var b_y = Number(document.getElementById("b_y").value);
var b_r = Number(document.getElementById("b_r").value);

var c_x = Number(document.getElementById("c_x").value);
var c_y = Number(document.getElementById("c_y").value);
var c_r = Number(document.getElementById("c_r").value);

var t1_x = 200;
var t1_y = 200;
var t1_slope = 0;

var t2_x = 200;
var t2_y = 200;
var t2_slope = 0;

var t3_x = 200;
var t3_y = 200;
var t3_slope = 0;

var u_x = 0;
var u_y = 0;

var circ_A = new Circ('A', a_x, a_y, a_r);
var circ_B = new Circ('B', b_x, b_y, b_r);
var circ_C = new Circ('C', c_x, c_y, c_r);
var circ_D = new Circ('D', a_x, a_y, a_r);
var circ_E = new Circ('E', b_x, b_y, b_r);
var circ_F = new Circ('F', c_x, c_y, c_r);
/*var circ_G = new Circ('G', c_x+200, c_y, c_r);
var circ_H = new Circ('H', 250+200, 200, 100);
var circ_I = new Circ('I', a_x+200+200, a_y, a_r);
var circ_J = new Circ('J', b_x+200+200, b_y, b_r);
var circ_K = new Circ('K', c_x+200+200, c_y, c_r);
var circ_L = new Circ('L', 250+200+200, 200, 100);
var circ_M = new Circ('M', a_x, a_y+200, a_r);
var circ_N = new Circ('N', b_x, b_y+200, b_r);
var circ_O = new Circ('O', c_x, c_y+200, c_r);
var circ_P = new Circ('P', 250, 200+200, 100);
var circ_Q = new Circ('Q', a_x+200, a_y+200, a_r);
var circ_R = new Circ('R', b_x+200, b_y+200, b_r);
var circ_S = new Circ('S', c_x+200, c_y+200, c_r);
var circ_T = new Circ('T', 250+200, 200+200, 100);
var circ_U = new Circ('U', a_x+200+200, a_y+200, a_r);
var circ_V = new Circ('V', b_x+200+200, b_y+200, b_r);
var circ_W = new Circ('W', c_x+200+200, c_y+200, c_r);
var circ_X = new Circ('X', 250+200+200, 200+200, 100);*/

var tang_1 = new PointLine('t1', t1_x, t1_y, t1_slope ); 
var tang_2 = new PointLine('t2', t2_x, t2_y, t2_slope ); 
var tang_3 = new PointLine('t3', t3_x, t3_y, t3_slope ); 

var u = new PointLine('user', u_x, u_y, 0);
var v = new PointLine("detect",u_x, u_y, 0);
var errorDis = 20;

var result=" ";

var drawed = false;

//Control
function insert() {
    a_x = Number(document.getElementById("a_x").value);
	a_y = Number(document.getElementById("a_y").value);
	a_r = Number(document.getElementById("a_r").value);

	b_x = Number(document.getElementById("b_x").value);
	b_y = Number(document.getElementById("b_y").value);
	b_r = Number(document.getElementById("b_r").value);

	c_x = Number(document.getElementById("c_x").value);
	c_y = Number(document.getElementById("c_y").value);
	c_r = Number(document.getElementById("c_r").value);
	circ_A = new Circ('A', a_x, a_y, a_r);
	circ_B = new Circ('B', b_x, b_y, b_r);
	circ_C = new Circ('C', c_x, c_y, c_r);
}

function updateErrorDis(){
	errorDis = document.getElementById("err_range").value;
}

function calLocation(){
	tang_1 =calTangent(circ_D, circ_E, tang_1);
	tang_2 =calTangent(circ_D, circ_F, tang_2);
	tang_3 =calTangent(circ_E, circ_F, tang_3);
    v = calOrthocentre(tang_1,tang_2,tang_3);
    drawPoint(v,"blue");

    result = "; Detected location ( "+parseInt(v.x)+" , "+parseInt(v.y)+" ) Error Distance = "+parseInt(distFromPts(u,v));
    document.getElementById("answer_tangent").innerHTML += result;

    v = calCentroid(tang_1,tang_2,tang_3);
    drawPoint(v,"purple");
    v = calIncentre(tang_1,tang_2,tang_3);
    drawPoint(v,"green");
}

function randomLocation(){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	inputCircle("yellow");

	u = randomIntercept(c.width, c.height, circ_A, circ_B, circ_C);

	drawPoint(u, "red");

	errorCircle(circ_D, errorDis);
	errorCircle(circ_E, errorDis);
	errorCircle(circ_F, errorDis);

	result = circ_D.getInfo()+' '+circ_E.getInfo()+' '+circ_F.getInfo();
    document.getElementById("answer_circle").innerHTML = result;
	result = "User Location ( "+u.x+" , "+u.y+" ) Sensor error <= "+errorDis;
    document.getElementById("answer_tangent").innerHTML = result;
}

function randomCircle(){
	var c = document.getElementById("myCanvas");
	document.getElementById("a_x").value = String(200);
	document.getElementById("b_x").value = String(400);
	document.getElementById("c_x").value = String(300);

	document.getElementById("a_y").value = String(200);
	document.getElementById("b_y").value = String(200);
	document.getElementById("c_y").value = String(374);

	document.getElementById("a_r").value = String(randomInt(180)+20);
	document.getElementById("b_r").value = String(randomInt(180)+20);
	document.getElementById("c_r").value = String(randomInt(180)+20);
	inputCircle();
}

function enlargeRadius(){
	drawed = false;
	var s = scaleFactor(a_r, b_r, c_r);
	document.getElementById("a_r").value = String(parseInt(a_r*s));
	document.getElementById("b_r").value = String(parseInt(b_r*s));
	document.getElementById("c_r").value = String(parseInt(c_r*s));
	inputCircle();
}

function enlargeRadius2(){
	drawed = false;
	var s = scaleFactor(a_r, b_r, c_r);
	document.getElementById("a_r").value = String(a_r+2);
	document.getElementById("b_r").value = String(b_r+2);
	document.getElementById("c_r").value = String(c_r+2);
	inputCircle();
}

document.getElementById('autoClear').onclick = function(){
	if(this.checked){
		this.value = true;
	}else{
		this.value = false;
	}
}

//Math
function sq(a){
	return Math.pow(a,2);
}

function sqrt(a){
	return Math.sqrt(a);
}

function randomInt(a){
	return parseInt( Math.random()*a);
}

function randomSign(){
	var a = Math.random();
	if( a<0.5 ){
		return -1;
	} else{
		return 1;
	}
}

function randomIntercept(rangeX, rangeY, circA, circB, circC){
	var u = new PointLine("u",0,0,0);
	u.x = randomInt(rangeX);
	u.y = randomInt(rangeY);
	if( sq(u.x-circA.x)+sq(u.y-circA.y) <= sq(circA.r)
		&& sq(u.x-circB.x)+sq(u.y-circB.y) <= sq(circB.r)
		&& sq(u.x-circC.x)+sq(u.y-circC.y) <= sq(circC.r)
		 ){
		return u;
	}else{
		return randomIntercept(rangeX, rangeY, circA, circB, circC);
	}
}

function errorCircle(circ, errorDis){
	var a = randomSign()*randomInt(errorDis);
	circ.r = distFromPts(u,circ.getCenter())+a;
	if (circ.r < 0 ){ circ.r *= -1;}
	drawCircle(circ,"black");
}

function scaleFactor(a, b, c, s=1.01){
	if ( parseInt(a*s) != a 
		 && parseInt(b*s) != b 
		 && parseInt(c*s) != c 
		){
		return s;
	} else{
		s+=0.1;
		return scaleFactor(a, b, c, s);
	}
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

function distFromPts(tang1, tang2){
	return sqrt( sq(tang1.x-tang2.x)+sq(tang1.y-tang2.y) );
}

function calTangent(circ_A, circ_B, tang){
	var ax = circ_A.x;
	var ay = circ_A.y;
	var ar = circ_A.r;
	var bx = circ_B.x;
	var by = circ_B.y;
	var br = circ_B.r;

	var a = (sq(ay)-2*ay*by+sq(by))/sq(ax-bx) + 1;
	var b = (-2*ax*sq(ay)+4*ax*ay*by-2*ax*sq(by))/sq(ax-bx) - 2*ax;
	var c = (sq(ax*ay)-2*sq(ax)*ay*by+sq(ax*by))/sq(ax-bx) - sq(ar/(ar+br))*(sq(ay-by)+sq(ax-bx)) + sq(ax);
	var m_1 = solveQuadEqua(a,b,c,1);
	var m_2 = solveQuadEqua(a,b,c,2);

	if(ax>bx){ var l_circ_x =bx, r_circ_x = ax; }else{var l_circ_x =ax, r_circ_x = bx; }
	if(l_circ_x<m_1 && m_1 < r_circ_x){tang.x = m_1; }else{tang.x = m_2;}

	tang.y = (ay-by)/(ax-bx)*(tang.x-ax)+ay;

	if((ay-by) != 0){tang.slope = (bx-ax)/(ay-by);}else{tang.slope = "undefined";}

	return tang;
}

function calIncentre(tang1, tang2, tang3){
	var incentre = new PointLine("Incentre",0,0,0);
	incentre.x = (distFromPts(tang2,tang3)*tang1.x+distFromPts(tang1,tang3)*tang2.x+distFromPts(tang1,tang2)*tang3.x)/
			(distFromPts(tang2,tang3)+distFromPts(tang1,tang3)+distFromPts(tang1,tang2));
	incentre.y = (distFromPts(tang2,tang3)*tang1.y+distFromPts(tang1,tang3)*tang2.y+distFromPts(tang1,tang2)*tang3.y)/
				(distFromPts(tang2,tang3)+distFromPts(tang1,tang3)+distFromPts(tang1,tang2));
	return incentre;
}

function calCentroid(tang1, tang2, tang3){
	var centroid = new PointLine("Centroid",0,0,0);
	centroid.x = (tang1.x+tang2.x+tang3.x)/3;
	centroid.y = (tang1.y+tang2.y+tang3.y)/3;
	return centroid;
}

function calOrthocentre(tang1, tang2, tang3){
	var orthocentre = new PointLine("Orthocentre",0,0,0);
	var a, b;
	a = (tang2.x-tang1.x)/(tang1.y-tang2.y);
	b = (tang3.x-tang1.x)/(tang1.y-tang3.y);
	orthocentre.x = (tang3.x*a-tang2.x*b-tang3.y+tang2.y)/(a-b);
	orthocentre.y = (orthocentre.x-tang3.x)*a+tang3.y;
	return orthocentre;
}


//Circle
function Circ(name, x, y, r) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.r = r;
}
 
Circ.prototype.getInfo = function() {
    return this.name+" ( "+parseInt(this.x)+", "+parseInt(this.y)+", "+parseInt(this.r)+" )";
};

Circ.prototype.getCenter = function() {
    var a = new PointLine(this.name,0,0,0);
    a.x = this.x;
    a.y = this.y;
    return a;
};

function drawCircle(circ, color="black"){
	var x =circ.x
	var y = circ.y
	var r = circ.r

	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.strokeStyle=color;
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(x, y, 1, 0, 2 * Math.PI);
	ctx.stroke();
}

function inputCircle(color="black") {
	if(document.getElementById('autoClear').value == "true"){clearDrawing();}
	insert();
	result = circ_A.getInfo()+' '+circ_B.getInfo()+' '+circ_C.getInfo();
    document.getElementById("answer_circle").innerHTML = result;

    if (drawed == false){
    	drawCircle(circ_A, color);
   		drawCircle(circ_B, color);
    	drawCircle(circ_C, color);
    	drawed = true;
    }
    //drawCircle(circ_D,"green");
    //drawCircle(circ_E,"green");
    //drawCircle(circ_F,"green");
    /*drawCircle(circ_G);
    drawCircle(circ_H);
    drawCircle(circ_I);
    drawCircle(circ_J);
    drawCircle(circ_K);
    drawCircle(circ_L);
    drawCircle(circ_M);
    drawCircle(circ_N);
    drawCircle(circ_O);
    drawCircle(circ_P);
    drawCircle(circ_Q);
    drawCircle(circ_R);
    drawCircle(circ_S);
    drawCircle(circ_T);
    drawCircle(circ_U);
    drawCircle(circ_V);
    drawCircle(circ_W);
    drawCircle(circ_X);*/
}

//pointLine
function PointLine(name, x, y, slope){
	this.name = name;
	this.x = x;
	this.y = y;
	this.slope = slope;
}

PointLine.prototype.y_intercept = function(){
		var result =0;
		return this.y - (this.x * this.slope);
};

PointLine.prototype.getInfo = function() {
    return this.name+" ( "+parseInt(this.x)+", "+parseInt(this.y)+", "+parseInt(this.slope)+", "+parseInt(this.y_intercept())+" )";
};

function drawPoint(tang, color="red"){
	var x = tang.x;
	var y = tang.y;

	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	ctx.strokeStyle=color;
	ctx.beginPath();
	ctx.arc(x, y, 1, 0, 2 * Math.PI);
	ctx.stroke();
}

function drawLine(tang, color="red"){
	var x = tang.x;
	var y = tang.y;
	var a = tang.slope;
	var b = tang.y_intercept();	

	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	var s_x =0, s_y=0, e_x=c.width, e_y=c.height;

	if(a != 0 && a !="undefined"){


		if( 0<=(-b/a) && (-b/a)<=c.width ){ //I
			s_x = -b/a;
			s_y = 0;

			if( 0 <= b && b <= c.height){ //II
				e_x = 0;
				e_y = b;
			}
			else if( 0 <= (c.height-b)/(a) && (c.height-b)/(a) <= c.width){ //III
				e_x = (c.height-b)/(a);
				e_y = c.height;
			}
			else{
				e_x = c.width; //IV
				e_y = a*c.width+b;
			}
		}
		else if( 0 <= b && b <= c.height ){ //II
			s_x = 0;
			s_y = b;

			if(0 <= (c.height-b)/(a) && (c.height-b)/(a) <= c.width){ //III
				e_x = (c.height-b)/(a);
				e_y = c.height;
			}else{
				e_x = c.width; //IV
				e_y = a*c.width+b;
			}
		}
		else{
			s_x = (y.height-b)/a; //III to IV
			s_y = c.height;
			e_x = c.width;
			e_y = a*c.width+b;
		}
	}
	else if(a == 0){ //horizontal line
		s_x = 0 , s_y = y, e_x = c.width, e_y=y;
	}else{
		s_x = x , s_y = 0, e_x = x, e_y=c.height;
	}
	
	ctx.strokeStyle=color;
	ctx.moveTo(s_x, s_y);
	ctx.lineTo(e_x, e_y);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(x, y, 1, 0, 2 * Math.PI);
	ctx.stroke();
}

//Tangent Points
function inputTangent() {
	inputCircle();
	tang_1 =calTangent(circ_A, circ_B, tang_1);
	tang_2 =calTangent(circ_A, circ_C, tang_2);
	tang_3 =calTangent(circ_B, circ_C, tang_3);

	result = tang_1.getInfo()+"\n"+tang_2.getInfo()+"\n"+tang_3.getInfo();
    document.getElementById("answer_tangent").innerHTML = result;

    drawPoint(tang_1);
    drawPoint(tang_2);
    drawPoint(tang_3);
}

//center
function inputIncentre(){
		inputTangent();
		var incentre = calIncentre(tang_1, tang_2, tang_3);
		result = "Incentre ( "+incentre.x+" , "+incentre.y+" )";
    	document.getElementById("answer_tangent").innerHTML = result;
		drawPoint(incentre,"blue");
}

function inputCentroid(){
		inputTangent();
		var centroid = calCentroid(tang_1, tang_2, tang_3);
		result = "Centroid ( "+centroid.x+" , "+centroid.y+" )";
    	document.getElementById("answer_tangent").innerHTML = result;
		drawPoint(centroid,"blue");
}

function inputOrthocentre(){
		inputTangent();
		var orthocentre = calOrthocentre(tang_1, tang_2, tang_3);
		result = "Orthocentre ( "+orthocentre.x+" , "+orthocentre.y+" )";
    	document.getElementById("answer_tangent").innerHTML = result;
		drawPoint(orthocentre,"blue");
}

//clear
function clearDrawing(){
	drawed = false;
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	document.getElementById("answer_circle").innerHTML = " "
	document.getElementById("answer_tangent").innerHTML = " "
	document.getElementById("answer_analysis").innerHTML = " "
}

//analysis
function Detection(range=0, seperation=0, sensor_error=0, error_distance=0) {
    this.range = range;
    this.seperation = seperation;
    this.sensor_error = sensor_error;
    this.error_distance = error_distance;
}

Detection.prototype.getInfo = function() {
    return parseInt(this.range)+"	"+parseInt(this.seperation)+"	"+parseInt(this.sensor_error)+"	"+parseInt(this.error_distance);
};

function analysis(){
	var result2 = " ";
	for(var j = 0; j<100; j++){
		errorDis = j+1;
		var analysisResultList = [];
		for(var i = 0; i < 100; i++){
			randomLocation();
			calLocation();

			var analysisResult = new Detection();
			analysisResult.range = circ_A.r*2;
			analysisResult.seperation = 2*distFromPts(circ_A.getCenter(),circ_B.getCenter());
			analysisResult.sensor_error = errorDis;
			analysisResult.error_distance = distFromPts(u,v);
			
			analysisResultList.push(analysisResult);
		}
		document.getElementById("answer_circle").innerHTML = " ";
		document.getElementById("answer_tangent").innerHTML = " ";
		var sum = 0;
		for (var i = 0; i < analysisResultList.length; i++) {
			sum += analysisResultList[i].error_distance;
		}
		result2 += /*"When sensor error <= "+errorDis+", average error distance is "+*/sum/analysisResultList.length+"<br />";	
	}
	document.getElementById("answer_analysis").innerHTML = result2;
}
//https://en.wikipedia.org/wiki/Incircle_and_excircles_of_a_triangle


