<?php
     $db_server="localhost";
     $db_user="root";
     $db_pass="";
     $db_name="project_1";
     $db_conn="";
 
     try{
         $conn=mysqli_connect($db_server,
                              $db_user,
                              $db_pass,
                              $db_name);
                             
     }
     catch(mysqli_sql_exception $e){
         die("Database connection failed: " . $e->getMessage());
     }
?>