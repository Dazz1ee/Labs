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
    vector* res = funcMatrix(v,n,m);
    vector* res1 = malloc(sizeof(vector));
    vector* res2 = malloc(sizeof(vector));
    vector* res3 = malloc(sizeof(vector));
    modifMatrix(res,res1,res2,res3,n,m);
    printMatrix(res,m,n,res1,res2,res3);
    printf("+++++++++++\n");
    printf("\n");
    if(n != m){
        printf("Не кососимметричная\n");
    } else {
        if(kososem(res,n,n)) printf("Кососимметричная\n");
        else printf("Не кососимметричная\n");
    }
    free(v->data);
    free(v1->data);
    free(v2->data);
    free(res->data);
    free(res1->data);
    free(res2->data);
    free(res3->data);
    free(res3);
    free(res2);
    free(res1);
    free(res);
    free(v);
    free(v1);
    free(v2);
    free(v3);
    fclose(f);
    return 0;
}
