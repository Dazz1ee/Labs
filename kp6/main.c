#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "enrollee.h"
//#include "enrollee.c"

char matan[255];
char infa[255];
char diskra[255];
char num[255];

bool proverka(){
    return (atoi(num) <= 0 || atoi(matan) > 5 || atoi(matan) <= 0 ||
       atoi(diskra) > 5 || atoi(diskra) <= 0 || atoi(infa) > 5 || atoi(infa) <= 0);
}

bool trueOrFalse(const char temp[255]){
    if((strcmp(temp,"TRUE")  && strcmp(temp,"True") && strcmp(temp,"true")) == 0) return true;
    return false;
}

int main(int argc, char* argv[]) {
    if(argc < 3 || argc >4){
        printf("Enter filename -f or(-p param)");
        return 1;
    }
    FILE* f = fopen(argv[1], "a+");
    if(!f){
        perror("Can't open file");
        return 2;
    }
    if(strcmp(argv[2], "-f") == 0){
        enrollee e;
        printf("|%-25s | %-20s | %-10s | %-10s | %-10s | %-10s | %-10s | %-10s | %-10s|\n", "name", "initials", "gender", "numSchool", "medal", "exam", "matan", "diskra", "inf");
        printf("|");
        for (int i = 0; i < 139; ++i) {
            if(i == 26 || i == 49 || i == 62 || i == 75 || i == 88 || i == 101 || i == 114 || i == 127){
                printf("+");
                continue;
            }
            printf("-");
        }
        printf("|");
        printf("\n");
        while(fread(&e, sizeof(e), 1, f) == 1) {
            printf("|%-25s | %-20s | %-10s | %-10d | %-10s | %-10s | %-10d | %-10d | %-10d| \n", e.name, e.initials, e.gender, e.numSchool,
                   e.medal == 1 ? "true": "false", e.exam == 1 ? "true" : "false", e.matan, e.diskra, e.inf);
        }
    } else if(strcmp(argv[2], "-p") == 0){
        if(argc != 4) {
            perror("WRONG PARAMETR");
            return 2;
        }
        double p = atof(argv[3]);
        //printf("%f", p);
        if(p == 0.0 || p > 5.0){
            perror("Wrong parameter");
            return 2;
        }
        List list = create();
        enrollee* e1 = malloc(sizeof (enrollee));
        while(fread(e1, sizeof(*e1), 1, f) == 1){
            load(&list, e1);
            e1 = malloc(sizeof (enrollee));
        }
        Iterator*  it = begin(&list);
        //printf("%s\n", it->Next->enrolle->name);
        printf("|%-30s| %-30s|\n", "name", "initials");
        for (int i = 0; i < 64; ++i) {
            if(i == 31){
                printf("+");
                continue;
            }
            printf("-");
        }
        printf("\n");
        for (int i = 0; i <= list.size; ++i) {
            if(it != list.head){
                //printf("%s\n", it->enrolle->name);
                enrollee* temp = it->enrolle;
                if(temp->medal == 1) {
                    //printf("%s\n", temp->name);
                    double res = (temp->inf + temp->diskra + temp->matan) / 3.0;
                    if (p > res) {
                        printf("|%-30s| %-30s|\n", temp->name, temp->initials);
                    }
                }
            }
            it = it -> Next;
        }
    } else if(strcmp(argv[2], "TABLE") == 0) {
        fclose(f);
        char zapros[255];
        printf("%70s\n","REQUESTS: ADD, DELETE, DROP");
        while(scanf("%s", zapros) != EOF) {
            if (strcmp(zapros, "ADD") == 0) {
                f = fopen(argv[1],"a+");
                enrollee e;
                char tempMedal[255];
                char tempExam[255];
                printf("|%-25s | %-20s | %-10s | %-10s | %-10s | %-10s | %-10s | %-10s | %-10s|\n", "name", "initials", "gender", "numSchool", "medal", "exam", "matan", "diskra", "inf");

                scanf("%s %s %s %s %s %s %s %s %s",e.name, e.initials, e.gender, num, tempMedal, tempExam, matan, diskra, infa);
                if(proverka()) continue;
                e.matan = atoi(matan);
                e.inf = atoi(infa);
                e.diskra = atoi(diskra);
                e.numSchool = atoi(num);
                e.exam = trueOrFalse(tempExam);
                e.medal = trueOrFalse(tempMedal);
                List list =create();
                enrollee* e1 = malloc(sizeof(enrollee));
                while(fread(e1, sizeof(*e1), 1, f) == 1){
                    load(&list, e1);
                    e1 = malloc(sizeof (enrollee));
                }
                printf("%70s\n","ENTER POSITION");
                int n;
                scanf("%d", &n);
                if(n > list.size+1) {
                    printf("%70s\n","WRONG POSITION");
                    continue;
                }
                n--;
                add(&list,&e,n);
                fclose(f);
                f = fopen(argv[1], "w");
                Iterator* it = list.head;
                for (int i = 0; i <= list.size; ++i) {
                    if(it != list.head) {
                        fwrite(it->enrolle, sizeof(enrollee), 1, f);
                    }
                    it=it->Next;
                }
                fclose(f);
            } else if (strcmp(zapros, "DELETE") == 0){
                printf("%70s\n","ENTER POSITION");
                fopen(argv[1], "a+");
                int n;
                scanf("%d",&n);
                List list =create();
                enrollee* e1 = malloc(sizeof(enrollee));
                while(fread(e1, sizeof(*e1), 1, f) == 1){
                    load(&list, e1);
                    e1 = malloc(sizeof (enrollee));
                }
                delete(&list, n);
                fclose(f);
                fopen(argv[1], "w");
                Iterator* it = list.head;
                for (int i = 0; i <= list.size; ++i) {
                    if(it != list.head) {
                        fwrite(it->enrolle, sizeof(enrollee), 1, f);
                    }
                    it=it->Next;
                }
                fclose(f);
            } else if(strcmp(zapros, "DROP") == 0){
                fclose(f);
                f = fopen(argv[1], "w");
                fclose(f);
            }
            printf("%70s\n","REQUESTS: ADD, DELETE, DROP");
        }
    }
    return 0;
//    List list = create();
//    while (fread(&e, sizeof(e), 1, f)){
//        add(&list,&e);
 //   }
}
