//editer: Jack Mooltham
//FYP: Automatic Parking Space Allocation and
// Indoor Parking Lot Navigation System with Beacon

function mapMatch(id1,rssi1,id2,rssi2,id3,rssi3){
	var result = new Point('hi',0,0);

	var min = 1000;

	var cal_id = [id1,id2,id3];
	var cal_rssi = [rssi1,rssi2,rssi3];

	for(var i=0; i<referencePoint.length; i++){
		var reference_rssi = getReferenceRSSI(cal_id,referencePoint[i]);

		var temp = euclideanDistance(cal_rssi,reference_rssi);

		if(temp < min){
			min = temp;
			result = new Point('access',referencePoint[i].x,referencePoint[i].y);
		}
	}
	return result;
}



function getReferenceRSSI(idArr,refArr){
	var result = [];
	for(var i=0; i<idArr.length; i++){
		for(var j=1; j<=objectLength(refArr)-2; j++){
			if(idArr[i]==j) result.push(refArr[j]);
		}
	}
	return result;
}





