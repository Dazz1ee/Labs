#include "STACK.h"
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>
#include <malloc.h>

stack* create (){
    stack* s = (stack*) malloc(sizeof (stack));
    s->maxSize = 100;
    s->elements = (int*) malloc(sizeof(int)*100);
    s->ptr = 0;
    return s;
}

void push(stack* s, int value){
    if(s->maxSize == s->ptr){
        realloc(s->elements,sizeof(int) *s->maxSize * 2);
        s->maxSize *= 2;
    }
    s->elements[s->ptr++] = value;
}

void pop(stack* s){
    if(s->ptr == 0){
        perror("STACK IS EMPTY");
        exit(1);
    }
    if(s->ptr == 0) return;
    s->ptr--;
}

int top(stack* s){
    if(s->ptr == 0){
        perror("STACK IS EMPTY");
        exit(1);
    }
    return s->elements[s->ptr-1];
}

int size(stack* s){
    return s->ptr;
}

bool is_empty(stack* s){
    if(s->ptr == 0) return true;
    return false;
}

void print(stack* s){
    for(int i =0; i < s->ptr; i++){
        printf("%d ", s->elements[i]);
    }
    printf("\n");
}

void clear(stack *s)
{
    free(s->elements);
    s->ptr = 0;
}

int max_top_delete(stack* s){
    if(s->ptr == 0){
        perror("STACK IS EMPTY");
        exit(1);
    }
    if(s->ptr == 0) {
        perror("STACK IS EMPTY");
        exit(1);
    }
    int maxEl = -1e9;
    int index = 0;
    for (int i = 0; i < s->ptr; ++i) {
        if(s->elements[i] > maxEl){
            maxEl = s->elements[i];
            index = i;
        }
    }
    for(; index < s->ptr; index++){
        if(index == s->ptr - 1){
            s->ptr--;
            return maxEl;
        }
        s->elements[index] = s->elements[index+1];
    }
}

void sort(stack* s){
    if(s->ptr == 0){
        perror("STACK IS EMPTY");
        exit(1);
    }
    for(int i =0; i < s->ptr; i++){
        int tmp = s->elements[i];
        int minEl = i;
        for (int j = i+1; j < s->ptr; ++j) {
            if(s->elements[minEl] > s->elements[j]){
                minEl = j;
            }
        }
        s->elements[i] = s->elements[minEl];
        s->elements[minEl] = tmp;
    }
}
