const app = require('./app');

test('read request test', async () => {
    jest.setTimeout(async () => {
        const res = await request(app).post('/admin/signup').send({
            name: "Dheeraj Singjh",
            email: "dheerajsingh234@gmail.com",
            username: "gaurtav@123",
            password: "Gaurav@123"
        });

        expect(res.statusCode).toBe(200);
    }, 4000)
});


test('read request test', async () => {
    setTimeout(async () => {
        const res = await request(app).post('/admin/signin').send({
            email: "riturajsoni234@gmail.com",
            password: "Gaurav@123"
        });

        expect(res.statusCode).toBe(200);
    }, 4000)

});
test('read request test', async () => {
    setTimeout(async () => {
        const res = await request(app).post('/user/signup').send({
            name: 345,
            email: "rajeshyadav123@gmail.com",
            username: "souravsingh",
            password: 234
        });

        expect(res.statusCode).toBe(200);
    }, 4000)

});

test('read request test', async () => {
    setTimeout(async () => {
        const res = await request(app).post('/user/signin').send({
            email: "anshulojha@234.com",
            password: "Gaurav@123"
        });

        expect(res.statusCode).toBe(200);
    }, 4000)

});

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuc2h1bG9qaGFAMjM0LmNvbSIsInBhc3N3b3JkIjoiR2F1cmF2QDEyMyIsImlhdCI6MTY1MDMzNzY4OSwiZXhwIjoxNjUwMzQxMjg5fQ.F3TLXUo6c_NuA3sowi8f0ZtQGQzIsTq59oePj6ZcHWI";
test('read request test', async () => {
    setTimeout(async () => {
        const res = await request(app).post('/admin/addproduct').set(token).send({
            categories: "Cloth",
            subcategories: "Jence",
            name: "Denim",
            price: 55600,
            details: "Comfortable",
            color: "Black"
        });

        expect(res.statusCode).toBe(200);
    }, 4000)

});


test('read request test', async () => {
    setTimeout(async () => {
        const res = await request(app).set('6257db89bb7aefdc7460664b').put('/update/product/:id').set(id).send({
            subcategories: "4 vehicle"

        });

        expect(res.statusCode).toBe(200);
    }, 4000)

});

test('read request test', async () => {
    setTimeout(async () => {
        const res = await request(app).set(token).get('/admin/allproduct')
        expect(res.statusCode).toBe(200);
    }, 4000)

});

test('read request test', async () => {
    setTimeout(async () => {
        const res = await request(app).get('/sort/product')
        expect(res.statusCode).toBe(200);
    }, 4000)

});

test('read request test', async () => {
    setTimeout(async () => {
        const res = await request(app).post('/addtocart').send({
            name: "Gaurav Singh",
            UserID: "6262df6b354822d8c61d12c8",
            ProductID: "626276f4e83d5d187cb332b0"
        })
        expect(res.statusCode).toBe(200);
    }, 4000)

});

test('read request test', async () => {
    setTimeout(async () => {
        const res = await request(app).get('/searchcartdata').send({
            UserID: "6262df6b354822d8c61d12c8"
        })
        expect(res.statusCode).toBe(200);
    }, 4000)

});

test('read request test', async () => {
    setTimeout(async () => {
        const res = await request(app).get('/usersort/product')
        expect(res.statusCode).toBe(200);
    }, 4000)

});

test('read request test', async () => {
    setTimeout(async () => {
        const res = await request(app).get('/user/search/:name').set("Oneplus")
        expect(res.statusCode).toBe(200);
    }, 4000)

});
