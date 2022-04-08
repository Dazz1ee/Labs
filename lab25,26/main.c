#include "STACK.h"
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

int main() {
    char zapros[100];
    stack* s = create();

    printf("pop, top, clear, isEmpty, push, max_top_delete, size, print, sort\n");
    while(scanf("%s", zapros) != EOF){
        if(strcmp(zapros, "pop") == 0){
            pop(s);
        }
        if(strcmp(zapros, "top") == 0){

            printf("%d\n", top(s));
        }
        if(strcmp(zapros, "clear") == 0){
            clear(s);
        }
        if(strcmp(zapros, "isEmpty") == 0){
             if(is_empty(s)){
                 printf("true\n");
             } else {
                 printf("false\n");
             }
        }
        if(strcmp(zapros, "push") == 0){
            int value;
            printf("Value = ");
            scanf("%d", &value);
            push(s, value);
        }
        if(strcmp(zapros, "max_top_delete") == 0){
            printf("%d\n", max_top_delete(s));
        }
        if(strcmp(zapros, "size") == 0){
            printf("%d\n", size(s));
        }
        if(strcmp(zapros, "print") == 0){
            print(s);
        }
        if(strcmp(zapros, "sort") == 0){
            sort(s);
        }
        printf("pop, top, clear, isEmpty, push, max_top_delete, size, print, sort\n");
    }
}
