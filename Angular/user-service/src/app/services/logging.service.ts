export class LoggingService {
  log(name: string, status: string) {
    console.log(`User *${name}* is ${status} now.`);
  }
}
