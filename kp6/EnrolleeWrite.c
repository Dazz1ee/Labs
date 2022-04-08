#include <stdio.h>
#include <string.h>
#include <errno.h>
#include <malloc.h>
#include <stdlib.h>

#include "enrollee.h"

char matan[255];
char infa[255];
char diskra[255];
char num[255];

void usage() {
    printf("Usage: program filename\n");
}

int write(enrollee* e, char* tempExam, char* tempMedal){
    return scanf("%s %s %s %s %s %s %s %s %s",e->name, e->initials, e->gender, num, tempMedal, tempExam, matan, diskra, infa) == 9;
}

bool trueOrFalse(const char temp[255]){
    if((strcmp(temp,"TRUE")  && strcmp(temp,"True") && strcmp(temp,"true")) == 0) return true;
    return false;
}

int main(int argc, char* argv[]){
    if(argc != 2){
        usage();
        return 1;
    }
    FILE* f = fopen(argv[1], "a");
    if(!f){
        perror("Can't open file");
        return 2;
    }
    enrollee e;
    char tempMedal[255];
    char tempExam[255];
    printf("|%-25s | %-20s | %-10s | %-10s | %-10s | %-10s | %-10s | %-10s | %-10s|\n", "name", "initials", "gender", "numSchool", "medal", "exam", "matan", "diskra", "inf");
    while(write(&e, (char *) &tempExam, (char *) &tempMedal)){
        if(atoi(num) <= 0 || atoi(matan) > 5 || atoi(matan) <= 0 ||
           atoi(diskra) > 5 || atoi(diskra) <= 0 || atoi(infa) > 5 || atoi(infa) <= 0) continue;
        e.matan = atoi(matan);
        e.inf = atoi(infa);
        e.diskra = atoi(diskra);
        e.numSchool = atoi(num);
        e.exam = trueOrFalse(tempExam);
        e.medal = trueOrFalse(tempMedal);
        printf("%s %s %s %d %d %d %d %d %d\n", e.name, e.initials, e.gender, e.numSchool, e.medal, e.exam, e.matan, e.inf, e.diskra);
        fwrite(&e,sizeof(e), 1, f);
    }
    fclose(f);
    return 0;
}
