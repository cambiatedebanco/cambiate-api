require('dotenv').config();
var firebaseAdmin = require('firebase-admin');

var serviceAccount = {
    "type": "service_account",
    "project_id": "graphite-maker-287716",
    "private_key_id": "4140a0a05f5e3cc29c92a6a51e306d7811a4e2b5",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCNcOf03UUaaX3e\niZteAHYe1a4V7MW2nUKEAMxjhM7fU++AV14nQ+JJeSFnC13K3GJzajAHYzl5/wEw\nOfd9B7nD3Kx+smgIMXD01Q0CcZG6kUEEjsKXqR7g79GsYsAhgBX5OnMj7diKLCkz\noGvuwE4PfYVPU9YoK3bQgmlHagQN71HjlO+kwvFPD4K9cVc57BjfygBotmXFoPl2\n7wDSENxQ4afoZ4fTZpuu8ZD9Rd8Rkk5a5X1flBVcQ8z/ek0JRljPktFdebTxY2aB\nJ/KiEfWvyH50nlBicGxInryGFTqUOXqI4R0DcjO7zm5AEAjC9KoGVFfWFvZ2XOyR\nFAhsSh9rAgMBAAECggEABF5AS6epwq8PXBgT3EtXWoxu2+58DK++piUAKvKnEO6e\nrvAD0GKgUnSTO4N2WhWEVNwqr4+47rOZbcvcgNgEPLBMA32vCNG+E1GhHTo0rfZe\nc62VBOoMMhY1+4TxOheilhfgBnQKA/ppK1cA/laiEohl3ZVRP9xXxwjAB5yWk3eM\n5tZL95JCWKR0zYkXhcCROaToVUf9kFOjGqTz+iPMr0RS6gt1umUJCL9CpvD5t8Rg\nRFna4aYsQua1exZjammoxONlp6ThfshrRO08mswueJnM1oPCkCYRPWuzE+zGSyrz\nqLn+eNAjLpnqsROFSUJGZN3k7oNYrs4CPsmrjJmywQKBgQDAKDDYJl1YzTjfWlFQ\nZb7zPHBUJszpdklVHLkQ8l0g+T+3WNntvdkb0VNNVkegaZynyNa2Ssgwy/3Th997\nZHBhdy+M0DCVJ+fJwAv0J5LJCk/lMB5L8JRBM2GJ4DraBhM4IcwqHrDnPJw+W6DI\nXK5xW8UHI18r1e+G8BPaENyARQKBgQC8bxjcEFQmz+cmrUHKQ3gnYdDSbmSSh9q/\n49Ds8/esydhN26XqStToXhY+0gtQxo5v1ph8xbz6sEbwIh6MvHp/Hi9XZH2Yvx9G\nEf503IwrB5ZEO1FV6S30AGCMwC4UrFkAKqrOHJVIm+UfUvQDFWGV3Z9HCLDPafPX\nXLYFFvhT7wKBgB8+abK7ijIGLFkktlP8NzAVg64rIOZU9VeBdBXtUncqD9IgAE9H\nryV2w7SvcrYCdhZR8ZdyUVqd0Ie0cAIAMsWmO3UJ5NxbwLRtJYRtatCFfLgnOsXe\nODzhvdpNO0R3+GgIFspCc0El+cGp5Fqvty13XnHqrm7SOkAWiSPL2g6BAoGBAIG5\ngkXOQADQVHQ+BvL2a/vAzYBxW2+9c41zi1v1wWcFNpKzSo/3oIewbmQlOoELkPfR\npv0PLMDxJoUfGCUPhM2KvFDP799+hEs7DBDr3Nuqx3qF08LvWyGGOPHtREwbMtJ4\njUqERwnLuXtNIowU5i/EeWjvxLmmWabEPtNWMvOlAoGAW27akSrWUKpmUPbCIERj\nYgqNApWutavRzCGEjClb2+4whYzoQC6f3ZHZvP2bJuRMm63+7iby8B+tUh9/BxiX\n6EI3zF7hIq1+oUPVeArE50JVZ2JYcelmNJRXOwe7PlyB7VUvJbmQuUXLlB60uUX7\n7N5RJOqbGWZkyGcyOIwpnSw=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-danix@graphite-maker-287716.iam.gserviceaccount.com",
    "client_id": "116360823372562254125",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-danix%40graphite-maker-287716.iam.gserviceaccount.com"
};



/*var serviceAccount = {
    "type": "service_account",
    "project_id": "nicanor",
    "private_key_id": "2786ec642906c225b28ab0d211fac712cba48878",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDDqUw6BNYc0EtQ\nejFPQpPCkASyNI+9VlFAPgOPNZc291XkRxal8aK8Ms7/HyHPU9IypoekHKm/O7q8\nUZjBCQw+DhAwc3njypjz2aA8Tcf4a7Q/DE52J4L5I7B73TDwmmy2FKgHzGgDJRmc\nb10bJ3J9vkIduZmJEE0TtiFpuuOmBlU+2lVEHHrIrKM6ItXOB5z4SKLQk7j8F1hA\n/WnZigqqZsQt5B+wgUDI1x7qmCW33e4xvzw/S4zXscZz9qSOZ2Y8GkkRQpS3piD4\nvp0rQWTGcksAZXR5Yl7so5eCAITCosEZw3N+3pYLGvRRc2lVb6dV/1hBv581RVka\n4y6Whq0/AgMBAAECggEAEjUGWV3K2NqPL5l3TjNZUaEaNsUKXSmTnQFIToLDpANH\nFFuDIYUHSjEGLxpkCIl5xWnWtHBQYXG68jw7lTb00y921TNhs89OBV8KeKIaSiUn\nnDhWcstBdlKaYSRXogQUuqrYagVc5nIE3JhGVzkH/+h8+YwkW+tO6Ncpa8/O0Eub\n56cS+nsOlgvvJgE7V9BHLIS3VxPKQ6ThzUI902mMDpIaczXrRLzqsFJAaYhIWb61\nzy+WXLjIe04fUHhNRJ5Clux6OcWs4hYWec8GX4DvtwdGtb96xRa+Zo9U667CDchy\nL6jqlkqGnhaTLCKJe+jrlNXtL3K1Kq/jjsIAm1OmDQKBgQDleDRGvnfIAeycB0hq\nhKr8ukK2pzL9fzCgZ1sve1mS43WH2L2aI6OUHacxm9CIohxlVPMxIhqXw/0+rSLE\nQV65agcG5FCpfqTcnfrh+oUtlN49s/qi6lBosbGHHvLklaHRrPnNMvoB5h/nwMnR\nvo61USL/+dsA4LccmLgKJpmVOwKBgQDaSHGvKvML7qt+L8B7vWdUq5bQXDUKWHAH\naaLFKQJV+vIdx+FtctUCWxi5fttZFIk9jySXz0u6/1Ib6Vlq72F9prBKSalqyAts\nR49Qi5UldaqQGXg1a6lasNRoXwlwYfVUayASK4YB07Q+Nzh1K4ZxMz7dgHZWszZu\nGUj+ece3zQKBgAxLF0ne9F3TtJBbV4bVWq+1btOIO5QXF0zQnLL7gb37z5UaiHXU\niPPrbsSam15miOzo0yqDsDcHOe78qYsoEWIPixbUbnnWHhDvqbwnhrD9c7aMiNXn\nha1GL8OUZeDXH1czVCKpI3mskXMCAg3pjo2qLhzWjuQKJeUzTVDF5p53AoGAecGn\nCBpg7+r1ZbGlIGCJ3sTHnvmP7HFgLAJUdL1nPCZ6Hvp7V92Ry3qc0/taxtmZo+jQ\ndI2ApJH+bus+oVNdggUUmJt2EMX8+S0BV+BEFV0JAs/yKXogQSIZmQ5J6ZH6klge\nz4PPf/1isMGEkHbyyvnWux8I41ubpNYdzTSInpECgYBdpRNby7NvKYVmafwl+RyC\nGlvVOT0Hop8jjmUh8MF1+9uBL+Xr6kun8WubZ8cIMBCpX2NEk0XhJhW4SC/E4PYy\nRrbj4y5TKEerAWnByIODoZK43mqXOQxmrDSyVkqGWDy3P7ANjJ62yfPQQW5Tx4db\nuY86XYPkwss3ausAZIfSyQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-zfwih@nicanor.iam.gserviceaccount.com",
    "client_id": "114691464639933432991",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zfwih%40nicanor.iam.gserviceaccount.com"
}*/

// Refactorizar
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const TokenType = 'Bearer'
const tokenBot = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzYTczOGUyMWI5MWNlMjRmNDM0ODBmZTZmZWU0MjU4Yzg0ZGI0YzUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQ2FybG9zIFZpbGxlbmEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2dIaXV5Q0ZPcG5QMFF2SFVGMTdwc2NobnVGLVZtdjBpUTZRZGp2SFEiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmljYW5vci1kZXYiLCJhdWQiOiJuaWNhbm9yLWRldiIsImF1dGhfdGltZSI6MTU4NTk2OTU3NywidXNlcl9pZCI6Ikg1WW1NZ0o1dWhTNjJENTN2b1FTQ2t5SHEzRTIiLCJzdWIiOiJINVltTWdKNXVoUzYyRDUzdm9RU0NreUhxM0UyIiwiaWF0IjoxNTg1OTY5NTc3LCJleHAiOjE1ODU5NzMxNzcsImVtYWlsIjoiY2FybG9zLnZpbGxlbmFAY2FqYWxvc2FuZGVzLmNsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTU0ODQ0MjE5MTkwMzc5NTk4OTMiXSwiZW1haWwiOlsiY2FybG9zLnZpbGxlbmFAY2FqYWxvc2FuZGVzLmNsIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.huVUG86G6QoTTqxD0YF8Bf96UE6sf1r3ljCJ4cUlWXaqhqHJbXt-etc4dBfjFqbsjbJWFw463NA5UyEZwypjSJ5F5nNPZFYquKUrJB0COslTpiK7WrQnPCSHWA9Jn36BlFeLkfdBHJ8hCkJEomCxmuv-qLptuEoNMKNSV52ZXhKGOqO7_4SCZgDgWlKsWSbHA3FoXmHiq1t5LHP2B1Z3boYnyt0te-rNfU7TE3F9d1L9qcYKALH1gqiH550cLHgrMN11qBXvrksWsrYlRLUdXkbXypfglGolXxEMCNgagL4lhnKrldU3_Wae9w-B66o33UbyeLLVBBNNMbhbbw5-Mg';

const getAuthToken = (request, response, next) => {
    // buscar bearer
    if (request.headers.authorization && request.headers.authorization.split(' ')[0] === TokenType) {
        request.authToken = request.headers.authorization.split(' ')[1];
    } else {
        request.authToken = null;
    }
    next()
}

const checkIfAuth = (request, response, next) => {
    getAuthToken(request, response, async() => {
        try {
            const { authToken } = request;
            if (tokenBot === authToken) {
                return next();
            } else {
                const userInfo = await firebaseAdmin.auth().verifyIdToken(authToken);
                request.authId = userInfo.uid;
                return next();
            }
        } catch (e) {
            // TO SOLVE Firebase ID token has invalid signature
            return response.status(401).send({ error: 'Not authorized' })
        }
    })
}
const login = (request, response, next) => {
    response.sendFile('index.html', { root: '../functions/views' })
}

module.exports = { checkIfAuth, login, firebaseAdmin }