/*
 * Morse Code receiver app information:
 *
 * Function: messageFinished(): stops the capturing process
 *
 *     You can call this function to let the app know that the 
 *     end-of-transmission signal has been received.
 *
 * -------------------------------------------------------
 *
 * ID: messageField: id of the message text area
 *
 *     This will be a textarea element where you can display
 *     the recieved message for the user.
 * 
 * -------------------------------------------------------
 *
 * ID: restartButton: id of the Restart button
 *
 *     This is a button element.  When clicked this should 
 *     cause your app to reset its state and begin recieving
 *     a new message.
 *
 */


// ADD YOUR ADDITIONAL FUNCTIONS AND GLOBAL VARIABLES HERE


/*
 * This function is called once per unit of time with camera image data.
 * 
 * Input : Image Data. An array of integers representing a sequence of pixels.
 *         Each pixel is representing by four consecutive integer values for 
 *         the 'red', 'green', 'blue' and 'alpha' values.  See the assignment
 *         instructions for more details.
 * Output: You should return a boolean denoting whether or not the image is 
 *         an 'on' (red) signal.
 */

var on = 0; 
var off = 0;
var morse = '';
var message = '';
var MorseCodeData = 
 // Question 2 - Lookup table set as an object variable that is used to match the accumulated dots and dashes stored in the variable "morse" to // the appropriate character.   
{
   "._": "a",
   "_...": "b",
   "_._.": "c",
   "_..": "d",
   ".": "e",
   ".._.": "f",
   "__.": "g",
   "....": "h",
   "..": "i",
   ".___": "j",
   "_._": "k",
   "._..": "l",
   "__": "m",
   "_.": "n",
   "___": "o",
   ".__.": "p",
   "__._": "q",
   "._.": "r",
   "...": "s",
   "_": "t",  
   ".._": "u",  
   "..._": "v",
   ".__": "w",  
   "_.._": "x",  
   "_.__": "y",  
   "__..": "z",
     
   "_____": "0",
   ".____": "1",
   "..___": "2",
   "...__": "3",
   "...._": "4",
   ".....": "5",
   "_....": "6",
   "__...": "7",
   "___..": "8",
   "____.": "9",
     
   "_.__.": "(", //open bracket
   "_.__._": ")", //close bracket
   "._.._.": '"', //inverted commas
   "..._.._": "$", //dollar sign
    ".____.": "'", //Apostrophe
   "_.._.": "/", //forward slash
   "._._.": "+", //addition sign
   "___...": ":", //colon  
   "._._._": ".", //period 
   "__..__": ",", //comma
   "..__..": "?", //question mark
   "_...._": "-", //minus sign
   ".__._.": "@", //At symbol 
   "_..._": "=", //equals sign
   "..__._": "_", //underscore
   "_._.__": "!", //exclamation mark
   "._._": "\n", //"\n" is a syntax that can be used instead of a string to move the cursor to the next line
   "..._._": " [end of transmission]",
 
};

//Question 1 - Decodes the image from the camera and converts it to a boolean statement 
function decodeCameraImage(data)
{
    var i = 0; // Initialise the variable i = 0
    var j = 2; // Initialise the variable j = 2
    var red = 0, blue = 0; // Initialising the variables red and blue, which represents the colour of the pixels >> Using these variables to find 
                           // which which pixels are mostly red or mostly blue.
    var boolean; // Initialising the variable boolean
	
            // Calling the loop while the value of j is less than the length of the array 'data'
            while (j < data.length)
                {
                    // Checking to see if the element in the array data[i] is greater than data[j]
                     if ( data[i] > data[j])
                {
                    red = red + 1; // Incrementing the variable red by 1
                    
                }   // Checking to see if the element in the array data[i] is greater than data[j]
                    else if (data[i] < data [j])
                {
                    blue = blue + 1; // Incrementing the variable blue by 1
                    
                }
                    i = i + 4 // Incrementing the variable i by 4.
                    j = i + 2 // Incrementing the variable j by i + 2.
                }
           
 
    if ( red >= blue) // Comparing the values of blue and red to see which is greater.
        {
            boolean =  true; // True if red is greater than blue >> Mostly Red
        }
    
    else 
        {
            boolean =  false;// False if blue is greater than blue >> Mostly Blue
        }
	
	Count(boolean); // Calling the function Count with the input boolean found above
    return boolean; // Returning the value of boolean to change colours of the dot in the interface.
}

// Question 3 and 4 - The function Count determines whether the singal is on or off, keeps track of dots and dashes and converts these dots and // dashes to characters when appropriate by reffering to the look up table  
function Count(status) 
{
    if (status === true)
  {   
    // When the signal is turned on via a red light, the function will determine how long the function was off immediately before, and do        // something depending on how long this time interval was.
    if (off>=3 && off<=6)
        {
            // Converts accumulated dots and dashes into a character, adds it to the message output and resets the variable "morse"
            message += MorseCodeData[morse]
            
            morse = ""
        }
    else if (off >=7)
        {
            // The exact same as the previous if statement except a " " is also added to the message output
        message += MorseCodeData[morse] 
		message+= " "
        morse = ""
        }
      on++ //increments the on count
	  off = 0 // resets the off count
  }
else if (status === false)
    {
    // When the signal is turned off via a blue light, the function will determine how long the function was on immediately before, and do       // something depending on how long this time interval was.
       if (on == 1 || on == 2)
        {
            //add a dot to the morse
            morse += '.'
        }
    
    else if (on >= 3)
        {
            // Adds a dash to the morse
            morse += '_'
        } 
        on = 0;// resets the on count
        off++;// increments the off count
	
    }
    // Question 6 - Calling the messageFinished function once end of transmission is called.
    if (morse === "..._._")
	{
		
		messageFinished();
				
	}
    document.getElementById('messageField').innerHTML = message;
}

//Question 5 - Function simply resets all relevant variables when the reset button is clicked by the user
document.getElementById("restartButton").onclick = restartButtonClicked;
function restartButtonClicked() 
{
	messageOutput = "";
	messageOutput.innerHTML = "";
	message = "";
	morse = "";
	on = 0;
	off = 0;
	
}