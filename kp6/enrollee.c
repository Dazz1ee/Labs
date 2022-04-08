#include <stdio.h>
#include <malloc.h>
#include "enrollee.h"

List create(){
    Iterator* first = (Iterator *) malloc(sizeof(Iterator));
    first->Next=first;
    first->Prev=first;
    List list;
    list.head = first;
    list.size = 0;
    return list;
}

Iterator* begin(const List* list){
    Iterator* iterator;
    iterator= list->head;
    return iterator;
}

Iterator* end(const List* list){
    Iterator* it = poisk(list, list->size);
    return it;
}

Iterator* poisk(const List* list, int n){
    if(list->size < n){
        perror("Out from bound, default iterator = end;");
        n = list->size;
    }
    Iterator* iterator = list->head;
    for(int i =0; i < n;i++){
        iterator = iterator->Next;
        //printf("THIS POISK %s\n", iterator->enrolle->name);
    }
    return iterator;
}
void load(List* list, enrollee* enrolle){
    Iterator* it = poisk(list, list->size);
    //if(list->size == 0) list->head->Next = it;
    Iterator* newIt = malloc(sizeof(Iterator));
    newIt ->Next = malloc(sizeof(Iterator));
    newIt->Prev = it;
    newIt->enrolle = enrolle;
    it->Next = newIt;
    //printf("%s\n", it->Next->enrolle->name);
    list->size = list->size+1;
}

void add(List* list, enrollee* enrolle, int n){
    Iterator* it = poisk(list, n);
    //if(list->size == 0) list->head->Next = it;
    Iterator* newIt = malloc(sizeof(Iterator));
    newIt->Prev = it;
    newIt->Next = it->Next;
    newIt->enrolle = enrolle;
    it->Next->Prev = newIt;
    it->Next = newIt;
    //printf("%s\n", it->Next->enrolle->name);
    list->size = list->size+1;
}

void delete(List* list,int n){
    if(n > list->size) perror("Error");
    Iterator* iterator = poisk(list, n);
    iterator->Next->Prev = iterator->Prev;
    iterator->Prev->Next = iterator->Next;
    list->size--;
    free(iterator);
}

void drop(List* list){
    Iterator*  it = end(list);
    while (it != list->head){
        Iterator* temp = it->Prev;
        free(it->enrolle);
        free(it);
        it = temp;
    }
    free(list->head);
    free(list);
}
