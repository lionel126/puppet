// todo
import {Base} from 'src/pages/base'
import { env, data } from 'config'

class Login extends Base{
    l = {
        login: '/login',
        tel: 'input#login_phone',
        password: 'input#login_password',
        submit: 'button[type=submit]'
    }
    async open(){
        await this.page.goto(env.passport_base_url + this.l.login)
    }
    async login(){
        await this.page.type(this.l.tel, '15600455126');
        await this.page.type(this.l.password, '123456');
        (await this.page.$(this.l.submit))?.click();
    }
}

export { Login }