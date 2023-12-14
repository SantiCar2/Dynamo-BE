import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto, LoginDto, VerifyDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) { }

    //Post request to signup
    @Post('signup')
    async signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }
    //Post request to login
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }
    //Post verify token
    @Post('verify')
    async verify(@Body() dto: VerifyDto) {
        return this.authService.verify(dto.token);
    }
}