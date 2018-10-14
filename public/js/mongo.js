const uri = "mongodb+srv://star1954:andyew1954@cluster0-8ep93.mongodb.net/test?retryWrites=true"
var mongoClient = require('mongodb').MongoClient;
MongoClient.connect(uri, function(err, client) {
   const loginData = client.db("userData").collection("loginData");
   // perform actions on the collection object
   client.close();
});

//input id
var loginid = "";

function findDocument(value,id) {
  // Get the documents collection
  // Find some documents
  loginData.find({value: id}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    return docs;
  });
}

function updateDocument(value,id){
  collection.updateOne({ $set: { value : id } }, function(err, result) {
    console.log("Updated the document with the value(s)");
    return(result);
  });
}
function createDocument(id,data,data){
  
}