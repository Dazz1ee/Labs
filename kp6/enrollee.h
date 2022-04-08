//
// Created by machine on 26.03.2022.
//
#ifndef UNTITLED3_ENROLLEE_H
#define UNTITLED3_ENROLLEE_H
#include <stdbool.h>
typedef struct {
    char name[50];
    char initials[50];
    char gender[50];
    int matan;
    int diskra;
    int inf;
    bool medal;
    bool exam;
    int numSchool;

}enrollee;

typedef struct _Iterator{
    enrollee* enrolle;
    struct _Iterator* Prev;
    struct _Iterator* Next;
}Iterator;

typedef struct {
    Iterator* head;
    int size;
}List;


List create();

Iterator* begin(const List* list);
Iterator* end(const List* list);
Iterator* poisk(const List* list, int n);
void load(List* list, enrollee* enrolle);
void add(List* list, enrollee* enrolle, int n);
void delete(List* list, int n);
void  drop(List* list);



#endif //UNTITLED3_ENROLLEE_H
