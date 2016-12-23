export const configURLs = {
    development : {
        backend: {
            scheme: "http",
            url: "blog.personnal.com",
            port: "80",
            path: ""
        }
    },
    production : {
        backend: {
            scheme: "http",
            url: "blog.personnal.com",
            port: "80",
            path: ""
        }
    }
}

export const PATHSSERVICES = {
    posts: {
        path: "wp-json/wp/v2/posts",
    },
    categories: {
        path: "wp-json/wp/v2/categories"
    }
}

export const CATEGORIES = [
    {
        id:     27,
        slug:   "back-end",
        name:   "Back-End"
    },
    {
        id:     29,
        slug:   "nodejs",
        name:   "NodeJS"
    },
    {
        id:     30,
        slug:   "scala",
        name:   "Scala"
    },
    {
        id:     26,
        slug:   "front-end",
        name:   "Front-End"
    },
    {
        id:     31,
        slug:   "angular-2",
        name:   "Angular 2"
    },
    {
        id:     33,
        slug:   "htmlcss",
        name:   "HTMLCSS"
    },
    {
        id:     32,
        slug:   "react-js",
        name:   "ReactJS"
    },
    {
        id:     2,
        slug:   "photography",
        name:   "Photography"
    },
    {
        id:     4,
        slug:   "server-side",
        name:   "Server"
    },
]