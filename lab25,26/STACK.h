//
// Created by machine on 08.04.2022.
//

#ifndef UNTITLED4_STACK_H
#define UNTITLED4_STACK_H

#include <stdbool.h>

typedef struct {
    int ptr;
    int maxSize;
    int* elements;
}stack;

stack* create();
bool is_empty(stack* s);
void push(stack* s, int value);
void pop(stack* s);
int top(stack* s);
void sort(stack* s);
void clear(stack* s);
int max_top_delete(stack* s);
void print(stack* s);
int size(stack* s);



#endif //UNTITLED4_STACK_H
