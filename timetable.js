var firebaseConfig = {
  apiKey: "AIzaSyAV9rKCDgWT_yRw2aTCaggmap843VcqFKM",
  authDomain: "mizo-fea88.firebaseapp.com",
  databaseURL: "https://mizo-fea88.firebaseio.com",
  projectId: "mizo-fea88",
  storageBucket: "mizo-fea88.appspot.com",
  messagingSenderId: "582573908065",
  appId: "1:582573908065:web:ac4f96ed78ee231d5cca20",
  measurementId: "G-5G1P131KVM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
// console.log(moment([1994, 9, 4]).fromNow());
// $("#add-train-btn").attr('class', 'btn btn-primary');
// //<button id="add-train-btn" class="btn btn-primary "></button>

$("#add-train-btn").on('click', function (event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  console.log(trainName + " " + destination + " " + firstTrain + " " + frequency + " ");

  database.ref().push({
    TrainName : trainName,
    Destination : destination,
    FirstTrain : firstTrain,
    Frequency : frequency

  });
  // return false;
});

database.ref().on("child_added", function(childSnapshot){
  var childTrainName = childSnapshot.val().TrainName;
  var childDestination = childSnapshot.val().Destination;
  console.log(childSnapshot.val())
  var childFirstTrain = childSnapshot.val().FirstTrain;
  var childFrequency = childSnapshot.val().Frequency;

  console.log(childFirstTrain);

    // //create a moment object
    var minAway;
    //change the year so the first train comes before now
    var firstNewTrain = moment(childFirstTrain, "hh:mm").subtract(1, "years");
    //difference between the current and first train
    var diffTime = moment().diff(moment(firstNewTrain), "minutes");
    var remainder = diffTime % childFrequency;
    //minutes until next train
    minAway = childFrequency - remainder;
    //next train time 
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");

    var newRow = `<tr>
                    <td>${childTrainName}</td>
                    <td>${childDestination}</td>
                    <td>${childFrequency}</td>
                    <td>${nextTrain}</td>
                    <td>${minAway} mins</td>
    </tr>`
    //append content to the display table
    $("tbody").append(newRow);
});
