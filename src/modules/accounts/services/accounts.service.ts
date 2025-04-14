import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from '../../../../schemas';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private accountModel: Model<AccountDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount(accountData: Account): Promise<Account> {
    if (accountData.password) {
      const salt = await bcrypt.genSalt(10);
      accountData.password = await bcrypt.hash(accountData.password, salt);
      accountData.approved = false;
    }
    const newAccount = new this.accountModel(accountData);
    return newAccount.save();
  }

  async validateUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<Account | null> {
    const account = await this.accountModel.findOne({ username }).exec();
    if (account && (await bcrypt.compare(password, account.password))) {
      return account;
    }
    return null;
  }

  async login(account: Account) {
    const payload = { sub: account._id, username: account.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
