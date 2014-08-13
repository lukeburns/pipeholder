pipeholder
==========

create placeholder streams that can be replaced at an arbitrary time after piping.

usage
=====

```
var holder = pipeholder();
src.pipe(holder).pipe(dest);
```

```
holder.place(stream);
```
becomes
```
src.pipe(stream).pipe(dest);
```

installation
============

```
npm install pipeholder
```