//
// Created by machine on 01.05.2022.
//

#include "vector.h"

void create(vector* v){
    v->ptr=0;
    v->size = 200;
    v->t = malloc(sizeof(Token)* v->size);
}

void push(vector* v, Token t){
    if(v->size == v->ptr) {
        v->size *= 2;
        v->t = realloc(v,sizeof(Token)* v->size);
    }
    v->t[v->ptr++] = t;
}

void pop(vector* v ){
    v->ptr--;
}

Token take(vector* v, int idx){
//    if(idx >= v->ptr){
//        exit(1);
//    }
    return v->t[idx];
}