import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LlmQuery } from '../../../schemas';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from '../../../guards/auth-guard';

@UseGuards(AuthGuard)
@Controller('llm')
export class UsersController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  async getStrategy(@Body() llmQuery: LlmQuery): Promise<{ strategy: string }> {
    return (
      await firstValueFrom(
        this.httpService.post(process.env.LLM_URI!, llmQuery),
      )
    ).data as { strategy: string };
  }
}
