// auth.controller.ts
import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
/**
 * @UseGuards(AuthGuard('local'))我们使用的AuthGuard是@nestjs/passport自动设置
 */
@Controller('/auth')
export class AuthController {
	// 前面也提到过的，注入服务，提供给整个路由控制器类使用
    public constructor(private readonly authService: AuthService) { }
    /**
     * 使用jwt安全认证，登录成功后生成token
     */
    @UseGuards(AuthGuard('encry')) // encry 自定义的，默认是local,在local.strategy.ts文件中修改
    @Post('/login')
    public async login(@Request() req): Promise<{ access_token: string }> { // 登录验证在authService里面的validateUser进行
        return this.authService.login(req.user); // 发送登录请求，获取token
    }
}
 