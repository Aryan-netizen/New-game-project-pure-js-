export function moveTowards(person,Destinationposition,speed){
    let distanceToTravelX=Destinationposition.x-person.position.x
    let distanceToTravelY=Destinationposition.y-person.position.y
    let distance = Math.sqrt(distanceToTravelX**2+distanceToTravelY**2);

    if(distance<=speed){
        person.position.x=Destinationposition.x
        person.position.y=Destinationposition.y
    }else{
        let normalizedX=distanceToTravelX/distance
        let normalizedY=distanceToTravelY/distance

        person.position.x += speed*normalizedX
        person.position.y += speed*normalizedY

       distanceToTravelX=Destinationposition.x-person.position.x
       distanceToTravelY=Destinationposition.y-person.position.y

       distance = Math.sqrt(distanceToTravelX**2+distanceToTravelY**2);

    }
    return distance;
}