#include <stdio.h>
#include "matrix.h"
#include "matrix.c"


int main(int argc, char* argv[]) {
    if(argc != 2){
        perror("INVALID INPUT");
        return 1;
    }
    FILE* f = fopen(argv[1], "rb");
    if(!f){
        perror("Can't open file");
        return 1;
    }
    int n, m;
    fscanf(f,"%d %d",&n, &m);
    vector* v = malloc(sizeof(vector));
    printf("%d %d",n,m);
    create(v, n* m);
    float tmp;
    int noZero=0;
    while (fscanf(f, "%f",&tmp) == 1){
        if(tmp != 0){
            noZero++;
        }
        printf("%f\n",tmp);
        push(v,tmp);
    }
    printf("\n");
    printf("+++++++++++\n");
    printf("До транспонирования матрицы");
    printf("\n");
    printf("+++++++++++\n");
    printf("\n");
    vector* v1 = malloc(sizeof(vector));
    vector* v2 = malloc(sizeof(vector));
    vector* v3 = malloc(sizeof(vector));
    create(v1,n+1);
    create(v2,noZero);
    create(v3,noZero);
    modifMatrix(v,v1,v2,v3,n,m);
    printMatrix(v,n,m,v1,v2,v3);
    printf("\n");
    printf("+++++++++++");
    printf("\n");
    printf("После транспонирования матрицы");
    printf("\n");
    printf("+++++++++++\n");
    printf("\n");
    vector* newv1 = malloc(sizeof(vector));
    vector* newv2 = malloc(sizeof(vector));
    vector* newv3 = malloc(sizeof(vector));
    create(newv1,n+1);
    create(newv2,noZero);
    create(newv3,noZero);
    funcMatrix(v1,v2,v3,newv1,newv2,newv3, n,m);
    vector* res = malloc(sizeof(vector));
    create(res, n*m);
    difMatrix(res,newv1, newv2,newv3, n);
    printMatrix(res,m,n,newv1,newv2,newv3);
    printf("+++++++++++\n");
    printf("\n");
    vector* vt1 = malloc(sizeof(vector));
    vector* vt2 = malloc(sizeof(vector));
    vector* vt3 = malloc(sizeof(vector));
    create(vt1,n+1);
    create(vt2,noZero);
    create(vt3,noZero);
    transpon(newv1, newv2, newv3, vt1,vt2,vt3,m,n);
    if(n != m){
        printf("Не кососимметричная\n");
    } else {
        if(kososem(newv2, vt2,newv3,vt3)) printf("Кососимметричная\n");
        else printf("Не кососимметричная\n");
    }
    free(v->data);
    free(v1->data);
    free(v2->data);
    free(res->data);
    free(res);
    free(v);
    free(v1);
    free(v2);
    free(v3);
    fclose(f);
    return 0;
}
