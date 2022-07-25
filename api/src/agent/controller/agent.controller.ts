import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {AgentService} from "../service/agent.service";
import {AgentRequest} from "../integration/request/agent.request";
import {JwtAuthGuard} from "../../authentication/config/jwt-auth.guard";
import {AgentResponse} from "../integration/response/agent.response";

@Controller('agent')
export class AgentController {
    constructor(
        private service: AgentService
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    public insert(@Body() request: AgentRequest): Promise<number> {
        return this.service.insert(request)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    public getAll(): Promise<AgentResponse[]> {
        return this.service.getAll();
    }

    @Get(':code')
    @UseGuards(JwtAuthGuard)
    public getSingle(@Param('code') code: number): Promise<AgentResponse> {
        return this.service.getSingle(code);
    }

    @Patch(':code')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    public update(@Param('code') code: number, @Body() request: AgentRequest): Promise<number> {
        return this.service.update(code, request);
    }

    @Delete(':code')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    public delete(@Param('code') code: number): Promise<number> {
        return this.service.delete(code);
    }


}
