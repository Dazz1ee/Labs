#include <stdio.h>
#include <string.h>
#include "list.h"
#include "list.c"

int main(int argc, char* argv[]) {
    char* flag= malloc(255);
    printf("VALUE BARRIER = NULL\n\n");
    printf("ADD ELEMENT(a) | ADD ELEMENT TO THE END(e) | DELETE(d) | PRINT(p) | SIZE(s) | ORDER(o)\n\n");
    list* l = malloc(sizeof(list));
    node* barrier = malloc(sizeof(node));
    barrier->value = "NULL";
    create(l,barrier);
    while(scanf("%s", flag) != EOF){
        if(strcmp(flag,"a") == 0){
            printf("ENTER ELEMENT AND INDEX\n");
            char* el = malloc(255);
            int index;
            scanf("%s %d", el, &index);
            insert(l,el,index);
        } else if(strcmp(flag,"e") == 0){
            printf("ENTER ELEMENT\n");
            char* tmp = malloc(255);
            scanf("%s", tmp);
            //printf("%s", tmp);
            add(l,tmp);
        } else if(strcmp(flag,"d") == 0){
            printf("ENTER INDEX\n");
            int index;
            scanf("%d", &index);
            delete(l,index);
        } else if(strcmp(flag,"p") == 0){
            print(l);
        } else if(strcmp(flag,"s") == 0){
            size(l);
        } else if(strcmp(flag,"o") == 0){
            order(l);
        } else {
            printf("WRONG PARAMETR\n");
        }
        printf("ADD ELEMENT(a) | ADD ELEMENT TO THE END(e) | DELETE(d) | PRINT(p) | SIZE(s) | ORDER(o)\n\n");
    }
    return 0;
}
