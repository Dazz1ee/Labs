#include "token.h"
#include <stdlib.h>
#include <ctype.h>
#include <stdio.h>

void token_next(Token* t){
    static bool mb_unary = true;
    char c;
    do {
        c = fgetc(stdin);
    } while (isspace(c));
    if (c == EOF) {
        t->type = FINAL;
    }
    else if(isalpha(c) || c == '_'){
        mb_unary = false;
        t->type=VARIABLE;
        t->data.variable_name=c;
    }
    else if(isdigit(c)){
        mb_unary=false;
        ungetc(c,stdin);
        float f;
        scanf("%f", &f);
        if(f == (int)f){
            t->type=INTEGER;
            t->data.value_int=(int)f;
        } else {
            t->type=FLOATING;
            t->data.value_float = f;
        }
    }
    else if(c== '(' || c ==')'){
        t->type=BRACKET;
        if(c=='('){
            mb_unary = true;
            t->data.is_left_bracket=1;
        } else {
            mb_unary = false;
            t->data.is_left_bracket = 0;
        }
    }

    else if(mb_unary && (c == '+' || c == '-')){
        int znak = (c == '+') ? 1 : -1;
        do {
            c = fgetc(stdin);
        } while (isspace(c));
        if(isdigit(c)) {
            ungetc(c, stdin);
            token_next(t);
            if (t->type == INTEGER) {
                t->data.value_int = t->data.value_int * znak;
            } else {
                t->data.value_float = t->data.value_float * znak;
            }
        } else {
            ungetc(c,stdin);
            t->type = OPERATOR;
            t->data.operator_name = '-';
            mb_unary = true;
        }
    }
    else {
        t->type = OPERATOR;
        t->data.operator_name = c;
        mb_unary = true;
    }
}

void token_print(Token* t, int depth){
    switch (t->type) {
        case FINAL:
            break;
        case INTEGER:
            printf("%*d", depth, t->data.value_int);
            break;
        case FLOATING:
            printf("%*f", depth, t->data.value_float);
            break;
        case VARIABLE:
            printf("%*c", depth, t->data.variable_name);
            break;
        case BRACKET:
            printf("%*c", depth, t->data.is_left_bracket == 1 ? '(' : ')');
            break;
        case OPERATOR:
            printf("%*c", depth, t->data.operator_name);
            break;
    }
}