//editer: Jack Mooltham
//FYP: Automatic Parking Space Allocation and
// Indoor Parking Lot Navigation System with Beacon

var i = 0;
var bufferPt = 0;

function fingerPrint(ID1,RSSI1,ID2,RSSI2,ID3,RSSI3){
	var temp1 = rssiProcess(ID1,RSSI1);
	var temp2 = rssiProcess(ID2,RSSI2);
	var temp3 = rssiProcess(ID3,RSSI3);

	if(i%output_point==0){
		if(filterList.length>=3){
			var userPt = mapMatch(
					filterList[0].BeaconID,
					filterList[0].RSSI,
					filterList[1].BeaconID,
					filterList[1].RSSI,
					filterList[2].BeaconID,
					filterList[2].RSSI
				);
			bufferPt = userPt;
		}
	}

	i++;
	if(i==output_point) i=0;

	return bufferPt;
}