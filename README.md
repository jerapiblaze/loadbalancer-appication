# SIMPLE APP

## API LIST

| Method | Endpoint | Parameters | Resource bond | Description |
|:-------|:---------|:-----------|:--------------|:------------|
| GET    | `/api/v1/index` | None | None | Return string `Hello world`.|
| GET    | `/api/v1/pi?n=(int)` | $n\in(1,\infty)$ | CPU | Calculate $\pi$ with `n` decimals. |
| GET    | `/api/v1/recurse?n=(int)` | $n\in(1,24)$ | MEM | Calculate `n` recursives. |
| GET    | `/api/v1/randomfile?n=(int)` | $n\in(1,10000)$ | STO_IO | Read and return contents from `n` 1KB text files. |
| GET    | `/api/v1/bigfile?n=(int)` | $n\in(1,1000)$ | STO_IO+NET_IO | Read and return contents from `n` 5MB text files. |
| GET    | `/api/v1/compress?n=(int)&t=(int)` | $n\in(1,1000), t\in(1,\infty)$ | COMBO | Read content from `n` 5MB text files, compress with LZMA of `t` threads and return. |

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

