//
// Created by machine on 30.04.2022.
//
#ifndef LAB24_TREE_H
#define LAB24_TREE_H
#include "token.h"
#include "malloc.h"
#include "vector.h"

typedef struct Tree{
    Token data;
    struct Tree* left;
    struct Tree* right;
}Tree;

Tree* tree_create(vector* v, int idx_left, int idx_right);
void tree_print(Tree* t, size_t depth);
void tree_infix(Tree* t);

#endif //LAB24_TREE_H
