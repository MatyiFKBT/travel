import { assert } from "console";
import supertest from "supertest";
import { app } from "../src/app";
import { TravelEntry } from "../src/entities/travelentry";

describe('Testing Server', () => {

    const user = {
        email: 'matyi@matyi.hu',
        password: 'jelszo',
        username: 'matyi'
    }
    const teszt = { username: 'teszt', jelszo: 'teszt', email: 'teszt@gmail.hu' }

    let _app: supertest.SuperTest<supertest.Test>;
    let token: string;
    beforeEach(() => {
        _app = supertest(app);

    })
    it('Should return hello world', async () => {
        await _app.get('/').expect(200);
    });

    it('Should register new account', async () => {
        await _app.post("/users/register").send(user).expect(201);
    })
    it('Should not register existing account', async () => {
        await _app.post("/users/register").send(user).expect(406);
    });
    it('Should login', async () => {
        const loginResp = await _app.post("/users/login").send(user).expect(200);
        token = `Bearer ${loginResp.text}`;
    });
    it('Should not login with empty user', async () => {
        await _app.post("/users/login").send({}).expect(404);
    });
    it('Should not login with wrong password', async () => {
        let teszt = {...user, password: "rossz"};
        await _app.post("/users/login").send(teszt).expect(401);
    });

    // beforeEach(async () => {
    //     const loginResponse = await _app.post("/user/login").send(user);
    //     token = `Bearer ${loginResponse.text}`;
    // });

    describe('Entries', () => {
        it('should create entry for logged in uesr', async () => {
            await _app.post('/entries').set('Authorization', token).send({
                "latlon": "19.123, 43.123",
                "desc": "Nagyon jo volt",
                "start_date": "2020-02-02",
                "end_date": "2020-03-03"
            }).expect(201);
        });
        it('should get all entries for user', async () => {
            await _app.get('/entries').set('Authorization', token).expect(200);
        });
        it('should get a specific entry for user', async () => {
            await _app.get('/entries/1').set('Authorization', token).expect(200);
        });
        describe('tags', () => {
            it('should add tag to entry', async () => {
                await _app.patch('/entries/1/tag').set('Authorization', token).send({tagId: 1}).expect(200);
            });
            it('should remove tag from entry', async () => {
                await _app.patch('/entries/1/tag').set('Authorization', token).send({tagId: 1}).expect(200);
            });
            it('should fail if no tag with id', async () => {
                await _app.patch('/entries/1/tag').set('Authorization', token).send({tagId: 6}).expect(404);
            });
            it('should fail if no entry with id', async () => {
                await _app.patch('/entries/5/tag').set('Authorization', token).send({tagId: 6}).expect(404);
            });
            
        })
        describe('comments', () => {
            it('should add comment', async () => {
                await _app.post('/entries/1/comment').set('Authorization', token).send({text: "jo poszt"}).expect(200);
            });
            it('should fail if no entry with id', async () => {
                await _app.post('/entries/100/comment').set('Authorization', token).send({text: "jo poszt"}).expect(404);
            });
            
        })
        
        


    })

    describe('Tags', () => {
        it('should get all tags', async () => {
            await _app.get('/tags').expect(200);
        });
        it('should get a tag', async () => {
            await _app.get('/tags/1').expect(200);
        });
        it('should create a tag', async () => {
            await _app.post('/tags').send({text: "uj tag"}).expect(201);
        });
        it('should rename a tag', async () => {
            await _app.patch('/tags/1').send({text: "atnevezett tag"}).expect(200);
        });
        it('should not rename a tag with wrong id', async () => {
            await _app.patch('/tags/10').send({text: "atnevezett tag"}).expect(404);
        });
        it('should delete a tag', async () => {
            await _app.delete('/tags/1').expect(200);
        });
        it('should  not delete a tag with wrong id', async () => {
            await _app.delete('/tags/1').expect(404);
        });
        
    })
    describe('Comments', () => {
        it('should get all comments', async () => {
            await _app.get('/comments').expect(200);
        });
        it('should get a comment', async () => {
            await _app.get('/comments/1').expect(200);
        });
        it('should edit a comment', async () => {
            await _app.patch('/comments/1').send({text: "uj comment"}).expect(200);
        });
        it('should not edit a comment with wrong id', async () => {
            await _app.patch('/comments/10').send({text: "uj comment"}).expect(404);
        });
        it('should delete a comment', async () => {
            await _app.delete('/comments/1').expect(200);
        });
        it('should not delete a comment with wrong id', async () => {
            await _app.delete('/comments/1').expect(404);
        });
        
    })
    

})
