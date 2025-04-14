import { JwtModule } from '@nestjs/jwt';

export const jwt_secret =
  '2aqXbT6vebpSK3MhxQJdxqlOcSy5BBktj3yxbSf1zoQaqDhB0GrkMU+hn0ynTIyL\n' +
  'aEosbGpQprX57b4tJlye/Q==';

export const jwtConfig = JwtModule.register({
  global: true,
  secret: jwt_secret,
  signOptions: { expiresIn: '1h' },
});
