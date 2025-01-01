<!-- Problem is not resolved -->

- Nextjs: intercepting, parrallel

- Feartures: comments (socketio), ads, notification, videos, compress, buffer ...

- Security:
+ XSS: insert harmful js --> "escape html" library

+ DOS: (denial of service): server overload --> "express-rate-limit"

+ authentication & authorization: hash & 2 factor

+ IDOR: (`user_id` on url) --> compare pathname vs user_id in access_token

+ sql injection: `select * from users where id = ${id}` --> 

```js
const query = `select * from users where id = ?`;
connection.query(query, [id], (err, result) => {
    // Handle error
    // handle result
})
```

- filter: dropdown
- comment: ui, logic, ...

# Environment
- [Example .env](https://github.com/vercel/next.js/tree/canary/examples/environment-variables)

- https://www.youtube.com/watch?v=3x58TRA7who&ab_channel=CompuMatter%2CLLC
- https://www.youtube.com/watch?v=ePCBuIQJAUc&ab_channel=ProgrammingKnowledge
- https://www.freecodecamp.org/news/error-failed-to-push-some-refs-to-how-to-fix-in-git/
- https://www.youtube.com/watch?v=5ggW3LYKB8E&ab_channel=ByteProgramming
- https://www.nobledesktop.com/learn/git/undo-changes#:~:text=The%20last%20commit%20that%20has,back%20to%20the%20staging%20area.

```bash
$ git pull
$ git branch --set-upstream-to=origin/<branch> master
$ git add .gitignore
$ git commit -m "??"
$ git pull
$ git push origin master
$ git add/rm <file>
```