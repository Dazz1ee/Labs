#include "matrix.h"
#include <stdio.h>
#include <malloc.h>
#include <stdlib.h>

void create(vector* v, int size){
    v->size = size;
    v->data = malloc(sizeof(float)*size);
    v->ptr = 0;
}

void push(vector* v, float f){
    if(v->size == v->ptr){
        v->data = realloc(v->data, sizeof(float)* v->size * 2);
        v->size *= 2;
    }
    v->data[v->ptr++] = f;
    if(v->size == v->ptr){
        v->data = realloc(v->data, sizeof(float)* v->size * 2);
        v->size *= 2;
    }
}

int size(vector* v){
    return  v->size;
}

void delete(vector* v, int n){
    for(int i = n; i< v->ptr-1; i++){
        v->data[n] = v->data[n+1];
    }
}

void clear(vector* v){
    free(v->data);
    free(v);
}

float pop(vector* v, int n){
    return v->data[n];
}
int ipop(vector* v, int n){
    return v->data[n];
}

void modifMatrix(vector* v, vector* v1, vector* v2, vector* v3, int n, int m){
    push(v1, 0);
    for(int i = 0; i < n; i++){
        for (int j = 0; j < m; ++j) {
            if(v->data[i*m + j] != 0){
                push(v3, (float) pop(v,i*m+j));
                push(v2, (float) j);
            }
        }
        push(v1,(float)v3->ptr);
    }
}

void printMatrix(vector* v, int n , int m, vector* v1, vector* v2, vector* v3){
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < m; ++j) {
            printf("%f ", pop(v, m *i + j));
        }
        printf("\n");
    }
    printf("-----------");
    printf("\n");
    printf("v1 : ");
    for (int i = 0; i < v1->ptr; ++i) {
        printf("%d ", ipop(v1,i));
    }
    printf("\n");
    printf("-----------");
    printf("\n");
    printf("v2 : ");
    for (int i = 0; i < v2->ptr; ++i) {
        printf("%d ", ipop(v2,i));
    }
    printf("\n");
    printf("-----------");
    printf("\n");
    printf("v3 : ");
    for (int i = 0; i < v3->ptr; ++i) {
        printf("%f ", pop(v3,i));
    }
    printf("\n");
}

vector* funcMatrix(vector* v, int n, int m){
    vector* tmp = malloc(sizeof(vector));
    create(tmp, n*m);
    for (int i = m-1; i >= 0 ; --i) {
        for (int j = n-1; j >= 0; --j) {
            push(tmp, pop(v, j * m + i));
        }
    }
}

int kososem(vector* v, int n, int m){
    vector* transp = malloc(sizeof(vector));
    create(transp, v->size);
    for (int i = 0; i < m; ++i) {
        for (int j = 0; j < n; ++j) {
            push(transp,pop(v,j*n + i));
        }
    }
//    for (int i = 0; i < n; ++i) {
//        printf("%f ", pop(transp,i));
//    }
    printf("\n");
    for (int i = 0; i < n*m; ++i) {
        if(pop(v,i) != -pop(transp,i)) {
            free(transp->data);
            free(transp);
            return 0;
        }
    }
    free(transp->data);
    free(transp);
    return 1;
}

