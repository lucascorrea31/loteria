import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <h1>Hello World!</h1>
    <ul>
    <li><a href="/raffles-senna">/raffles senna</a></li>
    <li><a href="/raffles-quince">/raffles quince</a></li>
    </ul>
    `;
  }
}
