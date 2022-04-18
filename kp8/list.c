#include "list.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

void create(list* l, node* bar){
    l->head = bar;
}

void next(iterator* it){
    it->item = it->item->next;
}

void prev(iterator* it){
    it->item = it->item->prev;
}

iterator* getIt(list* l){
    iterator* it = malloc(sizeof(iterator));
    it->item = l->head;
    return it;

}

void add(list* l, char* el){
    node* n = malloc(sizeof(node));
    iterator* it = getIt(l);
//    printf("do %s\n", it->item->value);
    n->value = el;
//    printf("posle %s\n", it->item->value);
    if(strcmp(it->item->value, "NULL") == 0){
//        printf("fex %s\n", el);
        n->prev = l->head;
        n->next=l->head;
        it->item->prev=n;
        l->head = n;
    } else {
        while (1){
            if(strcmp(it->item->next->value, "NULL") == 0) break;
            next(it);
        }
//        printf("kak %s\n", it->item->value);
        n->next = it->item->next;
        n->prev = it->item;
        it->item->next=n;
    }
    free(it);
}

void delete(list* l, int ind){
    iterator* it = getIt(l);
    if(strcmp(it->item->value, "NULL") == 0){
        perror("WRONG INDEX");
        return;
    }
    if(ind == 1){
        it->item->next->prev = it->item->prev;
        l->head = it->item->next;
    }
    for (int i = 0; i < ind-1; ++i) {
        if(strcmp(it->item->value, "NULL") == 0){
            perror("WRONG INDEX");
            return;
        }
        next(it);
    }
    if(strcmp(it->item->value, "NULL") == 0){
        perror("WRONG INDEX");
        return;
    }
    it->item->prev->next = it->item->next;
    it->item->next->prev = it->item->prev;
    free(it->item);
    free(it);
}

void insert(list* l, char* el, int ind){
    iterator* it = getIt(l);
    if(ind == 1){
        node* n = malloc(sizeof(node));
        if(strcmp(it->item->value, "NULL") == 0){
//            printf("fex %s\n", el);
            n->prev = l->head;
            n->next=l->head;
            n->value = el;
            it->item->prev=n;
            l->head = n;
            return;
        }
        n->prev = it->item->prev;
        n->next=it->item;
        it->item->prev = n;
        n->value = el;
        l->head = n;
        return;
    }
    for (int i = 0; i < ind - 1; ++i) {
        if(strcmp(it->item->value, "NULL") == 0){
            perror("WRONG INDEX");
            return;
        }
        next(it);
    }
//    printf("%s", it->item);
    node* n = malloc(sizeof(node));
    n->next = it->item;
    n->prev = it->item->prev;
    n->value = el;
    it->item->prev->next = n;
    it->item->prev = n;
    free(it);
}

void print(list* l){
    iterator* it = getIt(l);
    int i = 1;
    while (1) {
        if(strcmp(it->item->value,"NULL") == 0) return;
        printf("node%d : %s\n", i++,it->item->value);
        next(it);
    }
}

void size(list* l){
    iterator* it = getIt(l);
    int size = 0;
    while(strcmp(it->item->value, "NULL") != 0){
        size++;
        next(it);
    }
    printf(" SIZE = %d\n", size);
}

void order(list* l){
    iterator* it = getIt(l);
    if(strcmp(it->item->value, "NULL") == 0){
        perror("LIST EMPTY\n");
        return;
    }

    int size = strlen(it->item->value);
    char* prev = it->item->value;
    next(it);
    while(strcmp(it->item->value, "NULL") != 0){
        if(strcmp(prev,it->item->value) > 0){
            printf("NOT ORDER\n");
            return;
        }
        prev = it->item->value;
        next(it);
    }
    printf("ORDER\n");
}



