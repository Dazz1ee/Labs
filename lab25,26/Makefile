all: main

main: main.o stack.o
	gcc main.o stack.o -o main

stack.o: stack.c STACK.h
	gcc -c stack.c
main.o: main.c 
	gcc -c main.c
clean:
	rm -f *.o main
