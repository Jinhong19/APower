import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getOneUserByName(username);
    // const match = await this.comparePassword(pass, user.password);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(username: string, password: string ) {
    const id = await this.usersService.getOneUserIdByNamePassword({username, password});
    const payload = { username: username, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // private async comparePassword(enteredPassword, dbPassword) {
  //  const match = await bcrypt.compare(enteredPassword, dbPassword);
  //  return match;
  // }
}
