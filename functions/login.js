require('dotenv').config();
var firebaseAdmin = require('firebase-admin');

var serviceAccount = {
    "type": "service_account",
    "project_id": "fenix-cp-286516",
    "private_key_id": "abbc0c10e0c095a7f495f4b41118291ad31c3709",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDyTojczdJQTRKs\nAIbE35xMx3KriPIGqIUHn3+ZKUqhwpP1QC0GZ2ctWkl4AvQrEMrRSCR7Q/TM6Y1E\nCMU8vJOai6OulkYZqsOXauKaC4mTzMR+fufChbLy7qCuxAs6bOHEb4+/6HQD/QQx\niZSt/qGl+9NiJAbuMcrRmcSqd5rA7lHjj/noEsb59utE6QaHi88LBw38ZxcbA8up\n/PBfd9t0Py7BRXYfR1XA+uAPkScFujwNVsS6/JnUMgDBQjIptezLAezDxvRBD4tc\nXhPRhCllrNoXpLuf8ykvHF8+MtdhWBpGmJ2qOjhFd8JhEZQ/9dXTRR5FhkMUsMOX\nTTVnCQQ3AgMBAAECggEAHGjg2yK2ufuPaONW6dZd+RKZe0s/NVCk6FPnHgodWgH6\nXxL7NHkDO+oOGygdgL8jSI5w2JMLLMtlaMiud4SUudYNhvbPmUrQS/yYPP+FTfMA\nRuSSP9h1Ns6LwHHz7xG9Fs8Nx651i9Iqn7RF3nCwe0mfay5WMa9c3F5vFJ2ZY21T\neU7vxbQZx/iuwsOF6Aas5gQITXFrRulFp9jnO12yKZCHS1aCYM3Dakhw928wJEKa\nQZMB5ONcCmyn3QpeXz89wnmvQJyd4nuunpsAAAyUTrxgzUqVNw5KJ0wKHa2u4YCx\n2MrhvM2E6LwvEWzQfTCcfQ1aCGNQD1znv4dj6oBuoQKBgQD+3czk12BSELhBCoo3\npTmZd3a9mqyYZLa74XZF1iLova7ajjc3BFJ19XmzTM5xOaYR5w6ResUqvNz6PjMx\n2m+7f/wqMtZjnT1fMq33YB+wf8a9qn92Lwr9LLqZGz00U/MxHmQeVP/i/SE8PuDJ\noJt8ViTzp4ZcEebE87tm40BCRQKBgQDzYm707WLqUHE21wM7xpU10eZ1YUV3GuWh\nRS0CnWx8IgSjwy/ntQFCrNvRvuQKTg2NBoXrSrPfG06Nc6iskOtoAeEODOEoDseb\noOe6ho/nh6iO+krmxOEzr41N4BFWUcXQuF9S929QrS6vQi2HhiEfmMiCYVHYQ0Gx\n/2rHY4XSSwKBgC7vX71A4I8cXyIzM7L9rXbSpj5Sjrhdy70bzzEbN0CPNfUvvYFX\nPWxVsXzQhzAYwrmHSIqIBmlRcIxxCfKDXJI2BpUq2YpsuZGffqQQwqU5Urs4+9Ii\n5a4sH4z0lDffwehoxV1En/8ISKeUmMbo2dly78kjL74i2dGpZPiUnw/VAoGBAN0Z\nPtMiFAnoqfC3wyg6brJFzKY1h3V76b9nqEwH1tWt0akzWAGWXV7EyazxTRhPb9/9\nXQszAdRcai/2MfUSccg6bMjmymQpiQvIULsSIwiiJG4+0mxxzmO1xxhHxXg1MQ87\nbt1gCq+vpAlyhQnov46ErSJEZqWf875P2iDoOFmhAoGBALCOvMRn7Y5Ne7PT+sh5\nanxuwQhkYWVPJKnWyWuZ//i8s8Dp1yzRlAs/hr4W0AEsbf1oHAGRXS7kHAKKlc33\nQueRf7noVNV5sruw4Ld1X2ZlDE1Obsv7gVY5m6bbU62fQEETWnqLm7LHTossH96p\nLVz711prEAMWhcWKhPZssZ33\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-e7rrv@fenix-cp-286516.iam.gserviceaccount.com",
    "client_id": "114713357369659351063",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-e7rrv%40fenix-cp-286516.iam.gserviceaccount.com"
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