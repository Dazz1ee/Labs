//
// Created by machine on 30.04.2022.
//
#include "tree.h"
#include <stdlib.h>
#include <stdio.h>

int get_priority(char c){
    switch (c) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        case '^':
            return 3;
    }
    return 100;
}

Tree* tree_create(vector* v, int idx_left, int idx_right){
    Tree* t = malloc(sizeof(Tree));
    if(idx_left > idx_right){
        return NULL;
    }
    if(idx_right == idx_left){
        t->data = take(v, idx_left);
        t->left = NULL;
        t->right = NULL;
        return t;
    }
    int priority_min = get_priority('a');
    int brackets = 0;
    int priority;
    int op_pos;
    for (int i = idx_left; i < idx_right; ++i) {
        if (take(v, i).type == BRACKET && take(v, i).data.is_left_bracket) {
            ++brackets;
        } else if (take(v, i).type == BRACKET && take(v, i).data.is_left_bracket == 0) {
            --brackets;
        } else if(brackets > 0){
            continue;
        } else if(take(v,i).type == OPERATOR){
            priority = get_priority(take(v,i).data.operator_name);
            if(priority <= priority_min){
                priority_min = priority;
                op_pos = i;
            }
        }
    }
    if(priority_min == 100 && take(v,idx_left).type == BRACKET &&
            take(v,idx_left).data.is_left_bracket && take(v,idx_right).type == BRACKET &&
            !(take(v,idx_right).data.is_left_bracket)){
        free(t);
        return tree_create(v,idx_left + 1, idx_right-1);
    }

    if(take(v,op_pos).data.operator_name == '^'){
        brackets=0;
        for (int i = op_pos; i >= idx_left ; --i) {
            if(take(v,i).type == BRACKET && take(v,i).data.is_left_bracket==0){
                ++brackets;
            }
            if (take(v,i).type == BRACKET && take(v,i).data.is_left_bracket) {
                --brackets;
            }
            if(brackets > 0) continue;
            if(take(v,i).type == OPERATOR){
                priority = get_priority(take(v,i).data.operator_name);
                if(priority == 3){
                    op_pos = i;
                }
            }
        }
    }
    t->data = take(v,op_pos);
    t->left = tree_create(v, idx_left, op_pos-1);
    t->right = tree_create(v,op_pos+1, idx_right);
    if(t->right == NULL){
        printf("error");
        exit(1);
    }
    return t;
}

void tree_delete(Tree *t){
    if(t != NULL){
        tree_delete(t->left);
        tree_delete(t->right);
    }
    free(t);
}

void tree_infix(Tree* t){
    if(t != NULL){
        if(t->left && t->right) printf("(");
        tree_infix(t->left);
        token_print(&t->data,1);
        tree_infix(t->right);
        if(t->right && t->left){
            printf(")");
        }
    }
}

void tree_print(Tree* t, size_t depth){
    if(t != NULL){
        tree_print(t->left, depth + 10);
        token_print(&(t->data),depth);
        printf("\n");
        tree_print(t->right, depth + 10);
    }
}