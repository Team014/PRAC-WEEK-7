// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

function viewLocation(locationName)
{
   for (var i=0, i < locations.length, ++i)
    {
        var locationsList = []
        var storedLocation = localStorage.getItem(locations[i])
        
        // Need to convert local storage version from a string to an object
        locationsList.push(storedLocation)
        
        //After this need to set up the HTML to make this array display all locations and their data on the main page
    }
      
   // Intial Data
   //Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName); 
    //And load the view location page.
    location.href = 'viewlocation.html';
}
