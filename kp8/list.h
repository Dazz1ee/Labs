
#ifndef KP8_LIST_H
#define KP8_LIST_H

typedef struct _node{
    char* value;
    struct _node* prev;
    struct _node* next;
}node;

typedef struct {
    node* head;
}list;

typedef struct {
    node* item;
}iterator;



void create(list* l, node* bar);
void add(list* l, char* el);
void insert(list* l, char* el,int ind);
void delete(list* l, int ind);
void next(iterator* it);
iterator* getIt(list* it);
void prev(iterator* it);
void size(list* l);
void print(list* l);
void order(list* l);


#endif //KP8_LIST_H
