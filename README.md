# Project: Tech Blog

- Tech stack: Next JS, PostgreSql

- Link Github: https://github.com/PhanDangDucit/test-prisma.git

- Link hosting: https://test-prisma-sage.vercel.app/

# Optimize
## Docker images
- Docker images decrease from `"1.4GB"` to `"285MB"` at `client` folder (**`Next.js`** apllication)

```bash
# change directory
$ cd client

# 
$ docker build -t client-optimization .

$ docker build -t client-no-optimization -f Dockerfile.large-size .
```

# How to run code

- Step 1: Let you clone code from `github.com` to folder that contains this source code.

```bash
$ git clone https://github.com/PhanDangDucit/test-prisma.git

$ cd test-prisma
```

- Step 2: You can checkout "**`duc_prisma`**" branch to run app

```bash
$ git checkout duc_prisma
```

- Step 3: Changing "client" folder:
```bash
$ cd client
```

- Step 4: You can install dependencies and run "client" instance
```bash
$ npm install

$ npm run dev
```



# Note
- All environment variables are set up by me. You can change them to your own environment.

# Reference

- Next JS: https://nextjs.org/docs

- PostgreSql: https://www.postgresql.org/docs/current/index.html

- Prisma: https://www.prisma.io/

# Contact me

- Gmail: phanduc.flp@gmail.com
- Facebook: https://www.facebook.com/phanduc.it


# How to define a version of app
- [Best practice software version](https://stackoverflow.com/questions/2864448/best-practice-software-versioning)

- [Semantic Versioning 2.0.0](https://semver.org/)

- [How to version your app in a continuous development world](https://medium.com/bilue/how-to-version-your-app-in-a-continuous-development-world-b4f23c2beab3)