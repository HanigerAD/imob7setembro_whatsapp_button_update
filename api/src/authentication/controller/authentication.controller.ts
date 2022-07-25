import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoginRequest } from '../integration/request/login.request';
import { LoginResponse } from '../integration/response/login.response';
import { AuthenticationService } from '../service/authentication.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthenticationController {
    constructor(
        private service: AuthenticationService
    ) { }

    @Post('/login')
    public login(@Body() request: LoginRequest): Promise<LoginResponse> {
        return this.service.login(request);
    }
}
