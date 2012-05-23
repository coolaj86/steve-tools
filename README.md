Tools for creating a node site
===

And always remember: Steve is JSON's Best Friend (TM).

init
---

Create a new app with basic html5 + nodejs boilerplate

    steve-init my-new-app
    cd my-new-app
    git init

mkjs
---

Creates a new javascript file with `jshint` comments and `(function () {...}())` already added

    mkjs my-module.js

watch
---

Watches files with the extensions `.js`, `.less`, or `.jade` for modifications
and runs `deploy.sh` 1000ms after the last file is modified
(so that it doesn't go crazy on a "Save All and Quit")

    steve-watch -x js -x less -x jade -s deploy.sh --timeout 1000

addjshint 
---

Add `jshint` comments to an existing js file

    addjshint my-module.js

LICENSE
---

MIT / Apache2

"JSON's Best Friend" (TM) is a tradmark owned by AJ ONeal in relation to Steve, the web-application framework.
