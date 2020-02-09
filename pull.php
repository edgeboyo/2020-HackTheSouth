<?php 
  if(!isset($_GET["query"])){
	echo "Input query!";
  }
  $q = $_GET["query"];
  $msi = new mysqli("localhost", "sqladmin", "sqlmod", "world_map");
  $result = $msi->query($q);
  while($row = $result->fetch_row()){
	  for($i = 0; $i < sizeof($row); $i++){
		echo $row[$i] . ",";
	  }
	  echo ".";
  }
?>
