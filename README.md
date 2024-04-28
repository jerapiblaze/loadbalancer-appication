# SIMPLE APP

## API LIST

GET /
-> helloworld

GET /pi?n=(int)
-> calculate pi number

GET /recurse?n=(int)
-> recursive calculate something

GET /randomfile?n=(int)
-> random get n files of size 1MB

GET /bigfile?n=(int)
-> random get n file of size 5MB

GET /compress?n=(int)&t=(int)
-> compress n big file files with t thread

## DEPLOY

```bash
# Run once
npm run prep
# DEV
npm run dev
```