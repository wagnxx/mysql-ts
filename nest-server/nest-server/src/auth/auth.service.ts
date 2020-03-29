// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; // 引入jwt
/**
 * 验证登录账号密码正确性，并产生token
 * @function validateUser 验证登录账号密码正确性
 * @function login 产生token
 */
@Injectable()
export class AuthService {
    constructor(
        // private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }
    /**
     * 模拟数据库匹配账号密码
     * @param username 用户名
     * @param pass 密码
     */
    public async validateUser(username: string, pass: string): Promise<any> {
		// 模拟数据
        const user = {
            id: '12fDAA267CCFa9932c',
            username: 'liu',
            password: '1111',
        };
        // 模拟查询数据库,判断密码什么的是否正确
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result; // 然后返回除了密码的数据,给local.strategy.ts那边使用
        }
        return null;
    }

    public async login(user: any) { // 登录，创建一个登录的token并返回
        const { username, id } = user;
        const payload = { username, id };
        return {
           // 调用内置的nestjs的jwt生成token的对象方法
            token: 'Bearer ' + this.jwtService.sign(payload),
        };
    }
}
 