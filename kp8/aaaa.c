//#include "list.h"
//#include <stdlib.h>
//#include <stdio.h>
//#include <string.h>
//
//void create(list* l, node* bar){
//    l->head = bar;
//}
//
//void next(iterator it){
//    it.item = it.item->next;
//}
//
//void prev(iterator* it){
//    it->item = it->item->prev;
//}
//
//iterator get(list* l){
//    iterator it= {l->head};
//    return it;
//}
//
//void add(list* l, char* el){
//    node* n = malloc(sizeof(node));
//    n->value = el;
//    iterator it = get(l);
//    printf("ex %s\n", it.item->value);
//    if(strcmp(it.item->value, "NULL") == 0){
//        printf("fex %s\n", el);
//        n->prev = l->head;
//        n->next=l->head;
//        l->head = n;
//    } else {
//        while (1){
//            if(strcmp(it.item->next->value, "NULL") == 0) break;
//            next(it);
//        }
//        printf("ex %s\n", it->item->value);
//        n->next = it->item->next;
//        n->prev = it->item;
//        it->item->next=n;
//    }
//    free(it);
//}
//
//void delete(list* l, int ind){
//    iterator* it = get(l);
//    for (int i = 0; i < ind-1; ++i) {
//        if(strcmp(it->item->value, "NULL") == 0){
//            perror("WRONG INDEX");
//            return;
//        }
//        next(it);
//    }
//    it->item->prev->next = it->item->next;
//    it->item->next->prev = it->item->prev;
//    free(it->item);
//    free(it);
//}
//
//void insert(list* l, char* el, int ind){
//    iterator* it = get(l);
//    for (int i = 0; i < ind - 1; ++i) {
//        if(strcmp(it->item->value, "NULL") == 0){
//            perror("WRONG INDEX");
//            return;
//        }
//        next(it);
//    }
//    node* n = malloc(sizeof(node));
//    n->next = it->item->next;
//    n->prev = it->item;
//    n->value = el;
//    it->item->next = n;
//    free(it);
//}
//
//void print(list* l){
//    iterator* it = get(l);
//    int i = 1;
//    while (1) {
//        if(strcmp(it->item->value,"NULL") == 0) return;
//        printf("node%d : %s\n", i++,it->item->value);
//        next(it);
//    }
//}
//
//int size(list* l){
//    iterator* it = get(l);
//    int size = 0;
//    while(strcmp(it->item->value, "NULL") != 0){
//        size++;
//        next(it);
//    }
//    return size;
//}
//
//void order(list* l){
//    iterator* it = get(l);
//    if(strcmp(it->item->value, "NULL") == 0){
//        perror("LIST EMPTY");
//        return;
//    }
//
//    int size = strlen(it->item->value);
//    char* prev = it->item->value;
//    next(it);
//    while(strcmp(it->item->value, "NULL") != 0){
//        if(strcmp(prev,it->item->value) > 0){
//            printf("NOT ORDER");
//            return;
//        }
//    }
//    printf("ORDER");
//    return;
//}
//
//
//
