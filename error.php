<?
if ($HTTP_SERVER_VARS['QUERY_STRING'] == 404)
   {
   echo 'Извините, запрашиваемая Вами страница "'.$HTTP_SERVER_VARS['REQUEST_URI'].'" не найдена.'; 
   require_once($_SERVER['DOCUMENT_ROOT'].'/error.html');
   }
elseif ($HTTP_SERVER_VARS['QUERY_STRING'] == 403)
   {
   echo 'Извините, запрашиваемая Вами страница "'.$HTTP_SERVER_VARS['REQUEST_URI'].'" не найдена.'; 
   require_once($_SERVER['DOCUMENT_ROOT'].'/error.html');
   }   
elseif ($HTTP_SERVER_VARS['QUERY_STRING'] == 500)
   {
   echo 'Извините, запрашиваемая Вами страница "'.$HTTP_SERVER_VARS['REQUEST_URI'].'" не найдена.'; 
   require_once($_SERVER['DOCUMENT_ROOT'].'/error.html');
   }  
?>