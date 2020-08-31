require('dotenv').config();
var firebaseAdmin = require('firebase-admin');

var serviceAccount = {
    "type": "service_account",
    "project_id": "graphite-maker-287716",
    "private_key_id": "fa3578aa08667ff655242aca58d65ae39913da4d",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCm1lqfciLJj5T9\nellnI0+OzaHNKVq1f8TeoTGU1EBQG8H7iO8/hVMDfSNU5toJuo/1h4o8gvUiUqFO\nDMuMM+s0WPF+FKfFgtzdKgsv12FEHmE1ljA/1OoZoi0QYguFDJI73+fZJ6pFSoM3\nYESwJfS1Yv/kaakbcQCKK5Bf0xD57fEsTG7hIu8d/HDlCveaV9/jVJ/sYfCbeRtk\ngxLtAEXk63drJb9OQjDZX9SRjTD/0D5AbDDeU3/XyZB4pAv1iOSENB8HPxUZCqop\nKHsBDyPDSrXsRHV0sdYATwaocRQ4pE1qR5+u6dlDCIjrGi9TTXYUlSRBY8+bXqwW\nufVQuaI3AgMBAAECggEAO3ZeqkGFwI0aLxWyU540NtN3faXlnJbDVg3hnAfiPCsI\nglwV2W/tXGr3csUspRcHRB1g2ZxbPjZxI15QFdJTXD7vI169RRoVGgZoIk8DbcHe\nJ7k1zSpXnXc91H79WBhY7lopSi5m83dROSVoldeRVizIw2IdUZh+9r/8HwsdG9Zs\nSfQZuZEBhrru/afze7KxD4sQq1iGrBi4W3nuQbjAaKsxNBzv3KmyR3MHrCP4gcZP\nEoo0fbteDrkBIBOkUZQqtcWdcM2/slc161T97ARS82S3Xnl0vaEUjdI9UzsA8pRV\no2LErrnZ52CXuvLswAudAbvBoTbAIeiQ+Oq34SntUQKBgQDm/K9Fsz/RXlZNDdns\n6LN9nFKWvZbqvAv2LPL05UQ2QT4VTD9i+i0E4Ux0IaWAezIdB5RCb0Uc/8ZBYy9o\ntbAh3YuhzDwUL2nz6MVkRTaxKZ/39MLLlUpgGJdS21Z1ZF40yQBJahnQ3v1FaEV/\nYD8N1BNFlr2d0OqgDkD1hlI1zQKBgQC451cnJPU1u03I6UlypBJpkvVR855k7n3o\nsdPq9g5pc17j6i50bC1h93KVYdvCFBhSnqV7noOMk/DPdJ9a1dZ6QD7uv3s0pF+h\nKKj0e/JpcODJoxAVmJVm98xFufFMxDbs5z3pKHyOQ0TE0f9eRBx9dJoetI1/iGE1\nVd/cCno0EwKBgBkyZTg4NnTzUnyzTxttwu6n18aDxeuzOabP/mzCea9lbI1MNPnq\nCnEm1n0wkmoyhiPuiLi6hJKGQC0v0aMddqorDalHqyIUjf1CXg3zEuU+gim9NGaa\n0XMsG425SXQiz7f4WSSpA0nqmTwyBKrBZ/9tK/ECYYrOmFl/VIyz61HdAoGBAJrJ\n13TGhJwRi8FoQfs9jMhipQmQ5wVZfX/h9iTZDSGL2mDztyXxNWCwtHSHcl+bUO1B\nMAk3nqp9YndZCtoQ7zZyN/zHwU1FWWThU+cvJ7TLMPK7lghuLov/XzrzuSPpko1p\n27MnGHZDq/sUTTJN1IfVp/uSbG3Z7n6mv/tFrh2PAoGAXclUs/vsiWe1f8qZ3heQ\n4uu0dsKoQI2qPW3+wjLEnpKBa0mmpPKqTBTj5ZwuInWnrRgbd++cEBt72asP3nof\n92hHem3/EQElno3/UsNUQwMnb2JwWJBqC/DhuyQrmFyCQ6vxZ2B4eanU+Nv5fpUx\nIE2Vn6mZio8vaqbJKI3gCvc=\n-----END PRIVATE KEY-----\n",
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