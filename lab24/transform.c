#include "token.h"
#include "token.c"
#include "transform.h"

int match_frac(Tree *t)
{
    return (t->data.data.operator_name == '/' && t->left->data.data.operator_name == '*' &&
    t->left->left->data.data.operator_name == '/');
}

void transform_frac(Tree* t)
{
    Tree* tmpright = malloc(sizeof(Tree));
    Tree* tmpleft = malloc(sizeof(Tree));
    tmpright->data = t->left->data;
    tmpright->left = t->left->left->right;
    tmpright->right = t->right;
    tmpleft->data = t->left->data;
    tmpleft -> right = t->left->right;
    tmpleft ->left = t->left->left->left;
    t->left = tmpleft;
    t->right = tmpright;
}

void tree_transform(Tree *t){
    if (t != NULL) {
        tree_transform(t->left);
        tree_transform(t->right);

        if (match_frac(t)) {
            transform_frac(t);
        }
    }
}