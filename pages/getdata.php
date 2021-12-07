<!DOCTYPE html>
<html>
    <head>
        <style type='text/css'>
	        html,body,select {font-size: 25px;}
        </style>
    </head>
    <body>
        <h1>This is my Web Page</h1>
        <em>It happens to be a PHP page</em>
        <?php
            $server = "sql210.epizy.com";
            $userid = "epiz_30532637";
            $pw = "xbQuzMslye0b";
            $db= "epiz_30532637_courses";

            $conn = new mysqli($server, $userid, $pw );

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
            echo "Connected successfully";

            //select the database
            $conn->select_db($db);
            echo "Selected the database";
                
            //run a query
            $sql = "SELECT * FROM Courses";
            $result = $conn->query($sql);
            echo "Ran the query";

            if ($result->num_rows > 0) {
                while($row = $result->fetch_array()) {
                    echo "$row[0], $row[1], $row[2] <br>";
                }
              } else {
                echo "no results";
              }
            $conn->close();
  

        ?>
    </body>
</html>