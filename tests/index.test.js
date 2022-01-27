const request = require('supertest');
const app = require("../app");

describe('Todos API', () =>{
    it('GET /todos --> array of todos', ()=>{
        return request(app)
        .get('/todos')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name:expect.any(String),
                        completed:expect.any(Boolean),
                    })
                ])
            );            
        })
    })

    it('GET /todos/id --> specific todo by id', ()=>{

        return request(app)
        .get('/todos/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body).toEqual(
                    expect.objectContaining({
                        name:expect.any(String),
                        completed:expect.any(Boolean),
                    })
            );
        })
    })

    it('GET /todos/id --> 404 if not found', ()=>{

        return request(app)
        .get('/todos/99999')
        .expect(404)        

    })

    it('POST /todos --> create ToDo', ()=>{

        return request(app)
                .post('/todos')
                .send({name:'new Todo'})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(201)
                .then(response => {
                    expect(response.body).toEqual(
                            expect.objectContaining({
                                name:'new Todo',
                                completed:expect.any(Boolean),
                            })
                    );
                })     
    })

    it('POST /todos --> validates Request body', ()=>{

        return request(app)
                .post('/todos')
                .send({name: 123})
                .set('Accept', 'application/json')
                .expect(422)
                
    })



})