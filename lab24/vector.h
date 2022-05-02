//
// Created by machine on 01.05.2022.
//

#ifndef LAB24_VECTOR_H
#define LAB24_VECTOR_H
#include "token.h"
#include <malloc.h>
#include <stdlib.h>

typedef struct {
    int size;
    int ptr;
    Token* t;
}vector;


void create(vector* v);
void push(vector* v, Token t);
void pop(vector *v);
Token take(vector*v, int idx);

#endif //LAB24_VECTOR_H
