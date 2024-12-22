import { Denvmon } from "./core/denvmon";
import { IsBoolean, IsNumber, IsString } from "./core/getter";

@Denvmon()
class Config {
  @IsString("DATABASE_URI")
  DATABASE_URI!: number;

  @IsNumber("TIMEOUT",{
    isInt: true,
  })
  timeout!: number;

  @IsNumber("TIMEOUT")
  sleep!: number;

  @IsBoolean("IS_PRODUCTION")
  is_production!: boolean;

  @IsNumber("DURATION")
  duration!: boolean;
}
const config = new Config();
console.log(config);