//editer: Jack Mooltham
//FYP: Automatic Parking Space Allocation and
// Indoor Parking Lot Navigation System with Beacon

var filterList = [];

//Main functions
function rssiProcess(BeaconID, rssi){
  var distance = rssi;

  //allocate new beacon a derserved filter
  if(!isExitFilter(BeaconID)){addFilter(BeaconID);}

  //process the rssi by Kalman filter
  filterRSSI(BeaconID,rssi);

  var result = getRssi(BeaconID);

  var dis = calDistance(BeaconID);

  //renew old filter and kill inactive Beacon
  updateFilter(BeaconID);

  //Sort the filterList by life with decendind order
  sortFilterList();
  
  return result;
}

//Secondary functions
function isExitFilter(id){
  for (var i=0; i<filterList.length; i++){
    if(filterList[i].BeaconID==id){
      return true;
    }
  }
  return false;
}

function addFilter(id){
  filterList.push({'BeaconID':id,'counter':0, 'filter':new KalmanFilter({R: 0.01, Q: 20}), 'RSSI':0, 'Distance':0, 'life':life_Filter });
}



function filterRSSI(id,rssi){
  for(var i=0; i<filterList.length; i++){
    if(filterList[i].BeaconID==id){
      filterList[i].RSSI = filterList[i].filter.filter(rssi,0);
      break;
    }
  }
}

function getRssi(id){
  for(var i=0; i<filterList.length; i++){
    if(filterList[i].BeaconID==id){
      return filterList[i].RSSI;
    }
  }
  return -1;
}

function calDistance(id){
  for(var i=0; i<filterList.length; i++){
    if(filterList[i].BeaconID==id){
      return filterList[i].Distance = rssiToDis(id,filterList[i].RSSI);
    }
  }
  return -1;
}

function updateFilter(id){

  for (var i=0; i<filterList.length; i++){

    if(filterList[i].BeaconID==id){
      filterList[i].life+=2;
      filterList[i].counter+=1;
      if(filterList[i].counter==frame_size){
        filterList[i].counter=0;
        filterList[i].filter= new KalmanFilter({R: 0.01, Q: 20});
        } 
      } else{
        filterList[i].life-=1;
        if(filterList[i].life<0){
           filterList.splice(i,1);
        }
      }

    }

}

function sortFilterList() {
  for(var i = 1; i < filterList.length; ++i)
    {
        var currentItem = filterList[i];

        for(var j = i-1; j >= 0; --j)
        {
            if(filterList[j].life >= currentItem.life) break;
            filterList[j+1] = filterList[j];
        }

        filterList[j+1] = currentItem;
    }

};


//Tertiary functions
function rssiToDis(id,rssi){
  var a=(idKey[id].a0-rssi)/(10*envr_constant);

  return Math.pow(10,a)*idKey[id].d0;
}

function disToRSSI(id,dis){
  return -10*envr_constant*Math.log10(dis/idKey[id].d0)+idKey[id].a0;
}




