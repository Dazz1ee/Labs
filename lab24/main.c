#include "vector.h"
#include "tree.h"
#include "token.h"
#include "transform.h"
#include "vector.c"
#include "tree.c"
#include "transform.c"
int main() {
    vector* tokens = malloc(sizeof(vector));
    create(tokens);
    size_t tokens_qty = 0;

    Token token;
    token_next(&token);

    while (token.type != FINAL){
        push(tokens, token);
        token_next(&token);
        tokens_qty++;
    }
    Tree* tree = tree_create(tokens,0,(int)tokens_qty-1);
    printf("\nExpression tree:\n");
    tree_print(tree,0);
    tree_transform(tree);
    printf("\nSemitransformed expression tree:\n");
    tree_print(tree,0);
    return 0;
}
