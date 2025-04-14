import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AccountsService } from './services/accounts.service';
import { Account } from '../../../schemas';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('/signup')
  async createAccount(@Body() accountData: Account): Promise<Account> {
    return this.accountsService.createAccount(accountData);
  }

  @Post('login')
  async login(@Body() account: Account): Promise<{ access_token: string }> {
    const user = await this.accountsService.validateUser(account);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.accountsService.login(user);
  }
}
