#! /bin/bash/env awk

BEGIN{
	print "Скрипт обрабатывает файл .cpp и выводит переменные, функции, библиотеки, которые были задействованы";
}
{
	if($0 ~ /#include/){
		print "---";
		print "lib " $0 ;
		next;
	}
	else if($0 ~ /int/ || $0 ~ /float/ || $0 ~ /double/ || $0 ~ /string/ || $0 ~ /char/ || $0 ~ /long long/ || $0 ~ /void/){
	        if(($0 ~ /;/) && ($0 ~ /vector/)){ 
			print "---";
			print $0;
                        next;
                }
		else if(($0 ~ /;/) && !($0 ~ /for/)){
			print "---";
			print "var " $0 ;
			next;
		}
		else if(!($0 ~ /for/)){
			print "---";
			print "func " $0 ;
			next;
		}
	}
}
END{
	print "---------------------------------------------------"
}
