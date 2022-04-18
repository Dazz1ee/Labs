//
// Created by machine on 17.04.2022.
//

#ifndef KP7_MATRIX_H
#define KP7_MATRIX_H

typedef struct {
    int n;
    int m;
}sizeMatrix;

typedef struct {
    int size;
    int ptr;
    float* data;

}vector;


void create(vector* v, int size);
void push(vector* v, float f);
float pop(vector * v, int n);
int ipop(vector * v, int n);
void delete(vector* v, int n);
void clear(vector* v);
int size(vector* v);
void modifMatrix(vector* v, vector* v1, vector* v2, vector* v3, int n, int m);
void print(vector* v);
void printMatrix(vector* v, int n, int m, vector* v1, vector* v2, vector* v3);
vector* funcMatrix(vector* v, int n, int m);
int kososem(vector *v, int n, int m);


#endif //KP7_MATRIX_H
