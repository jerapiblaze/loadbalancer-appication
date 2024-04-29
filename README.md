# SIMPLE APP

## API LIST

GET /
-> helloworld

GET /pi?n=(int)
-> (CPU drain) calculate pi number with `n` precision

GET /recurse?n=(int)
-> (MEM drain) recursive `n` times to calculate something

GET /randomfile?n=(int)
-> (STO_IO drain) random get `n` files of size 1MB

GET /bigfile?n=(int)
-> (STO_IO/NET_IO drain) random get `n` file of size 5MB

GET /compress?n=(int)&t=(int)
-> (COMBO) compress `n` big file files with `t` thread

## DEPLOY

Traditional deployments:
```bash
# Run once
npm run prep
# DEV
npm run dev
```

Container deployments:
```bash
docker-compose up
```