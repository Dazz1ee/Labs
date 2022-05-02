//
// Created by machine on 30.04.2022.
//

#ifndef LAB24_TOKEN_H
#define LAB24_TOKEN_H
#include "stdbool.h"

typedef enum {
    FINAL,
    INTEGER,
    FLOATING,
    OPERATOR,
    VARIABLE,
    BRACKET
}TokenType;

typedef struct {
    TokenType type;
    union {
        int   value_int;
        float value_float;
        char  operator_name;
        bool  is_left_bracket;
        char  variable_name;
    } data;
} Token;

void token_print(Token *t, int depth);
void token_next(Token *t);

#endif //LAB24_TOKEN_H
