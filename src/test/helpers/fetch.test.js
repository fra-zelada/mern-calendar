const { fetchSinToken, fetchConToken } = require("../../helpers/fetch")

describe('pruebas en el helper fetch', () => {
    
    let token = '';

    test('fetch sin token debe de funcionar', async() => {
        
        const login = {
            email: 'francisco@gmail.com',
            password: '123456'
        }

        const resp = await fetchSinToken('auth',login,'POST')
        const body =  await resp.json();

        expect(body.ok).toEqual(true);
        expect( resp instanceof Response).toBe(true);
        expect(body).toEqual({
            ok: true,
            uid: expect.any(String),
            name: expect.any(String),
            token: expect.any(String)
          })

        token = body.token;

    })
    
    test('fetch con token debe de funcionar', async() => {
        
       
        localStorage.setItem('token', token);
        
        const resp = await fetchConToken('events/613777fda29fa698ec3edbb5',{},'DELETE');
        const body =  await resp.json();
        expect(body).toEqual({ ok: expect.any(Boolean), msg: expect.any(String) })
        expect(body).toEqual({"msg": "Evento no existe por ese id", "ok": false})
        
        
    })

    test('si no hay token, fetchcontoken debe arrojar error', async() => {
        
        localStorage.setItem('token','');
        const resp = await fetchConToken('events/613777fda29fa698ec3edbb5',{},'DELETE');
        const body =  await resp.json();
        expect(body).toEqual({"msg": "No hay token en la petición", "ok": false})

    })
    

})
