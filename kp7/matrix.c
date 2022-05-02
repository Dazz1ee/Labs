#include "matrix.h"
#include <stdio.h>
#include <malloc.h>
#include <math.h>
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

void funcMatrix(vector* v1, vector* v2, vector* v3, vector* newv1, vector* newv2, vector* newv3, int n, int m){
    push(newv1,0);
    m--;
    int count = 0;
    while(m >= 0) {
        for (int i = v2->ptr-1; i >=0; --i) {
            if ((int)v2->data[i] == m) {
                for(int j = 1; j <= n; j++){
                    if((int)v1->data[j] > i) {
                        push(newv2, n - j);
                        break;
                    }
                }
                push(newv3, v3->data[i]);
                count++;
            }
        }
        push(newv1,count);
        m--;
    }
}

void transpon(vector* v1, vector* v2, vector* v3, vector* newv1, vector* newv2, vector* newv3, int n, int m){
    push(newv1,0);
    int k=0;
    int count = 0;
    while(k < m) {
        for (int i = 0; i < v2->ptr; ++i) {
            if ((int)v2->data[i] == k) {
                for(int j = 1; j <= n; j++){
                    if((int)v1->data[j] > i) {
                        push(newv2, n - j);
                        break;
                    }
                }
                push(newv3, v3->data[i]);
                count++;
            }
        }
        push(newv1,count);
        k++;
    }
}

void difMatrix(vector* v, vector* v1, vector* v2, vector* v3,int m){
//    int prev=0;
//    for (int i = 1; i < v1->ptr; ++i) {
//        for(prev; prev < v1->data[i]; prev++){
//            int tmp = 0;
//            for (tmp; tmp < v2->data[prev]; ++tmp) {
//                push(v,0);
//            }
//            push(v,v3->data[prev]);
//        }
//    }
    int count = 0;
    int prev = 0;
    for(int i = 1; i < v1->ptr; i++){
        for (prev; prev < v1->data[i]; prev++) {
            v->data[count + (int)v2->data[prev]] = v3->data[prev];
        }
        count+=m;
    }
}

int kososem(vector* v2, vector* vt2, vector* v3, vector* vt3){
//    for (int i = 0; i < v2->ptr; ++i) {
//        if(v2->data[i] != vt2->data[i]){
//            return 0;
//        }
//    }
    for (int i = 0; i < v3->ptr; ++i) {
        if(v3->data[i] != -vt3->data[i]){
            return 0;
        }
    }
    return 1;
}

